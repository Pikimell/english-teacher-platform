const hasSpeechSynthesis = () =>
  typeof window !== 'undefined' && 'speechSynthesis' in window;

let voicesReadyPromise = null;
function getVoicesReady() {
  if (!hasSpeechSynthesis()) return Promise.resolve([]);
  if (voicesReadyPromise) return voicesReadyPromise;
  voicesReadyPromise = new Promise(resolve => {
    const voices = window.speechSynthesis.getVoices();
    if (voices.length) {
      resolve(voices);
      return;
    }
    const handle = () => {
      const nextVoices = window.speechSynthesis.getVoices();
      if (nextVoices.length) {
        window.speechSynthesis.onvoiceschanged = null;
        resolve(nextVoices);
      }
    };
    window.speechSynthesis.onvoiceschanged = handle;
  });
  return voicesReadyPromise;
}

function normalizeLower(value) {
  return String(value || '')
    .trim()
    .toLowerCase();
}

const FEMALE_VOICE_HINTS = [
  'female',
  'woman',
  'girl',
  'samantha',
  'victoria',
  'karen',
  'moira',
  'serena',
  'allison',
  'ava',
  'amelie',
  'amelia',
  'emma',
  'olivia',
  'isabella',
  'mia',
  'sophia',
  'sofia',
  'fiona',
  'pauline',
  'paula',
  'linda',
  'viola',
  'nora',
  'clara',
  'lucy',
  'tessa',
  'zoe',
];

const MALE_VOICE_HINTS = [
  'male',
  'man',
  'boy',
  'alex',
  'daniel',
  'fred',
  'bruce',
  'oliver',
  'arthur',
  'henry',
  'james',
  'john',
  'luke',
  'mark',
  'michael',
  'paul',
  'peter',
  'thomas',
  'victor',
  'william',
  'liam',
  'noah',
  'sam',
  'george',
  'carlos',
  'diego',
  'roberto',
  'sergio',
  'mateo',
];

const matchVoiceHints = (name, uri, hints) =>
  hints.some(hint => name.includes(hint) || uri.includes(hint));

export const estimateVoiceGender = voice => {
  if (!voice) return null;
  const name = normalizeLower(voice.name);
  const uri = normalizeLower(voice.voiceURI);
  if (matchVoiceHints(name, uri, FEMALE_VOICE_HINTS)) return 'female';
  if (matchVoiceHints(name, uri, MALE_VOICE_HINTS)) return 'male';
  return null;
};

function pickVoice(voices, options = {}) {
  if (!Array.isArray(voices) || !voices.length) return null;
  const {
    lang = 'en',
    voiceName,
    voice,
    voiceGender,
    gender,
  } = options;

  const normalizedLang = normalizeLower(lang) || 'en';
  const preferredName =
    voiceName || (voice && /\s/.test(String(voice)) ? String(voice) : null);
  const genderHintRaw =
    gender || voiceGender || (!preferredName && voice) || null;
  const genderHint = normalizeLower(genderHintRaw);

  let chosen =
    (preferredName && voices.find(v => v.name === preferredName)) ||
    (preferredName &&
      voices.find(v => normalizeLower(v.name) === normalizeLower(preferredName))) ||
    null;

  const voiceMatchesGender = candidate => {
    if (!genderHint) return false;
    const detected = estimateVoiceGender(candidate);
    if (detected) return detected === genderHint;
    const name = normalizeLower(candidate.name);
    const uri = normalizeLower(candidate.voiceURI);
    return name.includes(genderHint) || uri.includes(genderHint);
  };

  const voicesForLang = voices.filter(v =>
    normalizeLower(v.lang).startsWith(normalizedLang)
  );

  if (!chosen && genderHint) {
    chosen =
      voicesForLang.find(voiceMatchesGender) ||
      voices.find(voiceMatchesGender) ||
      null;
  }

  if (!chosen && preferredName && normalizeLower(preferredName)) {
    const lowered = normalizeLower(preferredName);
    chosen =
      voicesForLang.find(v => normalizeLower(v.name).includes(lowered)) ||
      voices.find(v => normalizeLower(v.name).includes(lowered)) ||
      null;
  }

  if (!chosen) {
    chosen =
      voicesForLang.find(v => normalizeLower(v.name).includes('female')) ||
      voicesForLang[0] ||
      voices.find(v => normalizeLower(v.name).includes('female')) ||
      voices[0] ||
      null;
  }

  return chosen || null;
}

export async function speakText(
  text,
  {
    lang = 'en',
    voiceName,
    voice,
    voiceGender,
    gender,
    rate = 1,
    pitch = 1,
    volume = 1,
  } = {}
) {
  if (!hasSpeechSynthesis()) return null;
  await getVoicesReady();
  const utter = new SpeechSynthesisUtterance(text);
  const availableVoices = window.speechSynthesis.getVoices();
  const chosen = pickVoice(availableVoices, {
    lang,
    voiceName,
    voice,
    voiceGender,
    gender,
  });

  if (chosen) {
    utter.voice = chosen;
    utter.lang = chosen.lang || lang || 'en';
  } else {
    utter.lang = lang || 'en';
  }

  utter.rate = rate;
  utter.pitch = pitch;
  utter.volume = volume;

  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utter);
  return utter;
}

export function createPlayBtn(text) {
  const playBtn = document.createElement('span');
  playBtn.textContent = '🔊';
  playBtn.addEventListener('click', () => {
    speakText(text);
  });
  playBtn.classList.add('play-speak-btn');
  return playBtn;
}

export async function listAvailableVoices() {
  if (!hasSpeechSynthesis()) return [];
  await getVoicesReady();
  const voices = window.speechSynthesis.getVoices();
  return Array.isArray(voices) ? voices.slice() : [];
}

export { pickVoice };
