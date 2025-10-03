// CVC 單字題庫 100 個（不重複）
const words = [
"cat","dog","rat","bat","hat","sun","pig","map","cup","fox",
"hen","jam","kid","log","man","net","pan","pen","pot","red",
"run","sip","sit","tap","top","tan","web","wax","win","wig",
"yak","yes","zip","zoo","cab","dad","bed","jet","mob","nod",
"pad","tip","van","wet","fat","fun","bag","cap","dig","mat",
"dot","nap","lip","pin","bin","tin","fin","hop","pop","cop",
"mop","lot","hot","cot","pit","kit","bit","fit","hit","lid",
"mid","hid","bid","fib","rib","jab","lab","tab","nag","wag",
"cub","bud","gap","lap","mad","sad","pug","lug","mug","hug",
"fig","big","dig","rip","hip","dip","nip","pip","mit","lit",
"pod","bob","job","lob","cob","tap","rap","cap","nap","bag",
"tag","rag","fan","van","can","ran","let","get","pet","ten"
];

let score = 0;
let correctWord = null;

function shuffle(array) { return array.sort(() => Math.random() - 0.5); }

// 播放單字
function speak(word) {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "en-US";
  speechSynthesis.speak(utterance);
}

// 生成題目
function playSound() {
  const shuffled = shuffle(words);
  correctWord = shuffled[0];

  // 自動播放
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

// 再次聽
document.getElementById("replay").addEventListener("click", () => {
  if (correctWord) speak(correctWord);
});

// 檢查答案
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

// 重新開始
document.getElementById("restart").addEventListener("click", () => {
  score = 0;
  document.getElementById("score").innerText = "分數：0";
  document.getElementById("feedback").innerText = "";
  playSound();
});

// 初始出題
playSound();
