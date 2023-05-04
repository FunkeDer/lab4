function getApiResult() {
  let input = document.getElementById('inputApi');
  let apiResult = document.getElementById('api-result');
  let requestURL = ('https://newton.vercel.app/api/v2/derive/' + input.value.toLowerCase()).replaceAll('^', '%5E').replaceAll('+', '%2B');
    
  console.log(requestURL);

  const xhr = new XMLHttpRequest();
  xhr.open('GET',requestURL,true);

  let retryCount = 0;
  const maxRetries = 2;

  xhr.onload = () => {
    if (xhr.status >= 300) {
      document.getElementById('api-result').innerHTML = 'error';
      if (retryCount < maxRetries) {
        retryRequest();
        retryCount++;
      }
    } 
    else {
      const answer = JSON.parse(xhr.response);
      appendData(answer);
    }
  };

  xhr.send(null);

  function appendData(data) {
    apiResult.innerHTML = 'Result: '  + data.result;
  }

  function retryRequest() {
    setTimeout(() => {
      xhr.open('GET',requestURL,true);
      xhr.send(null);
    }, 1000);
  }
}

function getStyles(){
let cssResult = document.getElementById('css-result')
const xhr = new XMLHttpRequest();
xhr.open('GET', 'style.css');
xhr.onreadystatechange = function() {
  if (xhr.readyState === 4 && xhr.status === 200) {
    const cssContent = xhr.responseText;
    cssResult.innerHTML = cssContent
  }
};
xhr.send();
}

function getScript(){
    let scriptResult = document.getElementById('script-result')
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'script.js');
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status === 200) {
        const scriptContent = xhr.responseText;
        scriptResult.innerHTML = scriptContent
      }
    };
    xhr.send();
}