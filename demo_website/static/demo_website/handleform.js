function showLoading(){
  loading = document.getElementById("loading");
  info = document.getElementById("info");
  text = document.getElementById("results-text");
  error = document.getElementById("error");

  info.style.opacity = 0;
  text.style.opacity = 0;
  loading.style.opacity = 1;
  error.style.opacity = 0;
}
function showResults(result){
  loading = document.getElementById("loading");
  text = document.getElementById("results-text");
  loading.style.opacity = 0;
  text.style.opacity = 1;
  text.innerText = result;
}
function showError(message){
  error = document.getElementById("error");
  loading = document.getElementById("loading");
  loading.style.opacity = 0;
  error.style.opacity = 1;
  if (message){
    errorMessageSpan = document.getElementById('errorMessage');
    errorMessageSpan.innerText = message;
  }
}

var prediction_class_names = ["Real", "Fake"];

function handleForm(){
  showLoading();
  var input = document.getElementById('url').value;
  if (input.length == 0){
    showError("Make sure you have entered a valid input.");
    return;
  }
  var input_field = document.getElementById('url');
  console.log(input);
  $.get("predict?input=" + encodeURIComponent(input), function(data, status){
    console.log(status);
    console.log(data);
    if (status == 'error'){
      input_field.focus();
      input_field.blur();
      input_field.focus();
      input_field.placeholder = input;
      input_field.value = '';
      showError("There was an error reaching our server.");
    } else {
      if (data.error){
        input_field.focus();
        input_field.blur();
        input_field.focus();
        input_field.placeholder = input;
        input_field.value = '';
        showError("There was an error reaching the site. Make sure the input is valid.");
      } else {
        input_field.focus();
        input_field.blur();
        input_field.focus();
        input_field.placeholder = input;
        input_field.value = '';

        console.log(data.prediction);
        var class_name = prediction_class_names[data.prediction];

      }
    }
  });
}
