const HN = "https://hacker-news.firebaseio.com/v0/";

function get(url) {
  return fetch(url)
    .then(res => res.json())
    .then(data => data)
    .catch(error => {
      console.log(error);
      throw error;
    });
}

const getHN = endpoint => get(`${HN}${endpoint}`);

const getItem = item => getHN(`item/${item}.json`);

const convertUnixTimestamp = item => {
  item.time = new Date(item.time * 1000).toLocaleString();
  return item;
};

const processData = data => {
  return data.map(convertUnixTimestamp);
};

const getStories = type =>
  getHN(`${type}stories.json`)
    .then(data => data.map(getItem))
    .then(promises => Promise.all(promises))
    .then(processData);

const postStories = (data, storyType) => {
  return postMessage({
    type: "stories",
    storyType,
    data
  });
};

function getAllStories(stories) {
  stories.forEach(storyType =>
    getStories(storyType).then(data => postStories(data, storyType))
  );
}

const processCommand = (command, data) => {
  switch (command) {
    case "get stories":
      getAllStories(data);
      break;
    default:
      postMessage(`Command: '${command}' not recognised`);
  }
};

const sendMessage = message =>
  postMessage({
    type: "message",
    data: message
  });

this.onmessage = function(e) {
  let message = e.data;
  console.log("Message received from messenger:", message);
  switch (message.type) {
    case "command":
      processCommand(message.command, message.data);
      break;
    case "message":
      if (message.data === "Wake up Phil") sendMessage("I am awake");
      break;
    default:
      sendMessage("Unrecognised message type", message.type);
      break;
  }
};

this.onerror = e => {
  throw e;
};
