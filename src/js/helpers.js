import { async } from 'regenerator-runtime';
import { TIMEOUT_SEC } from './config';

// This function is the function that will reject the promise gotten from the getJSON function if the internet connection is bad. In other to use this function we will a race between the fetch(url) and the timeout function promise and which ever occur first win the race. Using Promise.race()
const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const getJSON = async function (url) {
  try {
    const response = await Promise.race([
      fetch(url),
      timeout(`${TIMEOUT_SEC}`),
    ]);
    const data = await response.json();
    // console.log(response);
    // console.log(data);

    if (!response.ok) throw new Error(`${data.message} ${response.status}`);
    //   the return data is going to be the resolved value that the getJSON return
    return data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

// 'https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bcfb2'
// 'https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604691c37cdc054bd0d4'
