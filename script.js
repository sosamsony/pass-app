function sortJourney() {
    // Parse JSON array of boarding passes from input field
    var boardingPasses = JSON.parse(document.getElementById("boardingPasses").value);
  
    // Sort boarding passes based on "from" and "to" fields
    boardingPasses.sort(function(a, b) {
      if (a.from < b.from) {
        return -1;
      } else if (a.from > b.from) {
        return 1;
      } else {
        if (a.to < b.to) {
          return -1;
        } else if (a.to > b.to) {
          return 1;
        } else {
          return 0;
        }
      }
    });
  
    // Display sorted journey in journey div element
    var journeyDiv = document.getElementById("journey");
    journeyDiv.innerHTML = "";
    for (var i = 0; i < boardingPasses.length; i++) {
      var pass = boardingPasses[i];
      var passString = "";
      switch (pass.type) {
        case "train":
          passString += "Take train " + pass.number + " from " + pass.from + " to " + pass.to + ". Sit in seat " + pass.seat + ".";
          break;
        case "airplane":
          passString += "From " + pass.from + ", take " + pass.number + " to " + pass.to + ". Gate " + pass.gate + ", seat " + pass.seat + ".";
          if (pass.counter) {
            passString += " Baggage drop at ticket counter " + pass.counter + ".";
          } else {
            passString += " Baggage will be automatically transferred from your last leg.";
          }
          break;
        case "bus":
          passString += "Take the " + pass.number + " bus from " + pass.from + " to " + pass.to + ".";
          if (pass.seat) {
            passString += " Sit in seat " + pass.seat + ".";
          } else {
            passString += " No seat assignment.";
          }
          break;
      }
      journeyDiv.innerHTML += (i + 1) + ". " + passString + "<br>";
    }
    journeyDiv.innerHTML += "You have arrived at your final destination.";
  }
  