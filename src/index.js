const parse = require('json-to-ast')
const jsonTraversal = require('./jsonTraversal')
const validatorResolver = require('./validatorResolver')

const jsonSample = `{
    "block": "warning",
    "content": [
        { "block": "button", "mods": { "size": "m" } },
        { "block": "placeholder", "mods": { "size": "m" } }
    ]
}`

const astSettings = {
    loc: true
}

const errors = []

jsonTraversal(
    parse(jsonSample, astSettings),
    errors,
    validatorResolver
)

console.log(errors)