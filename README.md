# glsl-token-macros

[![stable](http://badges.github.io/stability-badges/dist/stable.svg)](http://github.com/badges/stability-badges)

Extract macro preprocessor statements from an array of GLSL tokens from [glsl-tokenizer](https://github.com/stackgl/glsl-tokenizer).

Parses out the macro name, arguments (if present) and contents.

## Usage

[![NPM](https://nodei.co/npm/glsl-token-macros.png)](https://www.npmjs.com/package/glsl-token-macros)

### `macros = tokenMacros(tokens)`

Given an array of `tokens` produced by [glsl-tokenizer](https://github.com/stackgl/glsl-tokenizer), return an array of macro data in the following format:

``` javascript
{
  name: 'MACRO_NAME',
  args: ['a', 'b'],
  value: '(a * 0.5 + 0.5)',
  index: 2,
  token: {
    type: 'preprocessor',
    data: '#define MACRO_NAME(a, b) (a * 0.5 + 0.5)'
  }
}
```

#### `macro.name`

The macro name. For example, `#define HELLO_WORLD` would result in `HELLO_WORLD`.

#### `macro.args`

The arguments supplied to the macro. If the macro has no arguments, this will be false. Note that 0 arguments will result in an empty array. For example:

``` javascript
const tokenMacros = require('glsl-token-macros')
const toString = require('glsl-token-string')
const tokenize = require('glsl-tokenizer')
const src = `
#define HELLO_WORLD a
#define LOREM_IPSUM() a
#define BOGAN_IPSUM(a) (a * 0.5 + 0.5)
#define SOME_OTHERS(a, b) (a * 0.5 + b)
`

const tokens = tokenize(src)
const macros = tokenMacros(tokens)

console.log(macros[0].args) // false
console.log(macros[1].args) // []
console.log(macros[2].args) // ["a"]
console.log(macros[3].args) // ["a", "b"]
```

#### `macro.value`

The macro value. If no value is supplied, this will be an empty string. For example:

``` javascript
const tokenMacros = require('glsl-token-macros')
const toString = require('glsl-token-string')
const tokenize = require('glsl-tokenizer')
const src = `
#define HELLO_WORLD
#define LOREM_IPSUM() a
#define BOGAN_IPSUM(a)    (a * 0.5 + 0.5)
#define SOME_OTHERS(a, b) (a * 0.5 + b)
`

const tokens = tokenize(src)
const macros = tokenMacros(tokens)

console.log(macros[0].value) // ""
console.log(macros[1].value) // "a"
console.log(macros[2].value) // "(a * 0.5 + 0.5)"
console.log(macros[3].value) // "(a * 0.5 + b)"
```

### `macro.token`

The original preprocessor token object from the token list.

### `macro.index`

The index of the original preprocessor token object within the token list.

## Contributing

See [stackgl/contributing](https://github.com/stackgl/contributing) for details.

## License

MIT. See [LICENSE.md](http://github.com/stackgl/glsl-token-macros/blob/master/LICENSE.md) for details.
