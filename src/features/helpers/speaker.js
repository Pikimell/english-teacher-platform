function getVoicesReady() {
  return new Promise(resolve => {
    const voices = speechSynthesis.getVoices();
    if (voices.length) return resolve(voices);
    speechSynthesis.onvoiceschanged = () =>
      resolve(speechSynthesis.getVoices());
  });
}

function normalizeLower(value) {
  return String(value || '')
    .trim()
    .toLowerCase();
}

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
    const name = normalizeLower(candidate.name);
    const uri = normalizeLower(candidate.voiceURI);
    if (genderHint === 'male') {
      return (
        name.includes('male') ||
        uri.includes('male') ||
        /\bmale\b|\bman\b|\bboy\b|m\d/.test(name)
      );
    }
    if (genderHint === 'female') {
      return (
        name.includes('female') ||
        uri.includes('female') ||
        name.includes('woman') ||
        name.includes('girl')
      );
    }
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
  await getVoicesReady();
  const utter = new SpeechSynthesisUtterance(text);
  const availableVoices = speechSynthesis.getVoices();
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

  speechSynthesis.cancel();
  speechSynthesis.speak(utter);
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

export { pickVoice };
