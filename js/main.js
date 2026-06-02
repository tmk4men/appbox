/* ========================================
   ともき商店 - メインスクリプト
======================================== */

// ========================================
// 要素の取得
// ========================================
const shutterScreen = document.getElementById('shutterScreen');
const shopScreen = document.getElementById('shopScreen');
const shutter = document.getElementById('shutter');
const shopkeeper = document.getElementById('shopkeeper');
const textWindow = document.getElementById('textWindow');
const dialogue = document.getElementById('dialogue');
const choices = document.getElementById('choices');
const bellSound = document.getElementById('bellSound');
const purchaseSound = document.getElementById('purchaseSound');
const touchSound = document.getElementById('touchSound');
const bgm = document.getElementById('bgm');
const muteButton = document.getElementById('muteButton');
let isMuted = false;

const menuButton = document.getElementById('menuButton');
const menu = document.getElementById('menu');
const aboutLink = document.getElementById('aboutLink');
const creditLink = document.getElementById('creditLink');
const aboutModal = document.getElementById('aboutModal');
const creditModal = document.getElementById('creditModal');
const closeAbout = document.getElementById('closeAbout');
const closeCredit = document.getElementById('closeCredit');
const contactLink = document.getElementById('contactLink');
const contactModal = document.getElementById('contactModal');
const closeContact = document.getElementById('closeContact');
const contactForm = document.getElementById('contactForm');
const gameLink = document.getElementById('gameLink');
const gameModal = document.getElementById('gameModal');
const closeGame = document.getElementById('closeGame');

// ========================================
// セリフのバリエーション（配列で1行ずつ）
// ========================================
const dialogues = {
  greeting: [
    [
      'いらっしゃい。',
      'ここはともき商店。',
      '手づくりのゲームと道具を並べてるんだ。',
      '何かお探しかい？'
    ],
    [
      'おや、お客さんだ。',
      'ここはともき商店。',
      'ゆっくり見ていきな。',
      '何か探してるのかい？'
    ],
    [
      'よく来たね。',
      'ここはともき商店。',
      '個人開発のゲームと道具を扱っている。',
      '何が欲しい？'
    ]
  ],
  selected: [
    ['これかい？', 'ほら、持っていきな。'],
    ['いい選択だ。', 'きっと役に立つよ。'],
    ['それが気になるのか。', '読んでみな。']
  ],
  exit: [
    ['またのお越しを待ってるよ。'],
    ['気をつけてな。'],
    ['またいつでもおいで。']
  ]
};

// ========================================
// 選択肢とリンク
// ========================================
const articleChoices = [
  {
    text: 'あんたは誰だ？',
    type: 'dialogue',
    dialogueLines: [
      'わしはともき。個人でゲームや日々の道具を作っておるのじゃ。',
      'ここに並ぶのは、すべてわしの手づくり。気軽に遊んでいきな。',
      'Google Playにもアプリを出しておる。Aboutから覗いてくれ。'
    ]
  },
  {
    text: 'ゲームで遊びたい',
    items: [
      {
        url: 'https://play.google.com/store/apps/details?id=com.otokodou.app3',
        image: 'images/app-kizami.webp',
        title: '漢道「刻」',
        desc: 'カメラ越しに筋トレ体感ゲーム'
      },
      {
        url: 'https://play.google.com/store/apps/details?id=app.piyofit.tamagolife',
        image: 'images/app-piyo.webp',
        title: 'ぴよふぃっと',
        desc: '小さな命を育てる育成ゲーム'
      },
      {
        url: 'https://play.google.com/store/apps/details?id=app.traffic.ojisan',
        image: 'images/app-traffic.webp',
        title: 'トラフィックおじさん',
        desc: '流れてくる車を色で仕分けろ！'
      }
    ]
  },
  {
    text: '暮らしを助ける道具がほしい',
    items: [
      {
        url: 'https://play.google.com/store/apps/details?id=app.tuzukin.diet',
        image: 'images/app-tuzukin.webp',
        title: 'ツヅキン',
        desc: '続けられるダイエット・筋トレ管理'
      },
      {
        url: 'https://play.google.com/store/apps/details?id=com.tmk4men.okusureminder',
        image: 'images/app-okusuri.webp',
        title: 'おくすリマインダー',
        desc: 'お薬の飲み忘れをのんちゃんと防ぐ'
      },
      {
        url: 'https://play.google.com/store/apps/details?id=com.tmk4men.yuruttokakeibo',
        image: 'images/app-kakeibo.webp',
        title: 'ゆとり家計簿',
        desc: '3つに分けるだけのゆる家計簿'
      }
    ]
  }
];

