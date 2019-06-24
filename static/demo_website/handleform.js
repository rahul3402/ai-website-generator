function showLoading(){
  loading = document.getElementById("loading");
  info = document.getElementById("info");
  text = document.getElementById("results-text");

  info.style.opacity = 0;
  text.style.opacity = 0;
  loading.style.opacity = 1;
}
function showReal(){
  body = document.body;
  body.style.backgroundColor = "#009900";
  real = document.getElementById("real");
  loading.style.opacity = 0;
  real.style.opacity = 1;
}
function showFake(){
  body = document.body;
  body.style.backgroundColor = "#c00000";
  fake = document.getElementById("fake");
  loading.style.opacity = 0;
  fake.style.opacity = 1;
}
function showError(message){
  body = document.body;
  body.style.backgroundColor = "#444";
  error = document.getElementById("error");
  loading.style.opacity = 0;
  error.style.opacity = 1;
  if (message){
    errorMessageSpan = document.getElementById('errorMessage');
    errorMessageSpan.innerText = message;
  }
}

function handleForm(){
  showLoading();
  var url = e.target.url.value;
  if (url.length == 0){
    showError("Make sure you have entered a valid URL.");
    return;
  }
  if (url.indexOf("http") == -1){
    url = "http://".concat(url);
  }
  var l = document.createElement("a");
  l.href = url;
  shortenedURL = l.protocol + "//" + l.hostname;
  console.log(shortenedURL);
  HTTP.get("/detect?url=" + encodeURIComponent(shortenedURL), {}, function(error, response){
    console.log(error);
    response = JSON.parse(response.content);
    console.log(response);
    if (error){
      e.target.url.focus();
      e.target.url.blur();
      e.target.url.focus();
      e.target.url.placeholder = e.target.url.value;
      e.target.url.value = '';
      showError("There was an error reaching our server.");
    } else {
      if (response.error){
        e.target.url.focus();
        e.target.url.blur();
        e.target.url.focus();
        e.target.url.placeholder = e.target.url.value;
        e.target.url.value = '';
        showError("There was an error reaching the site. Make sure the URL is valid.");
      } else {
        if (response.fake){
          e.target.url.focus();
          e.target.url.blur();
          e.target.url.focus();
          e.target.url.placeholder = e.target.url.value;
          e.target.url.value = '';
          showFake();
        } else {
          e.target.url.focus();
          e.target.url.blur();
          e.target.url.focus();
          e.target.url.placeholder = e.target.url.value;
          e.target.url.value = '';
          showReal();
        }
      }
    }
  });
  return false;
}
