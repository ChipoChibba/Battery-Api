const batteryLevel = document.querySelector(".batteryLevel");
const batteryCharging = document.querySelector(".batteryCharging");
const batteryChargingTime = document.querySelector(".batteryChargingTime");
const batteryDisChargingTime = document.querySelector(
  ".batteryDisChargingTime"
);

//Batttery API

const battery = () =>{
  //navigator is a global method
  if('getBattery' in navigator){
    navigator.getBattery().then((battery) =>{

      function updateAll(){
        updateChargingInfo();
        updateLevelChange();
        dischargingTimeInfo();
        changingTimeInfo();
      }
      
      updateAll();
      //battery charging change
      battery.addEventListener('chargingchange',()=>{
        updateChargingInfo();
      })

      function updateChargingInfo(){
        const isCharging = battery.charging ? 'Yes':'No';
        console.log(isCharging);
        batteryCharging.innerHTML = isCharging
      }
      //battery charging time
      battery.addEventListener('chargingtimechange',()=>{
        changingTimeInfo();
      })
      //battery discharging
      battery.addEventListener('dischargingchange',()=>{
        dischargingTimeInfo()
      })
      battery.addEventListener('levelchange',()=>{
        updateLevelChange();
      })

      //battery status
      function statusUpdate(){
        if(battery.level *100 == 100){
          batteryLevel.innerHTML = 'Fully charged';
        }
        else if(battery.level *100 == 50){
          batteryLevel.innerHTML = 'half-way charged';
        }
      }

      function updateLevelChange(){
        const level = battery.level *100 + "%";
        batteryLevel.innerHTML = level;
        console.log(level);
      }

      function dischargingTimeInfo(){
        const discharge = battery.dischargingTime;
        batteryDisChargingTime.innerHTML = discharge + " seconds";
      }

      function changingTimeInfo(){
        const changeTime = battery.chargingTime;
        console.log(battery.chargingTime)
        batteryChargingTime.innerHTML = changeTime + " seconds";
      }
    })
  }
}
battery();

