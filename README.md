# YouTubeバズ検出ツール（試作版）

## 概要
YouTubeバズ検出ツールは、YouTubeの動画データを自動的に取得し、再生数・いいね数・コメント数の増加率を分析することで、バズりそうな動画を検出し、Discordに通知するアプリです。

このツールは現在 **試作段階** であり、機能の改善や新しい指標の追加を進めています。

## 機能
- **YouTube動画の自動取得**  
  - 投稿から10分経過した動画を対象に取得。
  - 日本のYouTuberによる動画を優先して解析。
- **増加率の計算**  
  - 投稿後1時間経過時点の再生数・いいね数・コメント数の増加率を算出。
- **24時間後の再生数予測**  
  - 現在の再生数から24時間後の再生数を予測する簡易モデルを実装。
- **コメントのネガポジ分析**  
  - 動画の説明やコメントから、感情分析を実行してバズりの兆候を判定。
- **Discord通知**  
  - バズりそうな動画を検出した場合、Discordに以下の内容を通知します。
    - 動画タイトル、チャンネル名
    - 再生数・いいね数・コメント数の増加率
    - 24時間後の再生数予測
    - ネガポジ分析の結果
    - 動画のURL

## 使用技術
- **Node.js**  
- **YouTube Data API v3**  
- **Discord Webhook API**  
- **dotenv**: 環境変数の管理
- **GitHub Actions**: 定期的なタスク実行

## インストールとセットアップ

1. リポジトリをクローンします。
    ```bash
    git clone https://github.com/your-username/youtube-buzz-detector.git
    cd youtube-buzz-detector
    ```

2. 必要な依存関係をインストールします。
    ```bash
    npm install
    ```

3. `.env` ファイルを作成し、必要なAPIキーとWebhook URLを設定します。
    ```
    YOUTUBE_API_KEY=your_youtube_api_key
    DISCORD_WEBHOOK_URL=your_discord_webhook_url
    ```

4. `data.json` ファイルを作成して、データ保存用に空のJSONオブジェクトを準備します。
    ```json
    {}
    ```

## 実行方法
### 手動実行
以下のコマンドでスクリプトを実行できます。

```bash
node scripts/fetch_and_notify.js