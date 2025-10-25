function getVoicesReady() {
  return new Promise(resolve => {
    const voices = speechSynthesis.getVoices();
    if (voices.length) return resolve(voices);
    speechSynthesis.onvoiceschanged = () =>
      resolve(speechSynthesis.getVoices());
  });
}

export async function speakText(
  text,
  { lang = 'en-EN', voiceName, rate = 1, pitch = 1, volume = 1 } = {}
) {
  await getVoicesReady();
  const utter = new SpeechSynthesisUtterance(text);
  const voices = speechSynthesis.getVoices();

  // Обрати голос під мову або за назвою
  let voice = voices.find(v =>
    voiceName
      ? v.name === voiceName
      : v.lang.toLowerCase().startsWith(lang.toLowerCase())
  );
  if (!voice) voice = voices.find(v => v.lang.startsWith('en')) || voices[0]; // фолбек
  utter.voice = voice;

  utter.lang = voice?.lang || lang;
  utter.rate = rate;
  utter.pitch = pitch;
  utter.volume = volume;

  speechSynthesis.cancel(); // скинемо попередні черги
  speechSynthesis.speak(utter);
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
