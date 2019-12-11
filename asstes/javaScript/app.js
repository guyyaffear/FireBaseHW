var database = firebase.database();

// Initial Values
var trainName = "";
var destination = "";
var firstTrain = "";
var frequency = 0;

// Capture Button Click
$("#add-train").on("click", function (event) {
    // Don't refresh the page!
    event.preventDefault();

    trainName = $("#trainName").val().trim();
    destination = $("#inputDestination").val().trim();
    firstTrain = $("#firstTrain").val();
    frequency = $("#inputFreq").val().trim();

    database.ref().push({
        trainName: trainName,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency
    });
});

// Firebase watcher .on("child_added"
database.ref().on("child_added", function (snapshot) {
    // storing the snapshot.val() in a variable for convenience
    var sv = snapshot.val();

    // Change the HTML to reflect
    var addTableRow = $("<tr>");
    var addTrainName = $("<th>", { scope: "row" });
    var addDestination = $("<td>")
    var addFirstTrain = $("<td>");
    var addFrequency = $("<td>");
    var addMinutesAway = $("<td>");

    var theirTime = new Date(new Date().toLocaleDateString() + " " + snapshot.val().firstTrain + ":00");
    var currentTime = new Date();
    var timeDiff = currentTime - theirTime;
    timeDiff /= 1000;
    timeDiff /= 60;
    var minutesAway = Math.ceil(Math.ceil(timeDiff / snapshot.val().frequency) * snapshot.val().frequency - timeDiff);

    var completedRow = addTableRow.append(
        addTrainName.text(snapshot.val().trainName),
        addDestination.text(snapshot.val().destination),
        addFirstTrain.text(snapshot.val().firstTrain),
        addFrequency.text(snapshot.val().frequency),
        addMinutesAway.text(minutesAway)
    );

    $("#tbody").append(completedRow);

    // Handle the errors
}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
});
        // Your web app's Firebase configuration
        var firebaseConfig = {
            apiKey: "AIzaSyBG9iC02s9wOy7GCNqKi-tV-4XNOXiwO70",
            authDomain: "fir-intro-guy.firebaseapp.com",
            databaseURL: "https://fir-intro-guy.firebaseio.com",
            projectId: "fir-intro-guy",
            storageBucket: "fir-intro-guy.appspot.com",
            messagingSenderId: "1049346683635",
            appId: "1:1049346683635:web:a07016f5e59ba19a7bbd86"
        };
        // Initialize Firebase
        firebase.initializeApp(firebaseConfig);