// 商品選択用セリフ
const itemDialogues = {
  single: [
    ['これでいいかい？'],
    ['これだね。'],
    ['お目が高い。']
  ],
  multiple: [
    ['どれにする？'],
    ['いくつかあるよ。', 'どれがいい？'],
    ['選んでごらん。']
  ]
};

// ========================================
// ゲーム状態
// ========================================
let isShopOpen = false;
let currentAnimation = null;
let currentDialogueLines = [];
let currentLineIndex = 0;
let isTyping = false;
let onDialogueComplete = null;
let autoCompleteDialogue = false;
let isSmoking = false;
let shopkeeperTapCount = 0;
let shopkeeperTapTimer = null;
let isDraggingShopkeeper = false;
let didMoveShopkeeper = false;
let dragStartX = 0;
let dragStartY = 0;
let shopkeeperOriginalPos = null;
let stayTimer = null;
let hasShownStayMessage = false;

// バッグ関連
const bagButton = document.getElementById('bagButton');
const bagPanel = document.getElementById('bagPanel');
const bagItems = document.getElementById('bagItems');
const bagCount = document.getElementById('bagCount');

const possibleItems = [
  { emoji: '🍵', name: 'お茶' },
  { emoji: '🍡', name: '団子' },
  { emoji: '🍶', name: 'お酒' },
  { emoji: '📜', name: '巻物' },
  { emoji: '🪙', name: '古銭' },
  { emoji: '🌸', name: '桜の花' },
  { emoji: '🍃', name: '薬草' },
  { emoji: '🕯️', name: 'ろうそく' }
];

const giftResponses = [
  ['おお、これは...！', 'ありがたい。'],
  ['気が利くじゃないか。', '大事にするよ。'],
  ['ほう、いいものを持っているな。', 'もらっておこう。'],
  ['これをくれるのか？', 'すまないね。']
];

let playerBag = [];

// ========================================
// ユーティリティ関数
// ========================================
function getRandomItem(array) {
  return array[Math.floor(Math.random() * array.length)];
}

let currentTypingTimer = null;

function typeText(element, text, speed = 50) {
  return new Promise((resolve) => {
    // 前のタイピングをキャンセル
    if (currentTypingTimer) {
      clearInterval(currentTypingTimer);
      currentTypingTimer = null;
    }

    isTyping = true;
    element.textContent = '';
    let index = 0;
    currentTypingTimer = setInterval(() => {
      if (index < text.length) {
        element.textContent += text[index];
        index++;
      } else {
        clearInterval(currentTypingTimer);
        currentTypingTimer = null;
        isTyping = false;
        resolve();
      }
    }, speed);
  });
}

// 会話を1行ずつ進める
async function showDialogueLine() {
  if (currentLineIndex < currentDialogueLines.length) {
    const line = currentDialogueLines[currentLineIndex];
    await typeText(dialogue, line);
    currentLineIndex++;

    // まだ続きがある場合は▼を表示
    if (currentLineIndex < currentDialogueLines.length) {
      dialogue.innerHTML += '<span class="continue-mark">▼</span>';
    } else if (autoCompleteDialogue && onDialogueComplete) {
      // 自動完了モードの場合、少し待ってからコールバック
      setTimeout(() => {
        if (onDialogueComplete) {
          onDialogueComplete();
          onDialogueComplete = null;
        }
      }, 500);
    }
  } else {
    // 会話終了
    if (onDialogueComplete) {
      onDialogueComplete();
      onDialogueComplete = null;
    }
  }
}

// 会話開始
function startDialogue(lines, callback, autoComplete = false) {
  // 前のタイピングをキャンセル
  if (currentTypingTimer) {
    clearInterval(currentTypingTimer);
    currentTypingTimer = null;
    isTyping = false;
  }

  currentDialogueLines = lines;
  currentLineIndex = 0;
  onDialogueComplete = callback;
  autoCompleteDialogue = autoComplete;
  textWindow.classList.add('active');
  showDialogueLine();
}

// テキストウィンドウクリックで次へ
textWindow.addEventListener('click', advanceDialogue);

// 背景クリックでも次へ
shopScreen.addEventListener('click', (e) => {
  // 他の要素（選択肢、商品、ボタン等）をクリックした場合は無視
  if (e.target.closest('.choices, .items-display, .back-button, .menu-button, .menu, .mute-button, .bag-wrapper, .bag-button, .bag-panel')) {
    return;
  }
  advanceDialogue();
});

