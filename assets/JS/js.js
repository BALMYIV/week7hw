

  var config = {
    apiKey: "AIzaSyCW4duBICOf1VFSxmGPT3yrNAGhDTQmQNY",
    authDomain: "train-project-b034e.firebaseapp.com",
    databaseURL: "https://train-project-b034e.firebaseio.com",
    projectId: "train-project-b034e",
    storageBucket: "train-project-b034e.appspot.com",
    messagingSenderId: "242782211418"
  };
 


firebase.initializeApp(config);

var database = firebase.database();

var name = "";
var destination = "";
var time = "";
var frequency = 0;

// 2. Button for adding suckas
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  var audio = new Audio('assets/sounds/train.mp3')
  audio.play(audio);
  // Grabs user input
  var trainName = $("#train-name-input").val().trim();
  var trainDestination = $("#destination-input").val().trim();
  var trainStart = moment($("#start-input").val().trim(), "HH:mm").format("X");
  var trainFrequency = $("#frequency-input").val().trim();


  //console.log(trainStart);

  // Creates local "temporary" object for holding train data
  var newTrain = {
    name: trainName,
    destination: trainDestination,
    start: trainStart,
    frequency: trainFrequency
  };

  // Uploads train data to the database
  database.ref().push(newTrain);


  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#start-input").val("");
  $("#frequency-input").val("");
});

// 3. Create Firebase event for adding train to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  startEndDiff = 0; 
  minutesAway = 0;
  nextArrival = 0; 
  nextArrivalPretty = 0; 

  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var trainDestination = childSnapshot.val().destination;
  var trainStart = childSnapshot.val().start;
  var trainFrequency = childSnapshot.val().frequency;

var startEndDiff = Math.abs(moment().diff(moment.unix(trainStart, "X"), "minutes"));
console.log(startEndDiff,  "startendDiff");
var minutesAway = Math.round(Math.abs((((startEndDiff / trainFrequency) % 1)*trainFrequency)-trainFrequency));
console.log(minutesAway);
var nextArrival = moment().add(minutesAway, "minutes");
console.log(moment(trainStart, "X"), "HH:mm");
//console.log(nextArrival._d);



//var nextArrivalPretty = moment.unix(nextArrival._d).format("HH:mm");
//console.log(nextArrivalPretty);

var nextArrivalPretty = moment().add(minutesAway, "minutes").format("HH:mm");
console.log(nextArrivalPretty);



  // Add each train's data into the table
  $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" +
  trainFrequency + "</td><td>" + nextArrivalPretty + "</td><td>" + minutesAway + "</td><td>" );
});


