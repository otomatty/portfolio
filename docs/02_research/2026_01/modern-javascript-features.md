# モダンJavaScript（ES6+）機能まとめ

## 概要

ES6（ES2015）以降に導入されたモダンなJavaScriptの機能をまとめます。
実務で活用できる主要な機能を中心に解説します。

---

## 1. 変数宣言

### let / const（ES6）

```javascript
// ❌ 古い書き方
var name = 'John';

// ✅ モダンな書き方
const name = 'John';      // 再代入不可（推奨）
let count = 0;            // 再代入可能
```

**ベストプラクティス**: 基本は `const` を使い、再代入が必要な場合のみ `let` を使用。

---

## 2. アロー関数（ES6）

```javascript
// ❌ 古い書き方
function add(a, b) {
  return a + b;
}
const double = function(x) {
  return x * 2;
};

// ✅ モダンな書き方
const add = (a, b) => a + b;
const double = x => x * 2;

// 複数行の場合
const calculate = (a, b) => {
  const sum = a + b;
  return sum * 2;
};
```

**注意**: アロー関数は `this` をバインドしないため、メソッド定義には不向き。

---

## 3. 分割代入（Destructuring）（ES6）

### オブジェクトの分割代入

```javascript
const user = { name: 'John', age: 30, city: 'Tokyo' };

// ❌ 古い書き方
const name = user.name;
const age = user.age;

// ✅ モダンな書き方
const { name, age } = user;

// デフォルト値
const { name, country = 'Japan' } = user;

// リネーム
const { name: userName } = user;

// ネスト
const { address: { city } } = { address: { city: 'Tokyo' } };
```

### 配列の分割代入

```javascript
const colors = ['red', 'green', 'blue'];

// ❌ 古い書き方
const first = colors[0];
const second = colors[1];

// ✅ モダンな書き方
const [first, second] = colors;

// スキップ
const [, , third] = colors; // 'blue'

// 残り
const [head, ...tail] = colors; // head: 'red', tail: ['green', 'blue']
```

### 関数パラメータでの分割代入

```javascript
// ✅ 関数の引数で直接分割
const greet = ({ name, age }) => `Hello, ${name}! You are ${age}.`;

// デフォルト値付き
const createUser = ({ name = 'Anonymous', role = 'user' } = {}) => ({
  name,
  role,
});
```

---

## 4. スプレッド構文（Spread）（ES6）

### 配列

```javascript
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];

// 配列の結合
const combined = [...arr1, ...arr2]; // [1, 2, 3, 4, 5, 6]

// 配列のコピー（シャローコピー）
const copy = [...arr1];

// 要素の追加
const withNew = [...arr1, 4]; // [1, 2, 3, 4]
```

### オブジェクト（ES2018）

```javascript
const base = { a: 1, b: 2 };

// オブジェクトのマージ
const extended = { ...base, c: 3 }; // { a: 1, b: 2, c: 3 }

// 上書き
const updated = { ...base, b: 10 }; // { a: 1, b: 10 }

// イミュータブルな更新（React でよく使う）
const state = { user: { name: 'John' }, count: 0 };
const newState = { ...state, count: state.count + 1 };
```

---

## 5. テンプレートリテラル（ES6）

```javascript
const name = 'John';
const age = 30;

// ❌ 古い書き方
const message = 'Hello, ' + name + '! You are ' + age + ' years old.';

// ✅ モダンな書き方
const message = `Hello, ${name}! You are ${age} years old.`;

// 複数行
const html = `
  <div>
    <h1>${name}</h1>
    <p>Age: ${age}</p>
  </div>
`;

// 式の埋め込み
const result = `Total: ${price * quantity}`;
```

### タグ付きテンプレートリテラル

```javascript
// styled-components などで使用
const styled = (strings, ...values) => {
  // カスタム処理
};

const Button = styled`
  color: ${props => props.primary ? 'blue' : 'gray'};
`;
```

---

## 6. 省略記法（Shorthand）（ES6）

### プロパティの省略

```javascript
const name = 'John';
const age = 30;

// ❌ 古い書き方
const user = { name: name, age: age };

// ✅ モダンな書き方
const user = { name, age };
```

### メソッドの省略

```javascript
// ❌ 古い書き方
const obj = {
  greet: function() {
    return 'Hello';
  }
};

// ✅ モダンな書き方
const obj = {
  greet() {
    return 'Hello';
  }
};
```

### 計算プロパティ名

```javascript
const key = 'dynamicKey';

const obj = {
  [key]: 'value',
  [`prefix_${key}`]: 'another value',
};
// { dynamicKey: 'value', prefix_dynamicKey: 'another value' }
```

---

## 7. 非同期処理

