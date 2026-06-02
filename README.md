# TMK商店

個人開発のゲームと暮らしの道具を、RPGのお店風に紹介するサイト。
店主と会話しながら、作品を選んで遊べます。

## 概要
| 項目 | 内容 |
|------|------|
| サイト名 | TMK商店 |
| 目的 | 個人開発したゲーム・アプリの紹介 |
| コンセプト | RPGのお店で店主と会話しながら作品を選ぶ |
| 公開 | GitHub Pages（静的サイト） |

## 取り扱い作品（リンクは Google Play）
| 作品 | 種別 | Play ID |
|------|------|---------|
| 漢道「刻」 | ゲーム | com.otokodou.app3 |
| ぴよふぃっと | ゲーム | app.piyofit.tamagolife |
| トラフィックおじさん | ゲーム | app.traffic.ojisan |
| ツヅキン | アプリ | app.tuzukin.diet |
| おくすリマインダー | アプリ | com.tmk4men.okusureminder |
| ゆとり家計簿 | アプリ | com.tmk4men.yuruttokakeibo |

## 演出フロー
```
[シャッター + 看板「TMK商店」]
    ↓ クリック / スワイプ(スマホ)
[鐘の音 + シャッターが開く]
    ↓
[店内 + 店主登場] → 会話 → 選択肢から作品を選ぶ → 作品ページへ
```

選択肢：
- ゲームで遊びたい → 漢道「刻」 / ぴよふぃっと / トラフィックおじさん
- 暮らしを助ける道具がほしい → ツヅキン / おくすリマインダー / ゆとり家計簿

## おまけ要素
- 店主の瞬き / キセルアニメーション
- 店主を4回タップ・ドラッグでセリフ（イースターエッグ）
- バッグ：入店時やじゃんけん勝利でアイテム入手 → 店主に渡せる
- メニューの Game：店主とじゃんけん

## メニュー構成
| 項目 | 内容 |
|------|------|
| About | プロフィール、SNSリンク |
| Contact | お問い合わせフォーム（Formspree） |
| Game | じゃんけん |
| Credit | OtoLogic の素材を使用 |

## 技術構成
| 項目 | 選択 |
|------|------|
| フロントエンド | HTML / CSS / JavaScript（バニラ） |
| 画像 | webp（軽量化のため PNG から変換） |
| ホスティング | GitHub Pages |

## ファイル構成
```
TMKhomepage/
├── index.html
├── css/style.css
├── js/main.js
├── images/                  # 画像はすべて webp
│   ├── shopkeeper-*.webp     # 店主（idle/blink/pipe1/pipe2/smoke）
│   ├── background.webp        # 店内背景
│   ├── shutter.webp / entrance.webp
│   ├── bag.webp / グー.webp / チョキ.webp / パー.webp
│   └── app-*.webp             # 作品アイコン（kizami/piyo/traffic/tuzukin/okusuri/kakeibo）
├── sounds/                   # BGM・効果音
└── README.md
```

## 動作確認
1. TMKhomepage フォルダでターミナルを開く
2. `python -m http.server 8080`
3. ブラウザで `http://localhost:8080` を開く
