
//recording code

//start of the file - the file setup
var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent


var recognition = new SpeechRecognition();
var speechRecognitionList = new SpeechGrammarList();
recognition.grammars = speechRecognitionList;
recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

var diagnostic = document.querySelector('.output');
var bg = document.querySelector('html');
var hints = document.querySelector('.hints');


hints.innerHTML = 'Tap on recorder to record new task / use the app regular';

document.getElementById("recorder-button-holder").onclick = function() {
  recognition.start();
  console.log('Ready to receive a command.');
}

recognition.onresult = function(event) {

  var last = event.results.length - 1;
  var word = event.results[last][0].transcript;

  diagnostic.textContent = 'Result received: ' + word + '.';
  insertTask(word);
  console.log('Confidence: ' + event.results[0][0].confidence);
}

recognition.onspeechend = function() {
  recognition.stop();
}

recognition.onerror = function(event) {
  diagnostic.textContent = 'Error occurred in recognition: ' + event.error;
}


//injecting new task by voice code


function insertTask(taskName){
  let myTDL = document.createElement('li')
  myTDL.textContent = taskName;
  document.getElementById('todo-ul').appendChild(myTDL)
}


let newTaskForm = document.getElementById('add-task')
newTaskForm.addEventListener('submit', function(event) {
  event.preventDefault();
  let taskName = document.getElementById('task-label').value;

  console.log(`${taskName}`);
  document.getElementById('task-label').value = '';
  insertTask(taskName);
});