### Promise（ES6）

```javascript
// Promise の作成
const fetchData = () => new Promise((resolve, reject) => {
  setTimeout(() => resolve('data'), 1000);
});

// Promise チェーン
fetchData()
  .then(data => process(data))
  .then(result => console.log(result))
  .catch(error => console.error(error))
  .finally(() => console.log('Done'));
```

### async/await（ES2017）

```javascript
// ✅ モダンな書き方（推奨）
const fetchUser = async (id) => {
  try {
    const response = await fetch(`/api/users/${id}`);
    const user = await response.json();
    return user;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw error;
  }
};

// 並列実行
const fetchAll = async () => {
  const [users, posts] = await Promise.all([
    fetch('/api/users').then(r => r.json()),
    fetch('/api/posts').then(r => r.json()),
  ]);
  return { users, posts };
};
```

### Promise.allSettled（ES2020）

```javascript
// すべての Promise の結果を取得（失敗しても続行）
const results = await Promise.allSettled([
  fetch('/api/a'),
  fetch('/api/b'),
  fetch('/api/c'),
]);

results.forEach(result => {
  if (result.status === 'fulfilled') {
    console.log('Success:', result.value);
  } else {
    console.log('Failed:', result.reason);
  }
});
```

---

## 8. オプショナルチェーン（ES2020）

```javascript
const user = { profile: { address: { city: 'Tokyo' } } };

// ❌ 古い書き方
const city = user && user.profile && user.profile.address && user.profile.address.city;

// ✅ モダンな書き方
const city = user?.profile?.address?.city;

// 関数呼び出し
const result = obj.method?.();

// 配列アクセス
const first = arr?.[0];
```

---

## 9. Null合体演算子（ES2020）

```javascript
const value = null;

// ❌ 古い書き方（0 や '' も falsy として扱われる問題）
const result = value || 'default';

// ✅ モダンな書き方（null/undefined のみ判定）
const result = value ?? 'default';

// 0 や空文字を保持したい場合に有効
const count = 0;
console.log(count || 10);  // 10（意図しない）
console.log(count ?? 10);  // 0（正しい）
```

---

## 10. 論理代入演算子（ES2021）

```javascript
// Null合体代入
let a = null;
a ??= 'default'; // a = a ?? 'default'

// OR代入
let b = '';
b ||= 'fallback'; // b = b || 'fallback'

// AND代入
let c = { value: 1 };
c &&= { ...c, updated: true }; // c = c && { ...c, updated: true }
```

---

## 11. 配列メソッド

### map / filter / reduce（ES5だが頻出）

```javascript
const numbers = [1, 2, 3, 4, 5];

// map: 変換
const doubled = numbers.map(n => n * 2); // [2, 4, 6, 8, 10]

// filter: 抽出
const evens = numbers.filter(n => n % 2 === 0); // [2, 4]

// reduce: 集約
const sum = numbers.reduce((acc, n) => acc + n, 0); // 15

// チェーン
const result = numbers
  .filter(n => n > 2)
  .map(n => n * 2)
  .reduce((acc, n) => acc + n, 0); // 24
```

### find / findIndex（ES6）

```javascript
const users = [
  { id: 1, name: 'John' },
  { id: 2, name: 'Jane' },
];

const user = users.find(u => u.id === 2); // { id: 2, name: 'Jane' }
const index = users.findIndex(u => u.id === 2); // 1
```

### includes（ES2016）

```javascript
const arr = [1, 2, 3];

// ❌ 古い書き方
arr.indexOf(2) !== -1;

// ✅ モダンな書き方
arr.includes(2); // true
```

### flat / flatMap（ES2019）

```javascript
const nested = [[1, 2], [3, 4], [5]];

// flat: ネストを平坦化
nested.flat(); // [1, 2, 3, 4, 5]

// flatMap: map + flat
const pairs = [1, 2, 3];
pairs.flatMap(n => [n, n * 2]); // [1, 2, 2, 4, 3, 6]
```

### at（ES2022）

```javascript
const arr = [1, 2, 3, 4, 5];

// 負のインデックスで末尾からアクセス
arr.at(-1); // 5
arr.at(-2); // 4
```

### toSorted / toReversed / toSpliced（ES2023）

```javascript
const arr = [3, 1, 2];

// 元の配列を変更せずに新しい配列を返す
const sorted = arr.toSorted(); // [1, 2, 3]（arr は変更されない）
const reversed = arr.toReversed(); // [2, 1, 3]

// splice のイミュータブル版
const spliced = arr.toSpliced(1, 1, 'a'); // [3, 'a', 2]
```

---

## 12. オブジェクトメソッド