function advanceDialogue() {
  if (isTyping) return;
  if (!textWindow.classList.contains('active')) return;
  if (currentLineIndex < currentDialogueLines.length) {
    showDialogueLine();
  } else if (onDialogueComplete) {
    onDialogueComplete();
    onDialogueComplete = null;
  }
}

// ========================================
// シャッター開閉
// ========================================
function openShutter() {
  if (isShopOpen) return;
  isShopOpen = true;

  // 鐘の音を鳴らす
  bellSound.currentTime = 0;
  bellSound.volume = 0.2;
  bellSound.play().catch(() => {});

  // シャッターを開ける
  shutter.classList.add('open');

  // 1秒後に店内画面へ
  setTimeout(() => {
    shutterScreen.classList.remove('active');
    shopScreen.classList.add('active');

    // BGMを再生（0.9秒遅延）
    setTimeout(() => {
      bgm.volume = 0.1;
      bgm.playbackRate = 0.85;
      bgm.currentTime = 0;
      bgm.play().catch(() => {});
    }, 900);

    // 3分滞在タイマー開始
    if (!hasShownStayMessage) {
      stayTimer = setTimeout(() => {
        showStayMessage();
      }, 120000); // 2分
    }

    // 入店時にアイテム付与
    giveEntryItems();

    startConversation();
  }, 1000);
}

// 長時間滞在メッセージ
function showStayMessage() {
  if (!isShopOpen || hasShownStayMessage) return;
  hasShownStayMessage = true;

  // 現在の画面を一時的に隠す
  choices.classList.remove('active');
  const itemsDisplay = document.getElementById('itemsDisplay');
  const backButton = document.getElementById('backButton');
  const wasItemsActive = itemsDisplay.classList.contains('active');
  itemsDisplay.classList.remove('active');
  backButton.classList.remove('active');

  startDialogue(['ゆっくりしていけ。'], () => {
    if (wasItemsActive) {
      itemsDisplay.classList.add('active');
      backButton.classList.add('active');
    } else {
      showChoices();
    }
  });
}

function closeShutter() {
  // 滞在タイマーをクリア
  clearTimeout(stayTimer);

  // BGMを停止
  bgm.pause();
  bgm.currentTime = 0;

  // 鐘の音を鳴らす
  bellSound.currentTime = 0;
  bellSound.volume = 0.2;
  bellSound.play().catch(() => {});

  // 店内画面を非表示
  shopScreen.classList.remove('active');
  shutterScreen.classList.add('active');

  // シャッターを閉める
  setTimeout(() => {
    shutter.classList.remove('open');
    isShopOpen = false;

    // テキストと選択肢をリセット
    textWindow.classList.remove('active');
    choices.classList.remove('active');
    choices.innerHTML = '';
  }, 100);
}

// ========================================
// 会話システム
// ========================================
function startConversation() {
  const greetingLines = getRandomItem(dialogues.greeting);
  startDialogue(greetingLines, () => {
    showChoices();
  });
}

function showChoices() {
  textWindow.classList.remove('active');
  choices.innerHTML = '';
  choices.classList.add('active');

  articleChoices.forEach((choice, index) => {
    const item = document.createElement('div');
    item.className = 'choice-item';
    item.textContent = choice.text;
    item.addEventListener('click', () => selectChoice(index));
    choices.appendChild(item);
  });

  // 店を出るボタンを追加
  const exitButton = document.createElement('button');
  exitButton.className = 'choice-exit-button';
  exitButton.textContent = '店を出る';
  exitButton.addEventListener('click', handleExit);
  choices.appendChild(exitButton);
}

// 退店処理
function handleExit() {
  if (!isShopOpen) return;

  // 商品表示や戻るボタンを非表示
  const itemsDisplay = document.getElementById('itemsDisplay');
  const backButton = document.getElementById('backButton');
  itemsDisplay.classList.remove('active');
  backButton.classList.remove('active');

  const exitLines = getRandomItem(dialogues.exit);
  choices.classList.remove('active');
  startDialogue(exitLines, () => {
    setTimeout(() => {
      closeShutter();
    }, 500);
  });
}

function selectChoice(index) {
  // タッチ音を再生
  touchSound.currentTime = 0;
  touchSound.volume = 0.1;
  touchSound.play().catch(() => {});

  const choice = articleChoices[index];
  choices.classList.remove('active');

  // セリフのみの選択肢（商品なし）
  if (choice.type === 'dialogue') {
    startDialogue(choice.dialogueLines, () => {
      showChoices();
    });
    return;
  }

  // 商品が1つか複数かでセリフを変える
  const isSingle = choice.items.length === 1;
  const lines = isSingle
    ? getRandomItem(itemDialogues.single)
    : getRandomItem(itemDialogues.multiple);

  startDialogue(lines, () => {
    showItems(choice.items);
  }, true);  // 自動で商品表示
}

