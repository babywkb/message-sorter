import * as fs from 'fs';
import * as path from 'path';

// メッセージファイルのパス
const messagesPath = path.join(__dirname, 'messages.ts');

export function sortMessages() {
  // ファイルを読み込む
  const content = fs.readFileSync(messagesPath, 'utf-8');

  // オブジェクトを抽出
  const match = content.match(/export default ({[\s\S]*?});/);
  if (!match) {
    console.error('Invalid messages file format');
    process.exit(1);
  }

  // オブジェクトをパース
  const messages = eval(`(${match[1]})`);

  // キーをソート（アルファベット順→50音順）
  const sortedKeys = Object.keys(messages).sort((a, b) => {
    // アルファベットと日本語を分離
    const isAAlphabet = /^[a-zA-Z]/.test(a);
    const isBAlphabet = /^[a-zA-Z]/.test(b);

    if (isAAlphabet && !isBAlphabet) return -1;
    if (!isAAlphabet && isBAlphabet) return 1;
    if (isAAlphabet && isBAlphabet) return a.localeCompare(b);
    
    // 日本語の場合は50音順
    return a.localeCompare(b, 'ja');
  });

  // ソートされたオブジェクトを作成
  const sortedMessages = sortedKeys.reduce((acc, key) => {
    acc[key] = messages[key];
    return acc;
  }, {} as Record<string, string>);

  // 新しいファイル内容を生成
  const newContent = `export default ${JSON.stringify(sortedMessages, null, 2)};`;

  // ファイルを書き込み
  fs.writeFileSync(messagesPath, newContent, 'utf-8');

  console.log('Messages have been sorted successfully!');
}

// コマンドラインから実行された場合のみ実行
if (require.main === module) {
  sortMessages();
} 