---
title: After Effectsで作成したシェイプ アニメーションをweb実装出来るLottie-webを試してみる備忘録
date: '2020-03-09T22:12:03.284Z'
tags: ['aftereffects', 'tutorial', 'lottie', 'アニメーション']
cover: './thumnail.png'
---

## 作業工程動画

<iframe width="560" height="315" src="https://www.youtube.com/embed/b8Uwb0fRyG0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## 作業工程テキスト

1. [Affter Effects に bodyMovin をインストール](#anchor1)
1. [Pacel を使ってブラウザ表示用のファイル作成](#anchor2)
1. [つまづきポイント](#anchor3)
1. [Code](#anchor4)

#### 1. [Affter Effects に bodyMovin をインストール]{#anchor1}

[lottie-web](https://github.com/airbnb/lottie-web)のリポジトリの README にいくつかのインストール方法の記載があるのでどれかの方法で AfterEffects に bodyMovin というエクステンションをインストールします。

オプション 1 がお勧めの方法になっていたのですが、Adobe creative cloud との同期に不具合があるとうまくインストールされませんでした、改善の方法が不明…（多分一回初期化した方が早そうなので後日やってみます）

なので、今回はオプション 3、当該リポジトリの [lottie-web/build/extension/](https://github.com/airbnb/lottie-web/tree/master/build/extension) 配下にある zxp ファイルをダウンロードして、ZXP installer からインストールしました。

インストールが完了したら、AffterEffects の環境設定で「スクリプトとエクスプレッション」内の「スクリプトによるファイルへの書き込みとネットワークへのアクセスを許可」にチェックを入れてください！チェックを忘れると JSON ファイルが空ファイルとして Export されるので注意してください。

#### 2. [Pacel を使ってブラウザ表示用のファイル作成]{#anchor2}

[Parcel](https://parceljs.org/)という設定不要な Web アプリケーションバンドラーを使用します。

npm でも yarn でもどちらも同じなので好みでグルーバルインストールします。

```js
yarn global add parcel-bundler
```

あとは Package.json を作成すればいいので楽ちんです。

```js
yarn init -y
```

index.html というファイルをビルドしたければ以下のようにコマンド叩けばローカルサーバーが立ち上がります。

```js
parcel index.html
```

あとは、必要なファイルを適切に作成してしていけばオッケーなので動画と[サンプルの Github リポジトリ](https://github.com/chibataku0815/simple-lottie-web-example)を参考ください。

#### 3. [つまづきポイント]{#anchor3}

今回一番のつまづきポイントは、[lottie-web](https://github.com/airbnb/lottie-web)のリポジトリの README に記載のあるサンプルコードが動かなかったところです。

##### 該当箇所は

```js
lottie.loadAnimation({
  container: element, // the dom element that will contain the animation
  renderer: 'svg',
  loop: true,
  autoplay: true,
  path: 'data.json', // the path to the animation json
})
```

`path:` というプロパティで、こちらを `animationData`　に変更することでアニメーションが表示されました。

#### 4. [Code]{#anchor4}

今回作成したコードはこちらにありますのでご参考ください
[Github リポジトリ](https://github.com/chibataku0815/simple-lottie-web-example)
