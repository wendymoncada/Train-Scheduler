// INITIALIZING FIREBASE
var config = {
    apiKey: "AIzaSyCP-1D-hmU5wt4KMtEUIrQfOf7-VqMjEvY",
    authDomain: "wendyuclaassign.firebaseapp.com",
    databaseURL: "https://wendyuclaassign.firebaseio.com",
    projectId: "wendyuclaassign",
    storageBucket: "wendyuclaassign.appspot.com",
    messagingSenderId: "465553349647"
};
firebase.initializeApp(config);

var database = firebase.database();

var train = "";
var destination = "";
var firstTrain = "";
var frequency = "";

$("#submit-btn").on("click", function (event) {
    event.preventDefault();

    train = $("#train-name").val().trim();
    destination = $("#destination").val().trim();
    firstTime = $("#first-time").val().trim();
    frequency = $("#frequency").val().trim();

    database.ref().push({
        train: train,
        destination: destination,
        firstTime: firstTime,
        frequency: frequency
    })
});

database.ref().on("child_added", function (snapshot) {

    var sv = snapshot.val();
    var tdTrain = $("<td>");
    var tdDestination = $("<td>");
    var tdFreq = $("<td>");
    var tdArrival = $("<td>");
    var tdMinsAway = $("<td>");
    var tr = $("<tr>");

    tdTrain.text(sv.train);
    tdDestination.text(sv.destination);
    tdFreq.text(sv.frequency);
    tdArrival.text();
    tdMinsAway.text();

    tr.append(tdTrain);
    tr.append(tdDestination);
    tr.append(tdFreq);
    tr.append(tdArrival);
    tr.append(tdMinsAway);

    console.log(sv);
    console.log(sv.train);
    console.log(sv.destination);
    console.log(sv.firstTime);
    console.log(sv.frequency);

    // TRAIN EXAMPLE
    var firstTimeConverted = moment(sv.firstTime, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    var realTime = moment();
    console.log("Current Time: " + moment(realTime).format("hh:mm"));

    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    var remainder = diffTime % sv.frequency;
    console.log(remainder);

    var minsRemaining = sv.frequency - remainder;
    console.log(minsRemaining);

    var arrival = moment().add(minsRemaining, "minutes");
    console.log(arrival);

    var minsAway = moment(arrival).format("hh:mm");
    console.log(minsAway);

    tdArrival.html(minsAway);
    tr.append(tdArrival);

    tdMinsAway.html(minsRemaining);
    tr.append(tdMinsAway);

    $(".displayed-data").append(tr);
});

$("#clear-btn").on("click", clear);