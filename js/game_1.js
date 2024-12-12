function createPathFollower(svg, path, el) {
    const tl = path.getTotalLength();
    
    return function(pct) {
      const rect = svg.getBoundingClientRect();
      const l = pct / 100 * tl;
   
      const p0 = path.getPointAtLength(l - 1 >= 1 ? l - 1 : 0);
      const p1 = path.getPointAtLength(l + 1);
      const angle = Math.atan2(p1.y - p0.y, p1.x - p0.x);
   
      let p = path.getPointAtLength(l);
      p = p.matrixTransform(svg.getScreenCTM());
      p.x = p.x - rect.left;
      p.y = p.y - rect.top;
  
      el.style.transform = `translate(${p.x}px, ${p.y}px) rotate(${radToDegree(angle) + 90}deg)`;
    }
}

function radToDegree(rad) {
  return rad * 180 / Math.PI;
}

const follower = createPathFollower(
  document.querySelector('svg'),
  document.querySelector('svg path'),
  document.querySelector('.square')
);

let begin = Math.random() * 100;
const totalAttempts = 3;
let curAttempt = 1;

var start, end;
// let a = JSON.parse(localStorage[localStorage[currentAccount]]);
document.querySelector(".start").addEventListener("click", () => {
  document.querySelector(".start").disabled = true;
  document.querySelector(".attempts").innerHTML = `${totalAttempts - curAttempt++} / ${totalAttempts}`;

  var i = begin, id = setInterval(frame, 1);
  var iteration = 0, end_it = Math.floor(Math.random() * 1250 + 250);
  start = performance.now();

  function frame() {
    i = (i + 0.05) % 100; 
    follower(i);   
    iteration++;  

    if (iteration == end_it) 
    {
      clearInterval(id);   
      end = performance.now();
      window.dialog.showModal();

      if (curAttempt <= totalAttempts)       
        document.querySelector(".start").disabled = false;
      else showResult();
      begin = i;
    }
  }
})

document.querySelector(".setAnswer").addEventListener("submit", (e) => {
  const answerPlace = document.querySelector(".setAnswer");
  answerPlace.classList.toggle("display");
  const inputTime = e.target.querySelector(".input_time");
  timeComparison(inputTime.value * 1000);
  inputTime.value = "";
})


function timeComparison(userTime) {
  const rightTime = end - start;

  console.log(`rightTime=${rightTime} userTime=${userTime}`);

  const score = document.querySelector(".score");
  let scoreValue = parseFloat(score.innerHTML);
  const curScore = Math.pow(Math.E, -Math.pow((userTime - rightTime)/1000, 2)) * 100;
  console.log(`curScore=${curScore}`);

  score.innerHTML = (scoreValue + curScore).toFixed(3);
} 

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
            follower(begin);
            isLoaded = true;
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

document.getElementById("exit").onclick = function() {
  window.location.replace("index.html");
}

function showResult()
{
  document.querySelector
}