### Object.entries / Object.fromEntries（ES2017/ES2019）

```javascript
const obj = { a: 1, b: 2, c: 3 };

// オブジェクト → 配列
const entries = Object.entries(obj); // [['a', 1], ['b', 2], ['c', 3]]

// 配列 → オブジェクト
const newObj = Object.fromEntries(entries);

// 変換に便利
const doubled = Object.fromEntries(
  Object.entries(obj).map(([key, value]) => [key, value * 2])
); // { a: 2, b: 4, c: 6 }
```

### Object.keys / Object.values（ES2017）

```javascript
const obj = { a: 1, b: 2 };

Object.keys(obj);   // ['a', 'b']
Object.values(obj); // [1, 2]
```

### Object.hasOwn（ES2022）

```javascript
const obj = { a: 1 };

// ❌ 古い書き方
obj.hasOwnProperty('a');

// ✅ モダンな書き方
Object.hasOwn(obj, 'a'); // true
```

---

## 13. クラス構文

### 基本（ES6）

```javascript
class User {
  constructor(name) {
    this.name = name;
  }

  greet() {
    return `Hello, ${this.name}`;
  }

  static create(name) {
    return new User(name);
  }
}
```

### プライベートフィールド（ES2022）

```javascript
class Counter {
  #count = 0; // プライベートフィールド

  increment() {
    this.#count++;
  }

  get value() {
    return this.#count;
  }
}
```

---

## 14. モジュール（ES6）

### Named Export / Import

```javascript
// utils.js
export const add = (a, b) => a + b;
export const subtract = (a, b) => a - b;

// main.js
import { add, subtract } from './utils.js';
import { add as sum } from './utils.js'; // リネーム
import * as utils from './utils.js'; // すべてインポート
```

### Default Export / Import

```javascript
// Button.js
export default function Button() { /* ... */ }

// main.js
import Button from './Button.js';
import MyButton from './Button.js'; // 任意の名前で可
```

### Dynamic Import（ES2020）

```javascript
// 遅延読み込み（コード分割に有効）
const module = await import('./heavy-module.js');
module.doSomething();

// 条件付きインポート
if (condition) {
  const { feature } = await import('./feature.js');
}
```

---

## 15. その他の便利な機能

### Rest パラメータ（ES6）

```javascript
const sum = (...numbers) => numbers.reduce((a, b) => a + b, 0);
sum(1, 2, 3, 4); // 10
```

### デフォルトパラメータ（ES6）

```javascript
const greet = (name = 'Guest', greeting = 'Hello') => {
  return `${greeting}, ${name}!`;
};
```

### Symbol（ES6）

```javascript
const id = Symbol('id');
const obj = { [id]: 123 };
```

### Map / Set（ES6）

```javascript
// Map: キーに任意の型を使用可能
const map = new Map();
map.set('key', 'value');
map.set({ id: 1 }, 'object key');

// Set: 重複のないコレクション
const set = new Set([1, 2, 2, 3]); // Set { 1, 2, 3 }
const unique = [...new Set(array)]; // 配列の重複除去
```

### for...of（ES6）

```javascript
const arr = [1, 2, 3];

// ❌ 古い書き方
for (let i = 0; i < arr.length; i++) { /* ... */ }

// ✅ モダンな書き方
for (const item of arr) { /* ... */ }

// インデックスが必要な場合
for (const [index, item] of arr.entries()) { /* ... */ }
```

---

## まとめ：優先度の高い機能

| 優先度 | 機能 | 実務での重要性 |
|--------|------|----------------|
| ⭐⭐⭐ | const/let | 必須 |
| ⭐⭐⭐ | アロー関数 | 必須 |
| ⭐⭐⭐ | 分割代入 | 必須（React props で多用） |
| ⭐⭐⭐ | スプレッド構文 | 必須（イミュータブル更新） |
| ⭐⭐⭐ | async/await | 必須（非同期処理） |
| ⭐⭐⭐ | オプショナルチェーン | 必須（安全なアクセス） |
| ⭐⭐⭐ | テンプレートリテラル | 必須 |
| ⭐⭐ | Null合体演算子 | 推奨 |
| ⭐⭐ | map/filter/reduce | 推奨（データ変換） |
| ⭐⭐ | Object.entries/fromEntries | 推奨 |
| ⭐ | toSorted/toReversed | 便利（ES2023） |
| ⭐ | プライベートフィールド | 状況による |

---

## 関連リソース

- [MDN Web Docs - JavaScript](https://developer.mozilla.org/ja/docs/Web/JavaScript)
- [TC39 Proposals](https://github.com/tc39/proposals)
- [ES6+ 互換性テーブル](https://kangax.github.io/compat-table/es6/)