// 商品を表示
function showItems(items) {
  const itemsDisplay = document.getElementById('itemsDisplay');
  const itemsContainer = document.getElementById('itemsContainer');
  const backButton = document.getElementById('backButton');

  itemsContainer.innerHTML = '';

  items.forEach((item) => {
    const box = document.createElement('div');
    box.className = 'item-box';

    const img = document.createElement('img');
    img.src = item.image;
    img.alt = item.title;

    const info = document.createElement('div');
    info.className = 'item-info';

    const title = document.createElement('div');
    title.className = 'item-title';
    title.textContent = item.title;

    const desc = document.createElement('div');
    desc.className = 'item-desc';
    desc.textContent = item.desc;

    info.appendChild(title);
    info.appendChild(desc);
    box.appendChild(img);
    box.appendChild(info);
    box.addEventListener('click', (e) => selectItem(item.url, e));
    itemsContainer.appendChild(box);
  });

  itemsDisplay.classList.add('active');
  textWindow.classList.add('active');
  backButton.classList.add('active');
}

// 商品を選んだとき
function selectItem(url, event) {
  // 購入音を再生
  purchaseSound.currentTime = 0;
  purchaseSound.volume = 0.18;
  purchaseSound.play().catch(() => {});

  // キラキラエフェクト
  if (event) {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    createSparkles(x, y);
  }

  const itemsDisplay = document.getElementById('itemsDisplay');
  const backButton = document.getElementById('backButton');
  itemsDisplay.classList.remove('active');
  backButton.classList.remove('active');

  // セリフを表示
  const responseLines = getRandomItem(dialogues.selected);
  startDialogue(responseLines, () => {
    setTimeout(() => {
      window.open(url, '_blank');
      // 選択肢を再表示
      setTimeout(() => {
        showChoices();
      }, 1000);
    }, 500);
  });
}

// 戻るボタン
document.getElementById('backButton').addEventListener('click', (e) => {
  e.stopPropagation();
  const itemsDisplay = document.getElementById('itemsDisplay');
  const backButton = document.getElementById('backButton');

  itemsDisplay.classList.remove('active');
  backButton.classList.remove('active');
  textWindow.classList.remove('active');

  showChoices();
});

// ========================================
// 店主アニメーション
// ========================================
const shopkeeperFrames = {
  idle: 'images/shopkeeper-idle.webp',
  blink: 'images/shopkeeper-blink.webp',
  pipe1: 'images/shopkeeper-pipe1.webp',
  pipe2: 'images/shopkeeper-pipe2.webp',
  smoke: 'images/shopkeeper-smoke.webp'
};

// 画像をプリロードして点滅を防ぐ
const preloadedImages = {};
Object.entries(shopkeeperFrames).forEach(([key, src]) => {
  const img = new Image();
  img.src = src;
  preloadedImages[key] = img;
});

function setShopkeeperFrame(frame) {
  shopkeeper.style.backgroundImage = `url('${shopkeeperFrames[frame]}')`;
}

// 瞬きアニメーション
function blinkAnimation() {
  if (isSmoking) return;  // キセル中は瞬きしない
  setShopkeeperFrame('blink');
  setTimeout(() => {
    if (!isSmoking) {  // キセル中でなければidleに戻す
      setShopkeeperFrame('idle');
    }
  }, 150);
}

