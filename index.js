module.exports = tokenMacros

function tokenMacros (tokens) {
  var macros = []

  for (var i = 0; i < tokens.length; i++) {
    var token = tokens[i]
    if (token.type !== 'preprocessor') continue
    var split = token.data.trim().split(/\s+/)
    if (split[0] !== '#define') continue
    if (split[1].indexOf('(') === -1) {
      macros.push({
        name: split[1],
        args: false,
        value: split.slice(2).join(' ').trim(),
        token: tokens[i],
        index: i
      })
    } else {
      var content = split.slice(1).join(' ').trim()
      var startArgs = null
      var endArgs = null

      for (var j = 0; j < content.length; j++) {
        var char = content.charAt(j)
        if (char === '(') {
          startArgs = j
        } else
        if (char === ')') {
          endArgs = j
        } else
        if (endArgs !== null && (char === ' ' || char === '\t')) {
          break
        }
      }

      var name = content.slice(0, startArgs)
      var args = content.slice(startArgs + 1, endArgs).split(',')
      var value = content.slice(endArgs + 1).trim()

      macros.push({
        name: name,
        args: args.map(function (d) { return d.trim() }),
        value: value,
        token: tokens[i],
        index: i
      })
    }
  }

  return macros
}
