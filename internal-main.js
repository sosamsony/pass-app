function sortBoardingPasses(passes) {
  return passes.sort((a, b) => {
    if (a.from < b.from) return -1;
    if (a.from > b.from) return 1;
    if (a.to < b.to) return -1;
    if (a.to > b.to) return 1;
    return 0;
  });
}

function buildItinerary(passes) {
  let itinerary = "";
  let previousTo = "";
  for (let i = 0; i < passes.length; i++) {
    const pass = passes[i];
    itinerary += `${i + 1}. `;
    if (pass.type === "train") {
      itinerary += `Take train ${pass.number} from ${pass.from} to ${pass.to}. Sit in seat ${pass.seat}.`;
    } else if (pass.type === "bus") {
      itinerary += `Take the ${pass.number} from ${pass.from} to ${pass.to}. No seat assignment.`;
    } else if (pass.type === "airplane") {
      itinerary += `From ${previousTo}, take ${pass.number} from ${pass.from} to ${pass.to}.`;
      if (pass.seat) {
        itinerary += ` Sit in seat ${pass.seat}.`;
      }
      if (pass.gate) {
        itinerary += ` Gate ${pass.gate}.`;
      }
      if (pass.counter) {
        itinerary += ` Baggage drop at ticket counter ${pass.counter}.`;
      } else {
        itinerary += ` Baggage will be automatically transferred from your last leg.`;
      }
    }
    itinerary += "\n";
    previousTo = pass.to;
  }
  itinerary += "You have arrived at your final destination.";
  return itinerary;
}

const data = [
  {
      "type": "train",
      "number": "23A",
      "from": "Beirut",
      "to": "Turkey",
      "seat": "15B",
      "gate": null,
      "counter": null
    },
    {
      "type": "airplane",
      "number": "flight SK22",
      "from": "Aleppo",
      "to": "Montreal YUL",
      "seat": "7B",
      "gate": "22",
      "counter": null
    },
    {
      "type": "bus",
      "number": "airport",
      "from": "Turkey",
      "to": "Ibiza Airport",
      "seat": null,
      "gate": null,
      "counter": null
    },
    {
      "type": "airplane",
      "number": "flight SK455",
      "from": "Ibiza Airport",
      "to": "Aleppo",
      "seat": "3A",
      "gate": "15B",
      "counter": "344"
    }
];

const sortedPasses = sortBoardingPasses(data);
const itinerary = buildItinerary(sortedPasses);
document.getElementById("itinerary").innerHTML = itinerary;