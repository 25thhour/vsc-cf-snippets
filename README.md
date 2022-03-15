# VSCode Snippets for Cloudflare

Bootstrapped from [25thhour/11ty-vscode-snippet-generator](https://github.com/25thhour/11ty-vscode-snippet-generator)

## Requirements

[Node](https://nodejs.org/) >= 12

## Getting Started

```
npm install
```

Run `npm run build` to install the [helpers](#helpers).
Run `npm run dev` to watch for changes and start creating your own snippet collections 🔥

### Folder Structure

Subdirectories under `./src/snippets/` should be named after one of the [supported vscode language _identifiers_](https://code.visualstudio.com/docs/languages/identifiers#_known-language-identifiers).

e.g. for javascript snippets:

```
./src/snippets/javascript/
```

Now add any number of individual snippet files ensuring they have a `.njk` file extension.

```
./src/snippets/
├── javascript
│   ├── snippet-1.njk
│   ├── snippet-2.njk
│   ├── snippet-3.njk
│   └── snippet-4.njk
```

### Helpers

This project also ships with it's own helper snippets (`./src/helpers/`) that are bundled to `./dist/helpers.code-snippets` and copied to `./.vscode/helpers.code-snippets` so that they're globally available within this project.

1. `snip` - expands to a standard snippet skeleton.
2. `snip:spaces` - expands to a standard snippet skeleton **plus** a frontmatter key of `spaceIndent` allowing you to set a custom space indent > 2.

As each snippet file **must** contain a few frontmatter keys to support the generation process, it's strongly advised that you start a new snippet file by typing `snip` and populating the snippet accordingly.

## Frontmatter

All snippets require a `frontmatter` block with the following keys (unless listed as optional):

```
---
name: <snippet-name>
prefix: <snippet-prefix>
description: <snippet-description> (optional)
spaceIndent: 4 (optional)
---
```

| Key                      | Role                                                                                     |
| ------------------------ | ---------------------------------------------------------------------------------------- |
| `name`                   | The name of the snippet.                                                                 |
| `prefix`                 | The snippet's prefix. **Note**: `prefix` can be an array of options or a single string.  |
| `description` (optional) | The snippet's description.                                                               |
| `spaceIndent` (optional) | The number of spaces to indent the snippet body. If not specified defaults to `2` spaces |

### Prefix Examples

Single `string` prefix:

```
prefix: <snippet-prefix>
```

An `array` of prefixes:

```
prefix:
- <snippet-prefix-1>
- <snippet-prefix-2>
- etc
```

### Example Snippet

```
---
name: for-loop
prefix:
- for
- for-const
description: A for loop.
---

for (const ${2:element} of ${1:array}) {
 $0
}
```

## Usage

> Default state requires zero configuration and assumes (and has only been tested with) [Nunjucks templates](https://www.11ty.dev/docs/languages/nunjucks/).

1. Run `npm run dev` to watch for changes in `./src/snippets/*`.
2. Create each code snippet(s) in `./src/snippets/<language-identifier>/<snippet-name>.njk`

   e.g. `./src/snippets/javascript/for-loop.njk`

   ```
   ---
   name: for-loop
   prefix:
    - for
    - for-const
   description: A for loop.
   ---

   for (const ${2:element} of ${1:array}) {
     $0
   }
   ```

3. Every snippet in the `./src/snippets/javascript/*` directory is bundled into a single snippet collection and output into `./dist/snippets/language-identifier>.json`

   e.g. `./dist/snippets/javascript.json`

   ```
   {
     "for-loop": {
       "prefix": ["for", "for-const"],
       "body": ["for (const ${2:element} of ${1:array}) {", "\t$0", "}"],
       "description": "A for loop."
     }
   }
   ```

4. (optional) run `npm run build` or `npm run prettier` to prettify the generated snippets.

## Add Your Snippets to VSCode

### MacOS

Copy your language specific snippet files from `./dist/snippets/<language>.json` to `~/Library/Application Support/Code/User/snippets/<language>.json`

e.g.

```
cp ./dist/snippets/javascript/javascript.json ~/Library/Application\ Support/Code/User/snippets/javascript.json
```

---

## Credits

Inspired by https://snippet-generator.app/

---

> ⚠️ Note: this project hasn't been tested on Windows ⚠️
