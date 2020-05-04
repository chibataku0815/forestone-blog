---
title: Ionic-angularでGraphQLデータを取得する / ionicを使用したhybridなアプリを開発する忘備録02
date: '2020-03-25T22:12:03.284Z'
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

第 2 回目は、フロントエンド側で ionic v4(angular) を構築して Graphql で値を取得していきたいと思います。

## 作業工程動画

<iframe width="560" height="315" src="https://www.youtube.com/embed/6HByZjV5D-0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## 作業工程

1. [Ionic をローカルプロジェクトとして構築する](#anchor1)
1. [GraphQL 接続してみる](#anchor2)
1. [Code](#anchor3)

### 1. [Ionic をローカルプロジェクトとして構築する]{#anchor1}

Ionic のコマンドラインを global にインストールします。

```js
npm i -g ionic
```

次は Ionic のコマンドラインを使ってプロジェクトを作成します

```js
ionic start --type=angular
```

プロジェクト名など聞かれますので任意の名前入力したり、選択したりします。

今回は プロジェクト名を　`frontend` として template を `blank` として進めます。

プロジェクトに移動して動作を確認します。

```js
cd frontend
ionic serve
```

angular のコマンドラインも使用するので、global にインストールします。

```js
npm install -g @angular/cli
```

angular を最新のバージョンにアップデートします。

```js
ng update @angular/cli @angular/core
```

### 2. [GraphQL 接続してみる]{#anchor2}

angular-apollo コマンドで使用することで依存パッケージや GraphQL 接続用のファイルを作成します。
(Angular を最新版にしないとこのコマンドでエラーが出て進めなかったので注意)

```js
ng add apollo-angular
```

環境変数 gitignore に追加した上で、必要な情報を記載します。

[.gitignore](https://github.com/chibataku0815/angular-typescript-nest-graphql/blob/frontend-tutorial00/.gitignore)

```js
export const environment = {
  production: false,
  graphqlUri: 'GraphQLのエンドポイント',
}
```

取得する GraphQL エンドポイントを環境変数で追加します。

[frontend/src/app/graphql.module.ts](https://github.com/chibataku0815/angular-typescript-nest-graphql/tree/master/frontend/src/app/graphql.module.ts)

最後に GraphQL からの値を取得・表示できるかテストします。

[frontend/src/app/home/home.module.html](https://github.com/chibataku0815/angular-typescript-nest-graphql/tree/master/frontend/src/app/home/home.module.ts)

[frontend/src/app/home/home.page.ts](https://github.com/chibataku0815/angular-typescript-nest-graphql/tree/master/frontend/src/app/home/home.page.ts)

太郎・次郎・三郎などと name が表示出来ていれば、オッケーです。

#### 3. [Code]{#anchor3}

今回作成したコードはこちらにありますのでご参考ください
[Github リポジトリ](https://github.com/chibataku0815/angular-typescript-nest-graphql/tree/backend-tutorial02)
