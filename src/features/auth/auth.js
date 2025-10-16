import { loginUser } from '@api/authorization.js';
import { refs } from '@features/layout/dom-refs.js';

const STORAGE_KEY = 'english-teacher.google-user';
const AUTH_STATE_KEY = 'english-teacher.google-auth-state';

const authRoot = document.querySelector('[data-auth-root]');
const signInContainer = document.querySelector('[data-auth-signin]');
const profileContainer = document.querySelector('[data-auth-profile]');
const nameElement = document.querySelector('[data-user-name]');
const emailElement = document.querySelector('[data-user-email]');
const avatarElement = document.querySelector('[data-user-avatar]');
const signOutButton = document.querySelector('[data-auth-signout]');

let currentUser = null;
let isInitialised = false;
const subscribers = new Set();

function decodeJwtPayload(token) {
  try {
    if (!token || typeof token !== 'string') return null;
    const parts = token.split('.');
    if (!parts[1]) return null;
    const base64 = parts[1].replace(/-/g, '+').replace(/_/g, '/');
    const padded = base64.padEnd(
      base64.length + ((4 - (base64.length % 4)) % 4),
      '='
    );
    const decoded = atob(padded)
      .split('')
      .map(char => `%${`00${char.charCodeAt(0).toString(16)}`.slice(-2)}`)
      .join('');
    return JSON.parse(decodeURIComponent(decoded));
  } catch (error) {
    console.warn('[auth] Unable to decode Google credential payload', error);
    return null;
  }
}

function serialiseUser(user) {
  return {
    name: user.name || '',
    givenName: user.givenName || '',
    familyName: user.familyName || '',
    email: user.email || '',
    picture: user.picture || '',
    credential: user.credential || '',
    expiresAt: user.expiresAt ?? null,
  };
}

function loadStoredUser() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (error) {
    console.warn('[auth] Unable to access localStorage', error);
    return null;
  }
}

function safeSetJSON(key, value) {
  const nextValue = JSON.stringify(value);
  const currentValue = window.localStorage.getItem(key);
  if (currentValue === nextValue) return;
  window.localStorage.setItem(key, nextValue);
}

function storeUser(user) {
  try {
    const payload = serialiseUser(user);
    safeSetJSON(STORAGE_KEY, payload);
  } catch (error) {
    console.warn('[auth] Unable to persist user in localStorage', error);
  }
}

function clearStoredUser() {
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.warn('[auth] Unable to remove user from localStorage', error);
  }
}

function persistAuthState(state) {
  try {
    safeSetJSON(AUTH_STATE_KEY, state);
  } catch (error) {
    console.warn('[auth] Unable to persist auth state', error);
  }
}

function isStoredUserValid(user) {
  if (!user || typeof user !== 'object') return false;
  const hasIdentity =
    Boolean(user.email) || Boolean(user.name) || Boolean(user.givenName);
  const hasCredential =
    typeof user.credential === 'string' && user.credential.length > 0;
  return hasIdentity && hasCredential;
}

function cloneUser(user) {
  return user ? { ...user } : null;
}

function shallowEqual(a, b) {
  if (a === b) return true;
  if (!a || !b) return false;
  const keysA = Object.keys(a);
  const keysB = Object.keys(b);
  if (keysA.length !== keysB.length) return false;
  return keysA.every(key => a[key] === b[key]);
}

function createSnapshot() {
  return {
    isSignedIn: Boolean(currentUser),
    user: cloneUser(currentUser),
  };
}

function notifySubscribers(reason) {
  const snapshot = createSnapshot();
  subscribers.forEach(listener => {
    try {
      listener(snapshot, reason);
    } catch (error) {
      console.warn('[auth] Subscriber error', error);
    }
  });
}

function setCurrentUser(user, reason) {
  const next = cloneUser(user);
  if (shallowEqual(currentUser, next)) return;
  currentUser = next;
  notifySubscribers(reason);
}

function toggleProfileVisibility(isVisible) {
  if (profileContainer) {
    profileContainer.hidden = !isVisible;
  }
  if (signInContainer) {
    signInContainer.hidden = isVisible;
  }
  if (signOutButton) {
    signOutButton.hidden = !isVisible;
  }
}

