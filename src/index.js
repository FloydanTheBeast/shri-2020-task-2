const parse = require('json-to-ast')
const jsonTraversal = require('./jsonTraversal')
const validatorResolver = require('./validatorResolver')

const jsonSample = `{
    "block": "grid",
    "mods": {
        "m-columns": "10"
    },
    "content": [
        {
            "block": "grid",
            "elem": "fraction",
            "elemMods": {
                "m-col": "2"
            },
            "content": [
                {
                    "block": "payment"
                }
            ]
        },
        {
            "block": "grid",
            "elem": "fraction",
            "elemMods": {
                "m-col": "8"
            },
            "content": [
                {
                    "block": "offer"
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