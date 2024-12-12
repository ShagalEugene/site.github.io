var holding = false, isMoving = false;
var startX, startY, endX, endY, angle = -90;
var speedX = 0, speedY = 0;
var curSeconds = 5;
var curInterval;
var totalEatenAreas = 0;

const infoBlock = document.querySelector(".control_block");
const timerBlock = document.querySelector(".timer");
const scoreBlock = document.querySelector(".score");
const car = document.querySelector(".square");
const lvl = document.querySelector(".lvl");

const wdtCar = 70;

lvl.addEventListener('mousedown', function(e) {
    holding = true;
    startX = e.clientX;
    startY = e.clientY;

    if (!isMoving)
    {
        isMoving = true;
        setInterval(moveCar, 15);

        setTime(curSeconds);
        scoreBlock.innerHTML = '0';
        curInterval = setInterval(timer, 1000);
    }
});

document.addEventListener('mouseup', function() {
    holding = false;
    speedX = speedY = 0;
});

document.addEventListener('mousemove', function(e) {
  if (holding)
  {
    endX = e.clientX;
    endY = e.clientY;

    angle = Math.atan2(endY - startY, endX - startX) * 180 / Math.PI;
    speedY = (endY - startY)/30;
    speedX = (endX - startX)/30;
  }
});
 
const wdt = 20, pct = 0, clr = "rgb(255, 255, 255)";
const loadBlock = document.querySelector(".loading");
let curWidth = wdt, curPct = pct, isLoaded = false;

document.addEventListener("keydown", (e) => {
    if (e.key == "Enter" && !isLoaded)
    {
        if (curWidth > 200) 
        {
            document.querySelector(".lvl").classList.toggle("display");
            document.querySelector(".description_game").classList.toggle("display");

            car.style.top = `${parseInt(Math.random() * (window.innerHeight - 4 * wdtCar) + 2 * wdtCar)}px`;
            car.style.left = `${parseInt(Math.random() * (window.innerWidth - wdtCar))}px`;

            isLoaded = true;
            generateArea();
        }

        curWidth *= 1.1;
        curPct += 0.05;
        loadBlock.style.width = `${curWidth}%`;
        loadBlock.style.backgroundColor = `rgb(80, 226, 51, ${curPct})`;
    }
});

document.addEventListener("keyup", (e) => {
    if (e.key == "Enter")
    {
        curWidth = wdt;
        curPct = pct;
        loadBlock.style.backgroundColor = clr;
        loadBlock.style.width = `${curWidth}%`;
    }
});

function moveCar()
{
    car.style.transform = `rotate(${0}deg)`;

    let pos = car.getBoundingClientRect();
    let newPosX = pos.x + speedX;
    let newPosY = pos.y + speedY;
    if (newPosX > window.innerWidth) newPosX = -100;
    else if (newPosX < -100) newPosX = window.innerWidth;
    if (newPosY > window.innerHeight) newPosY = 0;
    else if (newPosY < 0) newPosY = window.innerHeight;

    car.style.transform = `rotate(${angle + 90}deg)`;

    car.style.top = `${newPosY}px`;
    car.style.left = `${newPosX}px`;

    infoBlockpos = infoBlock.getBoundingClientRect()
    let lenToInfoBlock = Math.sqrt(Math.pow(infoBlockpos.left + infoBlockpos.width / 2 - newPosX, 2) + Math.pow(infoBlockpos.top + infoBlockpos.height / 2 - newPosY, 2));

    if (lenToInfoBlock < 180)
        infoBlock.style.filter = `blur(1px)`;
    else infoBlock.style.filter = `blur(0px)`;

    const classUnder = document.elementFromPoint(newPosX + wdtCar/2, newPosY + wdtCar/2);

    if (classUnder.className == "area")
    {
        totalEatenAreas++;
        if (totalEatenAreas % 2 == 0) 
        {
            curSeconds += 1;
            setTime(curSeconds);
            clearInterval(curInterval);
            curInterval = setInterval(timer, 1000);
        }

        scoreBlock.innerHTML = parseInt(scoreBlock.innerHTML) + 10;
        classUnder.remove();
        generateArea();
    }
}

const levelBlock = document.querySelector(".lvl");
function generateArea() 
{
    let div = document.createElement("div");
    div.className = "area";
    levelBlock.append(div);
    
    let wdtDiv = div.getBoundingClientRect().width;

    let x = parseInt(Math.random() * (window.innerHeight - 2*wdtDiv) + 120);
    let y = parseInt(Math.random() * (window.innerWidth - wdtDiv));

    while (document.elementFromPoint(x, y) == infoBlock)
    {
        x = parseInt(Math.random() * (window.innerHeight - 2*wdtDiv) + 120);
    }
    
    div.style.top = `${parseInt(Math.random() * (window.innerHeight - 2*wdtDiv) + 120)}px`;
    div.style.left = `${parseInt(Math.random() * (window.innerWidth - wdtDiv))}px`;
}

function timer()
{
    curSeconds -= 1;
    if (curSeconds == -1) endGame();
    setTime(curSeconds);
}

function setTime(seconds)
{
    timerBlock.innerHTML = `0:${seconds > 9 ? seconds : '0' + seconds}`;
}

function endGame() 
{

}