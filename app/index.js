import clock from "clock";
import * as document from "document";
import { preferences } from "user-settings";
import * as util from "../common/utils";
import { battery } from "power";

// Update the clock every minute
clock.granularity = "seconds";

// Get a handle on the <text> element
const timeLabel = document.getElementById("time");
const secsLabel = document.getElementById("secs");
const secondTimeLabel = document.getElementById("secondTime");

const chargePercentLabel = document.getElementById("chargePercent");

// Adjust the second time TODO: What is this supposed to be? An alarm? Timezone?
let adjustBy = 5; // 5 hours

// Initial display
updateCharge();

// Update the battery indicator when something changes 
battery.onchange = (evt) => {
  updateCharge();
}

// Update the <text> element every tick with the current time
clock.ontick = (evt) => {
  let today = evt.date;
  let hours = today.getHours();
  let secondHours = today.getHours() - adjustBy;
  
  if (preferences.clockDisplay === "12h") {
    // 12h format
    hours = hours % 12 || 12;
  } else {
    // 24h format
    hours = util.zeroPad(hours);
  }
  
  let mins = util.zeroPad(today.getMinutes());
  let secs = util.zeroPad(today.getSeconds());
  
  timeLabel.text = `${hours}:${mins}`;
  secsLabel.text = `:${secs}`;
  secondTimeLabel.text = `${secondHours}:${mins}`;
}

function updateCharge() {
   let chargeLevel = Math.floor(battery.chargeLevel);
  
  chargePercentLabel.text = `${chargeLevel}%`;
}