function showUser(user, options = {}) {
  const { persist = true, reason = 'signed-in' } = options;
  const record = serialiseUser(user);

  toggleProfileVisibility(true);

  if (nameElement) {
    nameElement.textContent = record.name || record.givenName || '';
  }
  if (emailElement) {
    emailElement.textContent = record.email || '';
  }
  if (avatarElement) {
    if (record.picture) {
      avatarElement.src = record.picture;
      avatarElement.hidden = false;
      const altName = record.name || record.givenName || 'Користувач Google';
      avatarElement.alt = `${altName} — аватар профілю`;
    } else {
      avatarElement.removeAttribute('src');
      avatarElement.hidden = true;
      avatarElement.alt = 'Google profile avatar';
    }
  }

  setCurrentUser(record, reason);

  if (persist) {
    persistAuthState({
      status: 'signed-in',
      user: record,
      updatedAt: Date.now(),
    });
  }
}

function hideUser(options = {}) {
  const { persist = true, reason = 'signed-out' } = options;

  toggleProfileVisibility(false);

  if (nameElement) nameElement.textContent = '';
  if (emailElement) emailElement.textContent = '';
  if (avatarElement) {
    avatarElement.removeAttribute('src');
    avatarElement.hidden = true;
    avatarElement.alt = 'Google profile avatar';
  }

  setCurrentUser(null, reason);

  if (persist) {
    persistAuthState({ status: 'signed-out', updatedAt: Date.now() });
  }
}

function handleCredentialResponse(response) {
  const credential = response?.credential;
  const payload = decodeJwtPayload(credential);
  if (!payload) {
    return;
  }

  const user = {
    name: payload.name || payload.given_name || '',
    givenName: payload.given_name || '',
    familyName: payload.family_name || '',
    email: payload.email || '',
    picture: payload.picture || '',
    credential,
    expiresAt: payload.exp ? payload.exp * 1000 : null,
  };

  loginUser(user);
  storeUser(user);
  showUser(user);
}

function handleSignOut(reason = 'signed-out') {
  clearStoredUser();
  hideUser({ reason });
  try {
    window.google?.accounts?.id?.disableAutoSelect();
  } catch (error) {
    console.warn('[auth] Unable to disable Google auto-select', error);
  }
}

function syncFromStorage(options = {}) {
  const { persist = false } = options;
  const storedUser = loadStoredUser();
  const validStoredUser = isStoredUserValid(storedUser) ? storedUser : null;
  const isExpired = validStoredUser?.expiresAt
    ? validStoredUser.expiresAt <= Date.now()
    : false;

  if (validStoredUser && !isExpired) {
    showUser(validStoredUser, {
      persist,
      reason: 'synced',
    });
  } else {
    if (isExpired || storedUser) {
      clearStoredUser();
    }
    hideUser({ persist, reason: 'synced' });
  }
}

function handleStorageEvent(event) {
  if (event.storageArea !== window.localStorage) return;
  if (
    event.key === STORAGE_KEY ||
    event.key === AUTH_STATE_KEY ||
    event.key === null
  ) {
    syncFromStorage({ persist: false });
  }
}

function initGoogleAuth() {
  if (isInitialised) return;
  isInitialised = true;

  window.handleGoogleCredential = handleCredentialResponse;

  if (signOutButton && !signOutButton.dataset.authInitialised) {
    signOutButton.addEventListener('click', () => handleSignOut());
    signOutButton.dataset.authInitialised = 'true';
  }

  syncFromStorage({ persist: false });
  window.addEventListener('storage', handleStorageEvent);
}

function subscribe(listener) {
  if (typeof listener !== 'function') {
    return () => {};
  }
  subscribers.add(listener);
  listener(createSnapshot(), currentUser ? 'signed-in' : 'signed-out');
  return () => {
    subscribers.delete(listener);
  };
}

function refreshAuthState() {
  syncFromStorage({ persist: false });
}

export const auth = {
  init: initGoogleAuth,
  isInitialised: () => isInitialised,
  isSignedIn: () => Boolean(currentUser),
  getUser: () => cloneUser(currentUser),
  getCredential: () => currentUser?.credential ?? null,
  signOut: () => handleSignOut(),
  subscribe,
  refresh: refreshAuthState,
  getSnapshot: createSnapshot,
  isAdmin: user => {
    const data = user || currentUser;
    const admins = ['volodkaposhta@gmail.com', 'nreznik451@gmail.com'];
    return admins.includes(data?.email);
  },
};

export { initGoogleAuth };
