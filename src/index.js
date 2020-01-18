const parse = require('json-to-ast')
const JsonTraversal = require('./jsonTraversal')
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
                "m-col": "8"
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
                "m-col": "2"
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

const jsonTraversal = new JsonTraversal(errors)
jsonTraversal.traverseJson(
    parse(jsonSample, astSettings)
)

jsonTraversal.postProcessing()

console.log(errors)