// キセルアニメーション
async function smokeAnimation() {
  if (isSmoking) return;
  isSmoking = true;
  setShopkeeperFrame('pipe1');
  await sleep(500);
  setShopkeeperFrame('pipe2');
  await sleep(800);
  setShopkeeperFrame('pipe1');
  await sleep(500);
  setShopkeeperFrame('smoke');
  await sleep(1000);
  setShopkeeperFrame('idle');
  isSmoking = false;
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// キラキラエフェクト
function createSparkles(x, y) {
  const container = document.createElement('div');
  container.className = 'sparkle-container';
  container.style.left = x + 'px';
  container.style.top = y + 'px';
  document.body.appendChild(container);

  const colors = ['gold', 'white', 'blue', 'gold', 'white'];
  const count = 12;

  for (let i = 0; i < count; i++) {
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle ' + colors[i % colors.length];

    const angle = (i / count) * Math.PI * 2;
    const distance = 30 + Math.random() * 40;
    const offsetX = Math.cos(angle) * distance;
    const offsetY = Math.sin(angle) * distance;

    sparkle.style.left = offsetX + 'px';
    sparkle.style.top = offsetY + 'px';
    sparkle.style.animationDelay = (Math.random() * 0.2) + 's';

    container.appendChild(sparkle);
  }

  // エフェクト終了後に削除
  setTimeout(() => {
    container.remove();
  }, 1000);
}

// ランダムアニメーション開始
function startRandomAnimations() {
  // 瞬き（3〜6秒ごと）
  function scheduleBlink() {
    const delay = 3000 + Math.random() * 3000;
    setTimeout(() => {
      if (isShopOpen) {
        blinkAnimation();
      }
      scheduleBlink();
    }, delay);
  }

  // キセル（8〜15秒ごと）
  function scheduleSmoke() {
    const delay = 8000 + Math.random() * 7000;
    setTimeout(() => {
      if (isShopOpen) {
        smokeAnimation();
      }
      scheduleSmoke();
    }, delay);
  }

  scheduleBlink();
  scheduleSmoke();
}

// ========================================
// メニュー
// ========================================
menuButton.addEventListener('click', () => {
  menuButton.classList.toggle('active');
  menu.classList.toggle('active');
});

// メニューを閉じる
function closeMenu() {
  menuButton.classList.remove('active');
  menu.classList.remove('active');
}

// About
aboutLink.addEventListener('click', (e) => {
  e.preventDefault();
  closeMenu();
  aboutModal.classList.add('active');
});

closeAbout.addEventListener('click', () => {
  aboutModal.classList.remove('active');
});

// Credit
creditLink.addEventListener('click', (e) => {
  e.preventDefault();
  closeMenu();
  creditModal.classList.add('active');
});

closeCredit.addEventListener('click', () => {
  creditModal.classList.remove('active');
});

// Contact
contactLink.addEventListener('click', (e) => {
  e.preventDefault();
  closeMenu();
  contactModal.classList.add('active');
});

closeContact.addEventListener('click', () => {
  contactModal.classList.remove('active');
});

// フォーム送信
contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData(contactForm);

  try {
    const response = await fetch(contactForm.action, {
      method: 'POST',
      body: formData,
      headers: { 'Accept': 'application/json' }
    });

    if (response.ok) {
      alert('メッセージを送信しました。ありがとうございます！');
      contactForm.reset();
      contactModal.classList.remove('active');
    } else {
      alert('送信に失敗しました。もう一度お試しください。');
    }
  } catch (error) {
    alert('送信に失敗しました。もう一度お試しください。');
  }
});


// モーダル外クリックで閉じる
aboutModal.addEventListener('click', (e) => {
  if (e.target === aboutModal) {
    aboutModal.classList.remove('active');
  }
});

creditModal.addEventListener('click', (e) => {
  if (e.target === creditModal) {
    creditModal.classList.remove('active');
  }
});

contactModal.addEventListener('click', (e) => {
  if (e.target === contactModal) {
    contactModal.classList.remove('active');
  }
});

// Game
gameLink.addEventListener('click', (e) => {
  e.preventDefault();
  closeMenu();
  gameModal.classList.add('active');
});

closeGame.addEventListener('click', () => {
  gameModal.classList.remove('active');
});

gameModal.addEventListener('click', (e) => {
  if (e.target === gameModal) {
    gameModal.classList.remove('active');
  }
});

// ========================================
// じゃんけんゲーム
// ========================================
const jankenHands = {
  rock: '<img src="images/グー.webp" alt="グー">',
  scissors: '<img src="images/チョキ.webp" alt="チョキ">',
  paper: '<img src="images/パー.webp" alt="パー">'
};
const jankenNames = { rock: 'グー', scissors: 'チョキ', paper: 'パー' };
let jankenScore = { win: 0, lose: 0, draw: 0 };
let isJankenPlaying = false;

// じゃんけん勝敗判定
function judgeJanken(player, shopkeeper) {
  if (player === shopkeeper) return 'draw';
  if (
    (player === 'rock' && shopkeeper === 'scissors') ||
    (player === 'scissors' && shopkeeper === 'paper') ||
    (player === 'paper' && shopkeeper === 'rock')
  ) {
    return 'win';
  }
  return 'lose';
}

