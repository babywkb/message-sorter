# Message Sorter

多言語対応等で作成されがちなメッセージファイル内のJSONオブジェクトのキーをアルファベット順→50音順で並び替えるpackage scriptです。

## 機能

- TypeScriptファイル内のJSONオブジェクトのキーを自動的にソート
- アルファベットのキーを先頭に配置
- 日本語のキーを50音順でソート
- 元の値は保持したままキーの順序のみを変更

## 必要条件

- Node.js (v14以上)
- npm

## インストール

```bash
# リポジトリをクローン
git clone [repository-url]
cd message-sorter

# 依存関係をインストール
npm install
```

## 使用方法

1. `src/messages.ts`ファイルにソートしたいJSONオブジェクトを配置します。
2. 以下のコマンドを実行してソートを実行します：

```bash
npm run sort
```

## ファイル形式

入力ファイル（`src/messages.ts`）は以下の形式である必要があります：

```typescript
export default {
  "キー1": "値1",
  "キー2": "値2",
  // ...
};
```

## ソート結果

ソート後は以下の順序でキーが並びます：

1. アルファベットのキー（アルファベット順）
2. 日本語のキー（50音順）

例：
```typescript
export default {
  "apple": "りんご",
  "banana": "バナナ",
  "cat": "猫",
  "あいう": "こんにちは",
  "いえ": "家",
  "うた": "歌",
  // ...
};
```

## ライセンス

MIT 