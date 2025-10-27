const presentSimpleA1 = {
  id: 'present-simple-a1',
  title: 'Перша перевірка знаннь',
  description:
    'Перевірка на знання базових тем (привітання, базова інформація про себе, кольори, алфавіт, офісні предмети)',
  level: 'A1',
  tags: ['grammar', 'present simple'],
  duration: 25,

  tasks: [
    {
      id: 'open-speaking-check-1',
      type: 'open',
      prompt: 'Answer the following speaking questions. Use full sentences.',
      items: [
        { situation: 'What is your name?' },
        { situation: 'How old are you?' },
        { situation: 'Where are you from?' },
        { situation: 'What is your nationality?' },
        { situation: 'How do you greet your teacher in the morning?' },
        { situation: 'How do you say goodbye to your friends?' },
        { situation: 'How do you thank your teacher after the lesson?' },
        { situation: 'Spell your name letter by letter.' },
        { situation: "Spell the word 'book' or 'teacher'." },
        { situation: 'Spell your favorite color.' },
        { situation: 'What color is your pen?' },
        { situation: 'What is your favorite color and why?' },
        { situation: 'What colors do you see around you right now?' },
        { situation: 'Point to an object near you and say what it is.' },
        { situation: 'Point to an object in the distance and say what it is.' },
        { situation: 'Point to several objects and say what they are.' },
        { situation: 'Name any object in the room with an article.' },
        {
          situation:
            'Name one object in the room, then several more of the same kind.',
        },
        { situation: 'Describe what is in your backpack or pencil case.' },
        { situation: 'Describe your pencil case or workspace.' },
        { situation: 'What do you usually take with you to school?' },
        { situation: 'What do you see on your desk?' },
        { situation: 'Describe the room you are sitting in right now.' },
        { situation: 'Where are you now?' },
        { situation: 'Who is your best friend?' },
        { situation: 'Tell us briefly about your family.' },
        { situation: 'Tell me about your favorite animal.' },
        {
          situation:
            'How do you greet your friend when you enter the classroom?',
        },
        { situation: 'How do you greet your friend in the morning?' },
        { situation: 'How do you say goodbye to your friend after school?' },
        { situation: 'Do you have one cat or two?' },
        { situation: 'Do you have a brother or a sister?' },
        { situation: 'What color is your backpack?' },
        { situation: 'Describe your clothes today using color words.' },
        { situation: 'What color is your favorite object?' },
        { situation: 'Name five colors in English.' },
        { situation: 'Show me something blue and say what it is.' },
        { situation: 'Tell me what you usually have on your desk.' },
        { situation: 'Talk about your school or classroom using five words.' },
        { situation: 'Say one sentence with your favorite color and object.' },
      ],
      scoring: {
        criteria: [
          'Uses complete sentences when possible',
          'Pronounces words clearly',
          'Understands and responds without translation',
          'Uses A1 vocabulary correctly',
        ],
      },
    },
  ],
};

export default presentSimpleA1;