// じゃんけんボタン処理
document.querySelectorAll('.janken-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    if (isJankenPlaying) return;
    isJankenPlaying = true;

    const playerHand = btn.dataset.hand;
    const playerHandEl = document.getElementById('playerHand');
    const shopkeeperHandEl = document.getElementById('shopkeeperHand');
    const resultText = document.querySelector('.result-text');

    // ボタン無効化
    document.querySelectorAll('.janken-btn').forEach(b => b.disabled = true);

    // プレイヤーの手を表示
    playerHandEl.innerHTML = jankenHands[playerHand];

    // 店主の手をシャッフルアニメーション
    shopkeeperHandEl.classList.add('shake');
    resultText.textContent = 'じゃんけん...';
    resultText.className = 'result-text';

    let shuffleCount = 0;
    const hands = ['rock', 'scissors', 'paper'];
    const shuffleInterval = setInterval(() => {
      shopkeeperHandEl.innerHTML = jankenHands[hands[shuffleCount % 3]];
      shuffleCount++;
    }, 100);

    // 1秒後に結果
    setTimeout(() => {
      clearInterval(shuffleInterval);
      shopkeeperHandEl.classList.remove('shake');

      // 店主の手をランダム決定
      const shopkeeperHand = hands[Math.floor(Math.random() * 3)];
      shopkeeperHandEl.innerHTML = jankenHands[shopkeeperHand];

      // 判定
      const result = judgeJanken(playerHand, shopkeeperHand);
      jankenScore[result]++;

      // 結果表示
      if (result === 'win') {
        resultText.textContent = '勝ち！';
        resultText.className = 'result-text win';
        // 勝ったらアイテム獲得
        if (playerBag.length < 6) {
          const item = giveRandomItem(true); // じゃんけんで獲得
          // アイテムゲット表示
          setTimeout(() => {
            resultText.innerHTML = 'アイテムゲット！<span class="got-item">' + item.emoji + '</span>';
          }, 400);
        }
      } else if (result === 'lose') {
        resultText.textContent = '負け...';
        resultText.className = 'result-text lose';
      } else {
        resultText.textContent = 'あいこ';
        resultText.className = 'result-text draw';
      }

      // スコア更新
      document.getElementById('winCount').textContent = jankenScore.win;
      document.getElementById('loseCount').textContent = jankenScore.lose;
      document.getElementById('drawCount').textContent = jankenScore.draw;

      // ボタン有効化
      setTimeout(() => {
        document.querySelectorAll('.janken-btn').forEach(b => b.disabled = false);
        isJankenPlaying = false;
      }, 500);
    }, 1000);
  });
});

// ========================================
// イベントリスナー
// ========================================

// シャッター画面クリック/タップで入店
shutterScreen.addEventListener('click', openShutter);

// スワイプで入店（スマホ）
let touchStartY = 0;
shutterScreen.addEventListener('touchstart', (e) => {
  touchStartY = e.touches[0].clientY;
});

shutterScreen.addEventListener('touchend', (e) => {
  const touchEndY = e.changedTouches[0].clientY;
  const diff = touchStartY - touchEndY;

  // 上方向に50px以上スワイプしたら入店
  if (diff > 50) {
    openShutter();
  }
});


// ========================================
// イースターエッグ（店主タップ）
// ========================================
shopkeeper.addEventListener('click', (e) => {
  if (!isShopOpen) return;

  // ドラッグ中は無視（移動距離が小さい場合のみタップとみなす）
  const moveThreshold = 10;
  if (Math.abs(e.clientX - dragStartX) > moveThreshold ||
      Math.abs(e.clientY - dragStartY) > moveThreshold) {
    return;
  }

  shopkeeperTapCount++;

  // タイマーリセット（2秒以内に連続タップ）
  clearTimeout(shopkeeperTapTimer);
  shopkeeperTapTimer = setTimeout(() => {
    shopkeeperTapCount = 0;
  }, 2000);

  // 4回タップでイースターエッグ
  if (shopkeeperTapCount >= 4) {
    shopkeeperTapCount = 0;
    clearTimeout(shopkeeperTapTimer);

    // 現在の画面を一時的に隠す
    choices.classList.remove('active');
    const itemsDisplay = document.getElementById('itemsDisplay');
    const backButton = document.getElementById('backButton');
    const wasItemsActive = itemsDisplay.classList.contains('active');
    itemsDisplay.classList.remove('active');
    backButton.classList.remove('active');

    // くすぐったいぞセリフ
    startDialogue(['くすぐったいぞ。'], () => {
      // 元の状態に戻す
      if (wasItemsActive) {
        itemsDisplay.classList.add('active');
        backButton.classList.add('active');
      } else {
        showChoices();
      }
    });
  }
});

// ========================================
// ミュートボタン
// ========================================
muteButton.addEventListener('click', () => {
  isMuted = !isMuted;
  bgm.muted = isMuted;
  bellSound.muted = isMuted;
  purchaseSound.muted = isMuted;
  muteButton.classList.toggle('muted', isMuted);
});

// ========================================
// BGMのタブ切り替え対応
// ========================================
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    bgm.pause();
  } else if (isShopOpen && !isMuted) {
    bgm.play().catch(() => {});
  }
});

