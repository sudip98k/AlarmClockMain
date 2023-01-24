

//variable for the content
let alarmListArr = [];
const selectMenu = document.querySelectorAll("select");
const setAlarmBtn = document.querySelector("#btn-setAlarm");
let alarmCount = 0;
let alarmTime;
let ring = new Audio("audio/Alarm-ringtone.mp3");



// Script for Time and Date


function updateClock(){
    //get this date month hour min sec using local time
    let now = new Date();
    let dname = now.getDay(),
        mo = now.getMonth(),
        dnum = now.getDate(),
        yr = now.getFullYear(),
        hou = now.getHours(),
        min = now.getMinutes(),
        sec = now.getSeconds(),
        pe = "AM";

        if(hou==0){
            hou = 12;
        }

        if(hou>12){
            hou -=12;
            pe = "PM";
        }
        //an object that represents number any kind
        Number.prototype.pad = function(digits){
            for(var n = this.toString(); n.length<digits; n=0+n);
            return n;
        }

        let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let week = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        let ids =["dayName", "month", "dayNum", "year", "hour", "minutes", "seconds", "period"];
        let values = [week[dname], months[mo], dnum.pad(2),yr,hou.pad(2),min.pad(2),sec.pad(2),pe];
        
        for(let i=0; i<ids.length;i++){
            document.getElementById(ids[i]).firstChild.nodeValue = values[i];
        }

        for(let i=0; i<alarmListArr.length;i++){
            // console.log('sudip');
            // console.log(alarmListArr[i]);
            // console.log(`${hou.pad(2)}:${min.pad(2)}:${sec.pad(2)}:${pe}`);
            if(alarmListArr[i]==`${hou.pad(2)}:${min.pad(2)}:${sec.pad(2)} ${pe}`){
                console.log('sudip');
                console.log("Alarm ringing...");
                ring.load();
                ring.play();
                document.querySelector("#stopAlarm").style.visibility= "visible";
            }
        }
}
//this function will be called when after 1000 ms 
function initClock() {
    updateClock();
    window.setInterval("updateClock()",1000);
}


//Set Alarm section


for(let i=12; i>0;i--){
    i=i<10 ? "0"+i :i;
    let option = `<option value="${i}">${i}</option>`;
    selectMenu[0].firstElementChild.insertAdjacentHTML("afterend", option);
}

for(let i=59; i>=0;i--){
    i=i<10 ? "0"+i :i;
    let option = `<option value="${i}">${i}</option>`;
    selectMenu[1].firstElementChild.insertAdjacentHTML("afterend", option);
}
for(let i=59; i>=0;i--){
    i = i<10 ? "0"+i:i;
    let option = `<option value="${i}">${i}</option>`;
    selectMenu[2].firstElementChild.insertAdjacentHTML("afterend", option);
}

for(let i=2; i>0;i--){
    let ampm = i== 1? "AM":"PM";
    let option = `<option value="${ampm}">${ampm}</option>`;
    selectMenu[3].firstElementChild.insertAdjacentHTML("afterend", option);
}



//add alarm 


function setAlarm(){
    document.querySelector("#alarm-h3").innerText = "Alarms";
    let time = `${selectMenu[0].value}:${selectMenu[1].value}:${selectMenu[2].value} ${selectMenu[3].value}`;
    //if not selected then it will show up error message
    if(time.includes("setHour") || time.includes("setMinute") ||time.includes("setSec") ||time.includes("AM/PM")){
        alert("Please, Select Valide Input");
    }else{
        alarmCount++;
        document.querySelector(".alarmList").innerHTML += `
        <div class="alarmLog" id="alarm${alarmCount}">
            <span id="span${alarmCount}">${time}</span>
            <button class="btn-delete" id="${alarmCount}" onClick="deleteAlarm(this.id)">Delete</button>
        </div>`;
        //get the hour min sec from the selecMenu and push it to the list
        alarmTime = `${selectMenu[0].value}:${selectMenu[1].value}:${selectMenu[2].value} ${selectMenu[3].value}`;
        alarmListArr.push(alarmTime);
        console.log(document.querySelector(".btn-delete").value);
    }

}
//set alarm button state the add an even which set the alarm as well as add this time to the array
setAlarmBtn.addEventListener("click",setAlarm);


//delete alarm is initialized the setalarm function ,when it will call it will delete the alarm from the array
function deleteAlarm(click_id){
    let element = document.getElementById("alarm"+click_id);
    let deleteIndex = alarmListArr.indexOf(document.querySelector("#span"+click_id).innerText);
    alarmListArr.splice(deleteIndex,1);
    element.remove();
}
//This will stop the alarm
function stopAlarm(){
    ring.pause();
    document.querySelector("#stopAlarm").style.visibility= "hidden";
}

