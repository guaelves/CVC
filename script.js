// 題庫 50 個以上 CVC 單字
const words = [
   "cat","dog","rat","bat","hat","sun","pig","map","cup","fox",
  "hen","jam","kid","log","man","net","pan","pen","pot","red",
  "run","sip","sit","tap","top","tan","web","wax","win","wig",
  "yak","yes","yap","zip","zoo","cab","dad","bed","jet","mob",
  "nod","pad","tip","van","wet","fat","fun","bag","cap","dig",
  "mat","dot","bat","bat","nap","lip","pin","bin","tin","fin",
  "hop","pop","cop","mop","lot","hot","pot","cot","sit","pit",
  "kit","bit","fit","hit","lit","rid","kid","lid","mid","did",
  "hug","bug","jug","mug","rug","tug","log","fog","bog","dog",
  "men","pen","ten","hen","den","net","bet","get","pet","jet",
  "cap","tap","nap","map","lap","sap","rap","zap","bat","cat",
  "rat","mat","pat","sat","fat","tan","pan","man","can","ran",
  "fan","van","bag","tag","rag","nag","wag","big","dig","fig",
  "pig","wig","rig","zig","win","tin","pin","bin","fin","kin",
  "top","cop","hop","pop","mop","lot","hot","pot","cot","not",
  "bat","cat","rat","hat","mat","sat","pat","fat","nap","map",
  "tap","cap","lap","sap","zap","hug","bug","jug","mug","rug",
  "tug","dot","pot","cot","lot","not","hop","pop","cop","mop",
  "kid","lid","mid","did","rid","hid","bid","fib","rib","jab",
  "lab","cab","tab","nab","dab","fab","gab","bag","tag","rag",
  "nag","wag","yak"
];

let score = 0;
let correctWord = null;

function shuffle(array) { return array.sort(() => Math.random() - 0.5); }

// 使用瀏覽器 TTS 播放單字
function speak(word) {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "en-US";
  speechSynthesis.speak(utterance);
}

// 題目生成
function playSound() {
  const shuffled = shuffle(words);
  correctWord = shuffled[0];

  // 自動播放單字
  speak(correctWord);

  const optionsDiv = document.getElementById("options");
  optionsDiv.innerHTML = "";

  // 隨機選三個選項
  let choices = shuffle(words.slice(0, 3));
  if (!choices.includes(correctWord)) choices[0] = correctWord;
  choices = shuffle(choices);

  choices.forEach(item => {
    const btn = document.createElement("button");
    btn.className = "option";
    btn.innerText = item;
    btn.onclick = () => checkAnswer(btn, item);
    optionsDiv.appendChild(btn);
  });

  document.getElementById("feedback").innerText = "";
}

// 再次聽按鈕
document.getElementById("replay").addEventListener("click", () => {
  if (correctWord) speak(correctWord);
});

function checkAnswer(btn, item) {
  document.querySelectorAll("button.option").forEach(b => b.classList.remove("selected"));
  btn.classList.add("selected");

  const feedback = document.getElementById("feedback");
  if (item === correctWord) {
    score++;
    feedback.innerText = "✅ 答對了！";
  } else {
    feedback.innerText = `❌ 答錯了！正確答案是 "${correctWord}"`;
  }
  document.getElementById("score").innerText = "分數：" + score;

  // 1 秒後自動出下一題
  setTimeout(playSound, 1000);
}

// 重新開始遊戲
document.getElementById("restart").addEventListener("click", () => {
  score = 0;
  document.getElementById("score").innerText = "分數：0";
  document.getElementById("feedback").innerText = "";
  playSound();
});

// 初始自動出題
playSound();
