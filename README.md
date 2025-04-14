# @libhub/utils

[![NPM version](https://img.shields.io/npm/v/@libhub/utils?color=00dc82&label=)](https://www.npmjs.com/package/@libhub/utils)

A toolkit for common JavaScript / TypeScript.

- Tree-shakable ESM
- Fully typed
- Type utilities

## Install

```bash
npm install @libhub/utils
```

## API
### Utility Functions

[**Tree Operations Class**](./src/utils/tree/index.ts): A class to handle tree data structures, providing methods to find, map, and traverse tree nodes.

```typescript
import { Tree } from '@libhub/utils';

const data = [
  { id: 1, children: [{ id: 2 }, { id: 3 }] },
  { id: 4, children: [{ id: 5 }] }
];

const tree = new Tree(data);

// Find a node
const node = tree.find(item => item.id === 3);
console.log(node);

// Map over the tree
const newTree = tree.map(item => ({ ...item, newProp: true }));
console.log(newTree.toArray());//[ { id: 1, children: [ { id: 2,newProp: true }, { id: 3,newProp: true } ] }, { id: 4, children: [ { id: 5,newProp: true } ] ,newProp: true},newProp: true} ]

// Find the path to a node
const path = tree.findPath(item => item.id === 3);
console.log(path);//[ { id: 1, children: [ { id: 2 }, { id: 3 } ] }, { id: 3 } ]
```

[**Tracker Class**](./src/utils/tracker/trackers.ts):
   A class compatible with Mixpanel and Google Analytics, allowing for event tracking, page views, and setting global parameters.

```typescript
import { Trackers, createTracker } from '@libhub/utils';

const tracker = new Trackers([
  createTracker('mixpanel', '1234567890'),
  createTracker('googleAnalytics', '1234567890')
]);

tracker.init({ /* initialization options */ });
tracker.event('eventName', { key: 'value' });
tracker.pageview({ path: '/home' });
```

[**File Download**](./src/utils/file/download.ts): Functions to download files from URLs, base64 strings, and data blobs, supporting various browsers.
```typescript
import { downloadByUrl, dowloadBlobFile } from '@libhub/utils';

downloadByUrl({
    url: 'https://example.com/file.png',
    fileName: 'downloaded.png'
  });

dowloadBlobFile('downloaded.txt', new Blob(['Hello, world!'], { type: 'text/plain' }));
```

### Type Functions

[**PartialBy**](./src/types/tools.ts): Make a property optional.
```typescript
type PartialExample = PartialBy<{ a: number; b: string }, 'a'>; // { a?: number; b: string }
```

[**DeepPartial**](./src/types/tools.ts): Recursively make all properties optional.
```typescript
type DeepPartialExample = DeepPartial<{ a: { b: { c: number } } }>; // { a?: { b?: { c?: number } } }
```

[**PascalCaseJoin**](./src/types/tools.ts): Transforms an array of string into a PascalCase-formatted string.
```typescript
type Example = PascalCaseJoin<['hello', 'world']>; // 'HelloWorld'
```

[**CamelCaseJoin**](./src/types/tools.ts): Transforms an array of string into a camelCase-formatted string.
```typescript
type Example = CamelCaseJoin<['hello', 'world']>; // 'helloWorld'
```

[**Compact**](./src/types/tools.ts): Remove falsy values from an array.
```typescript
const example = ['1', 1, undefined, 5, 0, 6, 0n, '', 'g', NaN, 5, false, null] as const;
type Example = Compact<typeof example>; // ["1", 1, 5, 6, "g", 5]
```

[**IsTuple**](./src/types/tools.ts): Check if a value is a tuple.
```typescript
type Example = IsTuple<[1, '2', 'a']>; // true
type Example = IsTuple<string[]>; // false
```

[**Equal**](./src/types/tools.ts): Check if two values are equal.
```typescript
type Example = Equal<1, 1>; // true
type Example = Equal<1, 2>; // false
```

[**NotEqual**](./src/types/tools.ts): Check if two values are not equal.
```typescript
type Example = NotEqual<1, 2>; // true
```

[**RequiredAnyOne**](./src/types/tools.ts): Check if a value is required.
```typescript
type Example = RequiredAnyOne<{ a: number; b?: string }>; // { a: number; b?: string } | { a?: number; b: string }
```

[**GroupBy**](./src/types/tools.ts): Group an array of objects by a specific property.
```typescript
type Example = GroupBy<[
  { id: 1; name: 'John'; age: 25 },
  { id: 2; name: 'Jane'; age: 30 },
  { id: 1; name: 'John'; age: 25 },
  { id: 3; name: 'Alice'; age: 35 }
], 'id'); // { 1: { id: 1; name: 'John'; age: 25 }, 2: { id: 2; name: 'Jane'; age: 30 }, 3: { id: 3; name: 'Alice'; age: 35 } }
```

[**ArrayToUnion**](./src/types/tools.ts): Convert an array to a union.
```typescript
type Example = ArrayToUnion<[1, 2, 3]>; // 1 | 2 | 3
```

[**PickString**](./src/types/tools.ts): Pick a string property from an object.
```typescript
type Example = PickString<{ a: number; b: string }>; // { a: number }
```

[**ExtarctPairsFromObjectArray**](./src/types/tools.ts): Extract pairs from an array of objects.
```typescript
type Example = ExtarctPairsFromObjectArray<[
  { id: 1; name: 'John'; age: 25 },
  { id: 2; name: 'Jane'; age: 30 },
  { id: 1; name: 'John'; age: 25 },
  { id: 3; name: 'Alice'; age: 35 }
], 'name', 'age'); // { John: 25, Jane: 30, Alice: 35 }
```
