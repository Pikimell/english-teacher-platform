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
  {
    lang = 'en',
    voiceName = 'Google UK English Female',
    rate = 1,
    pitch = 1,
    volume = 1,
  } = {}
) {
  await getVoicesReady();
  const utter = new SpeechSynthesisUtterance(text);
  const voices = speechSynthesis.getVoices();
  console.log(
    [...voices]
      .filter(el => el.lang.includes(lang))
      .map(el => el.name)
      .join(',')
  );

  // вибір голосу
  let voice =
    voices.find(v =>
      voiceName
        ? v.name === voiceName
        : v.lang.toLowerCase().startsWith(lang.toLowerCase()) &&
          v.name.toLowerCase().includes('female')
    ) ||
    voices.find(v => v.lang.startsWith('en')) ||
    voices[0];

  utter.voice = voice;
  utter.lang = voice?.lang || lang;
  utter.rate = rate; // можна передати 0.5 для повільного
  utter.pitch = pitch;
  utter.volume = volume;

  speechSynthesis.cancel();
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
