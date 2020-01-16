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

const json2 = `{
    "block": "warning",
    "content": [
        { "block": "placeholder", "mods": { "size": "xl" } }
    ]
}`

const astSettings = {
    loc: true
}

const errors = []

jsonTraversal(
    parse(json2, astSettings),
    errors,
    validatorResolver
)

console.log(errors)