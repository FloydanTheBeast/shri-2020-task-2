const parse = require('json-to-ast')
const jsonTraversal = require('./jsonTraversal')

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

jsonTraversal(
    parse(jsonSample, astSettings)
)