// ========================================
// 店主ドラッグ機能
// ========================================
shopkeeper.addEventListener('mousedown', (e) => {
  if (!isShopOpen) return;
  isDraggingShopkeeper = true;
  dragStartX = e.clientX;
  dragStartY = e.clientY;
  shopkeeperOriginalPos = {
    left: shopkeeper.offsetLeft,
    top: shopkeeper.offsetTop
  };
  shopkeeper.style.transition = 'none';
});

document.addEventListener('mousemove', (e) => {
  if (!isDraggingShopkeeper) return;

  const maxMove = 0; // 動かない
  let deltaX = e.clientX - dragStartX;

  // 移動したかどうか判定（5px以上で移動とみなす）
  if (Math.abs(deltaX) > 5) {
    didMoveShopkeeper = true;
  }

  // 左右の移動量を制限
  deltaX = Math.max(-maxMove, Math.min(maxMove, deltaX));

  shopkeeper.style.left = (shopkeeperOriginalPos.left + deltaX) + 'px';
  shopkeeper.style.transform = 'none';
});

document.addEventListener('mouseup', () => {
  if (!isDraggingShopkeeper) return;
  isDraggingShopkeeper = false;

  // 元の位置に戻す
  shopkeeper.style.transition = 'all 0.5s ease';
  shopkeeper.style.left = '';
  shopkeeper.style.top = '';
  shopkeeper.style.transform = 'translateX(-50%)';

  // 実際に移動した場合のみセリフ
  if (didMoveShopkeeper) {
    didMoveShopkeeper = false;
    choices.classList.remove('active');
    const itemsDisplay = document.getElementById('itemsDisplay');
    const backButton = document.getElementById('backButton');
    const wasItemsActive = itemsDisplay.classList.contains('active');
    itemsDisplay.classList.remove('active');
    backButton.classList.remove('active');

    startDialogue(['おいおい。'], () => {
      if (wasItemsActive) {
        itemsDisplay.classList.add('active');
        backButton.classList.add('active');
      } else {
        showChoices();
      }
    });
  }
});

// タッチ対応
shopkeeper.addEventListener('touchstart', (e) => {
  if (!isShopOpen) return;
  isDraggingShopkeeper = true;
  dragStartX = e.touches[0].clientX;
  dragStartY = e.touches[0].clientY;
  shopkeeperOriginalPos = {
    left: shopkeeper.offsetLeft,
    top: shopkeeper.offsetTop
  };
  shopkeeper.style.transition = 'none';
});

document.addEventListener('touchmove', (e) => {
  if (!isDraggingShopkeeper) return;

  const maxMove = 0; // 動かない
  let deltaX = e.touches[0].clientX - dragStartX;

  // 移動したかどうか判定（5px以上で移動とみなす）
  if (Math.abs(deltaX) > 5) {
    didMoveShopkeeper = true;
  }

  // 左右の移動量を制限
  deltaX = Math.max(-maxMove, Math.min(maxMove, deltaX));

  shopkeeper.style.left = (shopkeeperOriginalPos.left + deltaX) + 'px';
  shopkeeper.style.transform = 'none';
});

document.addEventListener('touchend', () => {
  if (!isDraggingShopkeeper) return;
  isDraggingShopkeeper = false;

  // 元の位置に戻す
  shopkeeper.style.transition = 'all 0.5s ease';
  shopkeeper.style.left = '';
  shopkeeper.style.top = '';
  shopkeeper.style.transform = 'translateX(-50%)';

  // 実際に移動した場合のみセリフ
  if (didMoveShopkeeper) {
    didMoveShopkeeper = false;
    choices.classList.remove('active');
    const itemsDisplay = document.getElementById('itemsDisplay');
    const backButton = document.getElementById('backButton');
    const wasItemsActive = itemsDisplay.classList.contains('active');
    itemsDisplay.classList.remove('active');
    backButton.classList.remove('active');

    startDialogue(['おいおい。'], () => {
      if (wasItemsActive) {
        itemsDisplay.classList.add('active');
        backButton.classList.add('active');
      } else {
        showChoices();
      }
    });
  }
});

// ========================================
// バッグ機能
// ========================================
bagButton.addEventListener('click', (e) => {
  e.stopPropagation();
  bagPanel.classList.toggle('active');
});

// バッグ外クリックで閉じる
document.addEventListener('click', (e) => {
  if (!e.target.closest('.bag-panel, .bag-button')) {
    bagPanel.classList.remove('active');
  }
});

