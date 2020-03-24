---
title: Firebaseでgraphqlサーバーを構築する（NestJS）Typescript / ionicを使用したhybridなアプリを開発するチュートリアル01
date: '2020-03-19T22:12:03.284Z'
tags:
  [
    'web',
    'tutorial',
    'ionic',
    'angular',
    'typescript',
    'firebase',
    'graphql',
    'youtube',
  ]
cover: './thumnail.png'
---

これから何回に分けて ionic というアプリケーションフレームワークを使用して、Web/iOS/Android アプリ全てを同時に開発するチュートリアルを作成していきたいと思います。

チュートリアルと言っていますが備忘録的な側面もあるので、何かおかしい点などがありましたら是非ご指摘ください。

第 1 回目は、バックエンド側で Firebase Functions を使用して Graphql サーバーを構築していきたいと思います。

## 作業工程動画

<iframe width="560" height="315" src="https://www.youtube.com/embed/KFBrOxuBII8" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## 作業工程

1. [Firebase プロジェクトを作成・ローカルディレクトリと接続する](#anchor1)
1. [Nestjs で Graphql サーバーを構築する](#anchor2)
1. [Graphql サーバーと Firebase Functions を接続](#anchor3)
1. [Code](#anchor4)

### 1. [Firebase プロジェクトを作成・ローカルディレクトリと接続する]{#anchor1}

[Firebase コンソール](https://console.firebase.google.com/)から、任意のプロジェクトを作成します。
firebase のコマンドラインを global にインストールします。

```js
npm install -g firebase-tools
```

インストールが確認出来たら、ターミナルから firebase にログインします。

```js
firebase login
```

メールアドレスとパスワードを入力してログインします。

ログインが確認出来たら、ローカルのディレクトリを Firebase と接続します。

```js
firebase init
```

> ? Which Firebase CLI features do you want to set up for this folder? Press Space to select features, then Enter to confirm your choice
> s. (Press <space> to selec...

使用する Firebase のサービスをスペースキーで選択します。今回は `Firestore` `Functions` `Hosting` `Storage`を選択して Enter キーで進みます。

> ? Please select an option: (Use arrow keys)

`Use an existing project` を選択して最初に[Firebase コンソール](https://console.firebase.google.com/)で作成したプロジェクトを選択します。

この後の設定は全て yes または、Enter キーで進みます。(細かい設定は必要があれば後で設定します)<br />※今回のチュートリアルは Typescript を使うので同じように進めたければ、Typescript を選択してください。

### 2. [Nestjs で Graphql サーバーを構築する]{#anchor2}

Nestjs のコマンドラインを[ドキュメントサイト](https://docs.nestjs.com/)を参考にインストールします。

```js
npm i -g @nestjs/cli
```

一度、現状の `/functions` ディレクトリを削除して Nestjs のコマンドラインでプロジェクトを作成します。

```
rm -rf functions
nest new functions
```

Nestjs で Graphql 使用するために必要なパッケージをインストールします。

```
cd functions
npm i --save @nestjs/graphql graphql-tools graphql apollo-server-express type-graphql
```

Graphql を使用するためにメインモジュールを初期化します.

Module 作成します　[Code](https://github.com/chibataku0815/angular-typescript-nest-graphql/blob/backend-tutorial02/functions/src/users/users.module.ts)

```
nest generate module users
```

Model を作成します　[Code](https://github.com/chibataku0815/angular-typescript-nest-graphql/blob/backend-tutorial02/functions/src/users/user.ts)

```
nest generate class users/user
```

Service を作成します　[Code](https://github.com/chibataku0815/angular-typescript-nest-graphql/blob/backend-tutorial02/functions/src/users/users.service.ts)

```
nest generate service users
```

resolver を作成します　[Code](https://github.com/chibataku0815/angular-typescript-nest-graphql/blob/backend-tutorial02/functions/src/users/users.resolver.ts)

```
nest generate resolver users
```

### 3. [Graphql サーバーと Firebase Functions を接続]{#anchor3}

接続に必要なパッケージをインストールします。

```
npm i --save firebase-admin firebase-functions
```

エントリーポイントを変更する必要があるので、いくつかファイル作成・修正します。

[functions/src/server.ts](https://github.com/chibataku0815/angular-typescript-nest-graphql/blob/backend-tutorial02/functions/src/server.ts)

[functions/src/main.ts](https://github.com/chibataku0815/angular-typescript-nest-graphql/blob/backend-tutorial02/functions/src/main.ts)

[functions/src/index.ts](https://gist-it.appspot.com/https://github.com/chibataku0815/angular-typescript-nest-graphql/blob/backend-tutorial02/functions/src/index.ts)

Firebase のエントリーポイントを [Package.json](https://github.com/chibataku0815/angular-typescript-nest-graphql/blob/backend-tutorial02/functions/package.json#L75) に作成します。

コードをコンパイルして動作を確認します。

```javascript
npm run build
```

```javascript
firebase serve --only functions
```

localhost で Play graoud で表示・動作確認します。

あとは、デプロイするだけです。

```javascript
firebase deploy --only functions
```

#### 4. [Code]{#anchor4}

今回作成したコードはこちらにありますのでご参考ください
[Github リポジトリ](https://github.com/chibataku0815/angular-typescript-nest-graphql/tree/backend-tutorial02)
