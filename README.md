# アプリ名：Moviesaga(ムビサガ)
新しい映画との出会いの手助けをするアプリです。

名前の由来は「movieを探す」を略してムビサガ  
movieとsagaを掛け合わせて直訳で「映画の長い物語」「映画の冒険」
という意味を込めました。

## ■サービス概要
映画選びに困ったときに映画選びを手助けしてくれるアプリ  
- 豊富な検索条件で映画のタイトルをランダムで提供してくれる。
- ユーザーが好きな映画で簡単に特集を作成・閲覧できる。

## ■ このサービスへの思い・作りたい理由
映画を観ることが大好きで何か観たい！と思うものの何を観るか悩んだ挙句、  
いつも観てるものに落ち着いてしまうことがよくありもっと映画に対して冒険心を持ちたいなと  
ずっと思っていたのでそれを解決できるようなアプリを作りました！  

映画をただ観るだけではなくて 面白くない映画を引いてしまった時のなんだこれ！？っていう何とも言えない感情や  
全然知らなかったけどこれは隠れた名作じゃないか！？という宝物見つけたような興奮も  
映画の大きな醍醐味だと思うので鑑賞に限らず映画そのものを体験してほしいという想いを込めました  


## ■ ユーザー層について
- 映画好きだけど観たいものが決まってない方  
- 違うジャンルの映画を試したい方
- 映画が好きな方
## ■サービスの利用イメージ  
### ログイン前
- 時間あるし映画でも観たいけど何観るか迷うなーという人がこのアプリを使えば  
気分に合わせてランダムで映画を選んでくれます。  

### ログイン後  
- マイページではお気に入り登録した映画のタイトルの画像が並ぶようになっているので  
自分の好きな映画のチラシを集めてるような自分の好きを集めた特別なページに  
仕上げることもできます。  
- ユーザーが好きな映画で簡単に特集を組めたり  
それを共有することもできます。  
- 映画を選ぶだけにとどまらず予告をひたすら流すページも用意して  
このアプリだけでも楽しめるような仕様にしてあります(実装予定)

## ■ ユーザーの獲得について･･･
- xで公表するのはもちろんのこと、  
役者の友達やその関係者の方々も映画をよく観る人が多いので  
その人たちにも触ってもらって改善を繰り返していいものが出来たら宣伝してもらう。

## ■ サービスの差別化ポイント・推しポイント
- 今回のアプリでの一番、他のアプリと異なるのはランダムで映画を選んでくれるという点です。

- 最近だと映画のタイトルに評価をつけてそれを元に  
AIが好きそうなものを提供してくれるアプリが開発されていますが  
自分の好きなものを新発見していくという作りにしてあるので  
好みに偏りすぎない映画体験ができる所が強みだと思います。  

- 映画のアプリというと映画のレビューだったり映画に評価をつけておすすめを  
わかりやすくしてあるものが多いですが積極的にアプリを楽しんでもらうためにも  
敷居の低さを大事にしたいのでレビューは使わずシンプルな設計にして  
めんどくさい操作もなく視覚情報も  少なくストレスのないものにしました。  
なので自分にとっての映画体験ができることが強みだと思います。  

- 実装するかはまだ未定ですが予告がランダムでひたすら流れるページも考えていて  
このアプリだけでも完結して楽しめる要素も考えています。  
映画の予告に重きを置いてるサイトは今のところ見たことはなく映画館の前のあの  
予告をみるわくわく感が感じられるページもあったら素敵だなと考えています。

## ■ 使用技術
| カテゴリー | 使用技術 |
|-----|----|
サーバーサイド| Ruby 3.2.2 <br> Ruby on Rails 7.1.3
フロントエンド| Nextjs 14.2.4 <br> TypeScript 5.0.0 <br> React 18.3.1 
cssフレームワーク| shadcn/ui Tailwind CSS
データベース| PostgreSQL 16.2
開発環境| Docker
API| TMDB API <br> Youtube Data API <br> Google Translate API

## ■ 使い方・機能
### ホーム画面
<table>
  <tr>
    <th>PC</th>
    <th>携帯</th>
  </tr>
  <tr>
    <td>
      <img src="https://i.gyazo.com/56cccca4d560f4859a3fdff8995a36d1.gif" width="600" alt="Image from Gyazo"><br>
      <br><br>
      <p align='center'>PCではダイナミックさを、携帯ではスタイリッシュさを引き立たせるように<br>レスポンシブに対応した設計にしてあります</p>
    </td>
    <td>
      <img src="https://i.gyazo.com/5adb76edb8f41775138d0bedd20e962e.gif" width="300" alt="Image from Gyazo">
    </td>
  </tr>
</table>
<br>
### ログイン・新規登録画面
<table>
  <tr>
    <td>ログイン画面</td>
    <td>新規登録画面</td>
  </tr>
</table>
- 検索条件に合わせてランダムで映画を提供してくれる機能
(MVPリリース時の検索条件の例：映画ジャンル・上映時間・上映中なのか)
- タイトルをお気に入り設定できる機能
- YouTube Data APIの上限コストを超えないために
予告を流したらDBに映画のタイトルや予告のデータを保存する機能
- TMDB APIの規約で6か月以上のキャッシュの保存を禁止しているので
保存したデータを6か月超えたら削除する機能
- ログイン機能
- ユーザー独自の特集を組める機能

### 本リリース：
- railsで作ったレイアウトをNextjsへ移行
- 映画の予告に特化したページ
- 映画詳細画面の充実
- プライバシーポリシーやお問い合わせフォームの内容
- レビューに合わせて必要そうなものも随時、導入したいと思います
### 以下、実装予定の機能
- 予告に特化したページの作成
- 検索をかけたときその作品のレコメンドを提供する機能
- solid Queueの実装


## ■ 機能の実装方針予定
### MVPリリース：
- 映画のデータベースが必要なのでTMDB API
- TMDB APIでも映画予告は提供しているが基本,海外向けの予告になっているので
日本版の映画予告を取得するためのYouTube Data API

### 本リリース：
- TMDB APIが映画のタイトルによっては
英文のあらすじしかない場合があるのでGoogle Translate APIを使って翻訳する

### 実装はしないが実装できる技術の習得はしておきたい機能
- 関連映画のレコメンドを取得する機能

### 画面遷移図
https://www.figma.com/design/hbWFX3mRKDMfnq9PeNncPE/%E5%8D%92%E6%A5%AD%E5%88%B6%E4%BD%9C?node-id=0-1&t=tCQQwauOn3ctIvJm-1

### ER図
[![Image from Gyazo](https://i.gyazo.com/0868f38bea4dd4453473db3388b403f3.png)](https://gyazo.com/0868f38bea4dd4453473db3388b403f3)

