import { auth } from '@features/auth/auth.js';
import { refs } from '@features/layout/dom-refs.js';

auth.subscribe(({ isSignedIn, user }) => {
  if (!refs.headerActions.createBtn || !refs.headerActions.createBtn) {
    return;
  }

  if (!isSignedIn) {
    refs.headerActions.createBtn.hidden = true;
    refs.headerActions.homework.hidden = true;
    return;
  }

  const isAdmin = auth.isAdmin(user);

  if (isAdmin) {
    refs.headerActions.createBtn.hidden = false;
    refs.headerActions.homework.hidden = true;
  } else {
    refs.headerActions.createBtn.hidden = true;
    refs.headerActions.homework.hidden = false;
  }
});
