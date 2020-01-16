const parse = require('json-to-ast')
const jsonTraversal = require('./jsonTraversal')
const validatorResolver = require('./validatorResolver')

const jsonSample = `{
    "block": "warning",
    "content": [
        {
            "block": "placeholder",
            "mods": { "size": "m" }
        },
        {
            "elem": "content",
            "content": [
                {
                    "block": "text",
                    "mods": { "size": "m" }
                },
                {
                    "block": "text",
                    "mods": { "size": "l" }
                }
            ]
        }
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