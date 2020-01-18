const parse = require('json-to-ast')
const JsonTraversal = require('./src/jsonTraversal')

const astSettings = {
    loc: true
}

const lint = (json) => {
    const errors = []
    const jsonTraversal = new JsonTraversal(errors)

    jsonTraversal.traverseJson(
        parse(json, astSettings)
    )
    jsonTraversal.postProcessing()

    return errors
}

if (typeof(global) !== 'undefined')
    global.lint = lint
else
    window.lint = lint