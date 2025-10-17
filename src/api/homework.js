import axios from './axiosInstance.js';

const cache = {};

function isValidCache(key) {}

export const getUserHomework = async data => {
  const key = JSON.stringify(data);
  const previousData = cache[key];
  if (previousData) return previousData;

  const res = await axios.post('/homework/list', data);
  cache[key] = res.data;
  return res.data;
};

export const addHomework = async homework => {
  const res = await axios.post('/homework', homework);
  return res.data;
};

function newRadioAnswer(userCache, answer) {
  const task = userCache.items.find(el => el._id === answer.taskId);
  const items = task.answers;
  const itemIndex = items.findIndex(el => el.name == answer.name);

  if (itemIndex >= 0) {
    items[itemIndex] = answer;
  } else {
    items.push(answer);
  }

  const data = {
    taskId: answer.taskId,
    answers: items,
  };

  return updateHomework(data);
}

function newAnswer(userCache, answer) {
  if (answer.type === 'radio') return newRadioAnswer(userCache, answer);

  const task = userCache.items.find(el => el._id === answer.taskId);
  const items = task.answers;
  const itemIndex = items.findIndex(el => el.inputId == answer.inputId);

  const data = {
    taskId: answer.taskId,
    answers: items,
  };

  if (itemIndex >= 0) {
    items[itemIndex] = answer;
  } else {
    items.push(answer);
  }

  return updateHomework(data);
}

export const addAnswer = async answer => {
  const keys = Object.keys(cache);
  let userCache = cache[keys[0]];

  if (!userCache) {
    const data = {
      taskId: answer.taskId,
      answers: [answer],
    };
    return updateHomework(data);
  } else {
    newAnswer(userCache, answer);
  }
};
export const updateHomework = async ({ taskId, ...homework }) => {
  const res = await axios.patch(`/homework/${taskId}`, homework);

  return res.data;
};

export const getUserHomeworkLessons = async userEmail => {
  const params = {
    page: 1,
    limit: 100,
    userEmail,
  };

  const res = await axios.post('/homework/lessons', params);
  const { data } = res;

  data.items = data.items.reverse();
  return data.items;
};
