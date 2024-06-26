# 16type Favorite Database  
## サービス概要  
MBTIタイプ診断をしたことのあるユーザーが、メディア(音楽・アニメetc.)ごとに、好きな作品を投稿することにより、MBTIタイプごとの好みをデータベース化するWedアプリケーションです。  
また、ユーザーが複数の好きな作品のイメージを組み合わせた画像をXに共有することにより、簡易的な自己紹介による交流のきっかけを提供します。

[MBTIとは？](https://ja.wikipedia.org/wiki/MBTI)  

## このサービスへの思い・作りたい理由  
### なぜMBTIタイプごとの好みをデータベース化するのか？
インターネット上ではMBTIタイプごとの具体的な好みについて語る人が多く見られたのですが、あくまでその人たちの直観や肌感覚に依存するため、説得力が発信者の信用に基づいてしまうことに課題を感じました。
そこで、実際にデータを取って確かめたいという思いから、このサービスを作成しました。

### なぜ作品なのか？
MBTIは個人の指向によってタイプを分類する類型論です。そのため、何かをデータベースに投稿・SNSに共有するとしたら、多種多様な表現方法を持つ作品が個人の指向を最も反映でき、作品を通してタイプごとの好みの傾向が表れるのではないかと思ったからです。

## ユーザー層について   
- MBTI診断サイトでタイプ診断をしたことがあり、アニメ・音楽などの作品が好きなユーザー
- Wedサイトや書籍でMBTIに関する情報を集めたり、Xや掲示板でMBTIを通して交流したりし、MBTIが好きなユーザー
    
## サービスの利用イメージ  
- ユーザーはコンテンツ投稿画面から、アニメ・音楽などのメディアから自分が好きなアーティストや作品を1〜4つ選び、その作品のイメージを組み合わせ生成された画像コンテンツをアプリ内に投稿・Xに共有できる。  
    - ex. メディアでアニメを選択し、作品で呪術廻戦,葬送のフリーレン,進撃の巨人を選択すれば、上記３つの作品のイメージを組み合わせ生成された画像コンテンツをアプリ内に投稿・Xに共有できる。
- データベース詳細画面ではユーザーがメディアごとに選んだ作品をもとに作られたデータベースを閲覧できる。  
- データベース詳細画面はMBTI16タイプを知覚機能（Ni/Ne/Si/Se）ごとにグルーピングし、その4つのグループごとのデータベースを閲覧でき、コメントを投稿・いいねすることができる。  
    - 知覚機能でグループを分ける理由  
        - 少ないユーザー数でもデータベースの傾向を見て取れるようにするための工夫の1つとして、MBTI16タイプをグルーピングしようと思ったから。  
        - MBTIに触れていく中で知覚機能の違いがタイプ間で最も価値観の違いを生む要因だと感じ、逆に言えば知覚機能が共通していれば、価値観の近いタイプとしてグルーピングできると思ったから。 

            - 知覚機能（Ni/Ne/Si/Se）で分けられた4つのグループ  
                - Se（ESFP/ESTP/ISFP/ISTP）  
                - Si（ESFJ/ESTJ/ISFJ/ISTJ）  
                - Ne（ENFP/ENTP/INFP/INTP）  
                - Ni（ENFJ/ENTJ/INFJ/INTJ）  
- 投稿一覧では他のユーザーの投稿した画像コンテンツをいいねできる。 
またユーザーのアイコンをクリックすると、そのユーザーのプロフィールに飛び、投稿・コメント・いいね一覧を閲覧できる。

## ユーザーの獲得について  
- Xでの宣伝  
- Qiita記事の作成  

## サービスの差別化ポイント・推しポイント  
### 差別化ポイント  
[Personality Database](https://www.personality-database.com)というMBTIに関するデータベースアプリがあるのですが、そのアプリで扱っているデータベースは有名人や架空のキャラクターのMBTIタイプをユーザーが投票し、多数決で決めたその人物やキャラクターのMBTIタイプなので、私の考えているMBTIタイプごとの個人の好みを収集するデータベースとは差別化できていると考えています。

### 推しポイント   
MBTIは最終的には自分でタイプを決める必要がある主観的な心理検査なので、ユーザーの誤診によりデータベースや統計が意味をなさないことが問題視されていますが、ユーザーの診断方法をデータベースに登録し、その診断方法をもとにデータベースの母集団をフィルタリングする機能を実装することで、少しでも誤診を考慮した上でデータベースを見やすくできるようにしました。 
- ユーザーの診断方法  
そのユーザーのタイプ診断が  
    - 診断サイトでの診断を参考にしたり、書籍やWedサイトなどでMBTIに関する情報を集めて、自らの判断で決定したものなのか？（非公式）  
    - 公式のセッションを通じて決定したものなのか？（公式）  

- ex.
フィルタリング機能で  
    - 公式タイプに絞り、公式を通して診断されたものだからこのデータは信用できる  
    - 非公式タイプ・公式タイプの全てを選択し、このデータは誤診を考慮して見なければいけないなど。

## 機能候補  
### MVPリリース  
- ソーシャルログイン
- プロフィール  
    - プロフィール編集
- 画像コンテンツ投稿  
    - 検索機能と画像加工・合成  
        Spotify Wed APIを使い1〜4つの音楽アーティストを取得して、Cloudinaryで加工し、そのイメージを組み合わせた画像を生成  
- 画像コンテンツ
    - 投稿一覧 
    - X共有機能
    - 詳細
    - 削除
    - いいね・いいね解除
- データベース詳細  
    - データベース（横棒グラフ）   
        - 少ないユーザー数でもデータベースの傾向を見て取れるようにするための工夫として、ユーザーをグルーピングする
            - 知覚機能でグルーピングされたグループの中でタイプを複数選択できるようにし、初めは全てのタイプにチェックを入れておく 
                - ex.
                Seグループの場合  
                初めはESFP/ESTP/ISFP/ISTPの全てのタイプが選択されている  
                →ISFPのみのデータベースを表示したければ、ISFPのみを選択  

        - 診断方法は非公式タイプ・公式タイプから複数選択できるようにし、初めは全ての選択肢にチェックを入れておく 

### 本リリース  
- レスポンシブデザイン 
- プロフィール  
    - 他のユーザーのプロフィール閲覧
- 画像コンテンツ
    - いいね・いいね解除
    - 画像コンテンツ投稿(Annict API)
    - 検索機能と画像加工・合成 
        - Annict APIを使い1〜4つのアニメ作品を取得して、Cloudinaryで加工し、そのイメージを組み合わせた画像を生成  
- データベース詳細  
    - コメント欄  
        - コメント・コメント削除
        - いいね・いいね解除
- 通知  
    - 自分の画像コンテンツ投稿にいいねがついたとき  
    - 自分のコメントにいいね・返信がついたとき  
- キューとバックグラウンド処理

## 機能の実装方針予定  
- フロントエンド
    - React 18.2.0
    - Tailwind CSS 3.3.6
    - daisyUI 3.8.3
    - MUI 5.15.5
- バックエンド  
    -  Ruby 3.2.2
	-  Rails(APIモード) 7.0.8
- API 
    - Annict API
    - Spotify Wed API
- Gemなど
	- 認証サービス
		- Clerk
    - 画像加工
        - Cloudinary
	- 通知
		- 未定
    - グラフ
		- react-chartjs-2
    - キューとバックグラウンド処理
		- Redis
- インフラ  
    - Heroku
- データベース
    - PostgreSQL

## 画面遷移図
https://www.figma.com/file/6RqB077Xm2APXdPgxQQGdM/16type-Favorite-Database?type=design&node-id=0%3A1&mode=design&t=Cljbhco66lUwXcXq-1

## ER図
[![Image from Gyazo](https://i.gyazo.com/8b8e6472991a7989eae625ab2d07d911.png)](https://gyazo.com/8b8e6472991a7989eae625ab2d07d911)