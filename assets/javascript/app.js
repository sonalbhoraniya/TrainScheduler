var firebaseConfig = {
    apiKey: "AIzaSyA-Bp8Tzmzmfvh-wGBXD2sv-uNLCnUi2zc",
    authDomain: "trainscheduler-c8c17.firebaseapp.com",
    databaseURL: "https://trainscheduler-c8c17.firebaseio.com",
    projectId: "trainscheduler-c8c17",
    storageBucket: "trainscheduler-c8c17.appspot.com",
    messagingSenderId: "185107131403",
    appId: "1:185107131403:web:8e80547aafb7bd9f6eab0e",
    measurementId: "G-5RNF76YXN6"

};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var database = firebase.database();

var trainName = "";
var destination = "";
var trainTime = "";
var frequency = "";

$("#add-train").on("click", function (event) {
    event.preventDefault();

    trainName = $("#trainName1").val().trim();
    destination = $("#destination1").val().trim();
    trainTime = $("#trainTime1").val().trim();
    frequency = $("#frequency1").val().trim();

    database.ref().push({
        trainName: trainName,
        destination: destination,
        trainTime: trainTime,
        frequency: frequency,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    });

     // First Time (pushed back 1 year to make sure it comes before current time)
     var firstTimeConverted = moment(trainTime, "HH:mm").subtract(1, "years");
     console.log(firstTimeConverted);
 
     // Current Time
     var currentTime = moment();
     console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
 
     // Difference between the times
     var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
     console.log("DIFFERENCE IN TIME: " + diffTime);
 
     // Time apart (remainder)
     var tRemainder = diffTime % frequency;
     console.log(tRemainder);
 
     // Minute Until Train
     var tMinutesTillTrain = frequency - tRemainder;
     console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
 
     // Next Train
     var nextTrain = moment().add(tMinutesTillTrain, "minutes");
     console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

    var newRow = $("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + moment(nextTrain).format("hh:mm") + "</td><td>" + tMinutesTillTrain + "</td>");

    console.log(newRow);

    $(".table").append(newRow);
    

});


