const parse = require('json-to-ast')
const JsonTraversal = require('./jsonTraversal')
const validatorResolver = require('./validatorResolver')

const jsonSample = `[
    {
        "block": "text",
        "mods": { "type": "h3" }
    },
    {
        "block": "text",
        "mods": { "type": "h2" }
    }
]`

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