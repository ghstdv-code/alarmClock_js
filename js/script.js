const selectMenu = document.querySelectorAll("select"),
currentTime = document.querySelector("h1"),
setAlarmbtn = document.querySelector("button"),
content = document.querySelector(".content");

let alarmTime, isSet = false,
ringtone  = new Audio("./media/ringtone.mp3");


for (let i = 12; i > 0; i--){
    i = i < 10 ? ("0" + i) : i;
    let option = `<option value="${i}">${i}</option>`;
    selectMenu[0].firstElementChild.insertAdjacentHTML("afterend", option);
}

for (let i = 60; i > 0; i--){
    i = i < 10 ? ("0" + i) : i;
    let option = `<option value="${i}">${i}</option>`;
    selectMenu[1].firstElementChild.insertAdjacentHTML("afterend", option);
}

for (let i = 2; i > 0; i--){
    let option = i == 1 ? `<option value="AM">AM</option>` : `<option value="PM">PM</option>`;
    selectMenu[2].firstElementChild.insertAdjacentHTML("afterend", option);
}

setInterval(() => {
    let date = new Date(),
    h = date.getHours(),
    m = date.getMinutes(),
    s = date.getSeconds(),
    ampm = "AM";

    if(h >= 12){
        h -= 12;
        ampm = "PM";
    }

    h = h == 0 ? 12 : h;

    h = h < 10 ? ("0" + h) : h;
    m = m < 10 ? ("0" + m) : m;
    s = s < 10 ? ("0" + s) : s;
    currentTime.innerText = `${h}:${m}:${s} ${ampm}`;


    if(alarmTime == `${h}:${m} ${ampm}`){
        ringtone.play();
        ringtone.loop = true;
        /* console.log("Alarm Ringing...."); */
    }
}, 1000)


setAlarmbtn.addEventListener("click", () => {
    if(isSet){
        selectMenu[0].selectedIndex = 0;
        selectMenu[1].selectedIndex = 0;
        selectMenu[2].selectedIndex = 0;
        alarmTime = "";
        ringtone.pause();
        content.classList.remove("disable");
        setAlarmbtn.innerText = "Set Alarm";
        return isSet = false;
    }
    
    let time= `${selectMenu[0].value}:${selectMenu[1].value} ${selectMenu[2].value}`;

    if(time.includes('Hour') || time.includes('Minute') || time.includes('AM/PM')){
        return alert("Please, select a valid time to set Alarm!")
    }

    isSet = true;
    alarmTime = time;
    content.classList.add("disable");
    setAlarmbtn.innerText = 'Clear Alarm';
});