// ランダムでアイテムを獲得
function giveRandomItem(fromJanken = false) {
  if (playerBag.length >= 6) return null; // 最大6個
  const baseItem = possibleItems[Math.floor(Math.random() * possibleItems.length)];
  const item = { ...baseItem, fromJanken: fromJanken };
  playerBag.push(item);
  updateBagDisplay();
  return item;
}

// バッグ表示更新
function updateBagDisplay() {
  bagCount.textContent = playerBag.length;
  bagItems.innerHTML = '';

  if (playerBag.length === 0) {
    bagItems.innerHTML = '<div class="bag-empty">空っぽ</div>';
    return;
  }

  playerBag.forEach((item, index) => {
    const itemEl = document.createElement('div');
    itemEl.className = 'bag-item';
    itemEl.textContent = item.emoji;
    itemEl.title = item.name;
    itemEl.addEventListener('click', () => giveItemToShopkeeper(index));
    bagItems.appendChild(itemEl);
  });
}

// 店主にアイテムを渡す
function giveItemToShopkeeper(index) {
  const item = playerBag[index];
  const wasFromJanken = item.fromJanken;
  playerBag.splice(index, 1);
  updateBagDisplay();
  bagPanel.classList.remove('active');

  // キラキラエフェクト
  const rect = shopkeeper.getBoundingClientRect();
  createSparkles(rect.left + rect.width / 2, rect.top + rect.height / 3);

  // 喜ぶセリフ
  choices.classList.remove('active');
  const itemsDisplay = document.getElementById('itemsDisplay');
  const backButton = document.getElementById('backButton');
  const wasItemsActive = itemsDisplay.classList.contains('active');
  itemsDisplay.classList.remove('active');
  backButton.classList.remove('active');

  let response = giftResponses[Math.floor(Math.random() * giftResponses.length)].slice();
  // じゃんけんで獲得したアイテムなら最後に一言追加
  if (wasFromJanken) {
    response.push('...もとはワシのじゃが。');
  }
  startDialogue(response, () => {
    if (wasItemsActive) {
      itemsDisplay.classList.add('active');
      backButton.classList.add('active');
    } else {
      showChoices();
    }
  });
}

// 入店時にアイテムを付与
function giveEntryItems() {
  giveRandomItem(); // 1個だけ
}

// ========================================
// ほこりエフェクト
// ========================================
function getShopImageBounds() {
  // 背景画像のアスペクト比（実際の画像サイズに合わせて調整）
  const imgAspect = 16 / 9; // 仮のアスペクト比
  const container = document.getElementById('gameContainer');
  const containerWidth = container.offsetWidth;
  const containerHeight = container.offsetHeight;
  const containerAspect = containerWidth / containerHeight;

  let imgWidth, imgHeight, imgLeft, imgTop;

  if (containerAspect > imgAspect) {
    // 縦に合わせる
    imgHeight = containerHeight;
    imgWidth = imgHeight * imgAspect;
    imgLeft = (containerWidth - imgWidth) / 2;
    imgTop = 0;
  } else {
    // 横に合わせる
    imgWidth = containerWidth;
    imgHeight = imgWidth / imgAspect;
    imgLeft = 0;
    imgTop = (containerHeight - imgHeight) / 2;
  }

  return { left: imgLeft, top: imgTop, width: imgWidth, height: imgHeight };
}

function createDust() {
  const container = document.getElementById('dustContainer');
  const bounds = getShopImageBounds();
  const dust = document.createElement('div');
  dust.className = 'dust';

  // 画像エリア内のランダムな位置（上部から開始）
  const xPos = bounds.left + Math.random() * bounds.width;
  dust.style.left = xPos + 'px';
  dust.style.top = (bounds.top - 10) + 'px';
  dust.style.width = (2 + Math.random() * 2) + 'px';
  dust.style.height = dust.style.width;

  // ランダムな速度（15〜25秒）
  const duration = 15 + Math.random() * 10;
  dust.style.animationDuration = duration + 's';

  // 横移動のばらつき
  const sway = -30 + Math.random() * 60;
  dust.style.setProperty('--sway', sway + 'px');

  container.appendChild(dust);

  // アニメーション終了後に削除
  setTimeout(() => {
    dust.remove();
  }, duration * 1000);
}

function startDustEffect() {
  // 初期ほこり
  for (let i = 0; i < 10; i++) {
    setTimeout(() => createDust(), Math.random() * 3000);
  }

  // 定期的に追加
  setInterval(() => {
    if (isShopOpen) {
      createDust();
    }
  }, 1200);
}

// ========================================
// 初期化
// ========================================
startRandomAnimations();
updateBagDisplay();
startDustEffect();
