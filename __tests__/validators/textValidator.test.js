const TextValidator = require('../../src/validators/textValidator')
const parse = require('json-to-ast')

const testData = `
    {
        "block": "text",
        "mods": { "type": "h1" }
    }
`

test('textValidator works correctly', () => {
    let errors = []
    let state = {}
    const textValidator = new TextValidator(parse(testData), errors, () => {}, state)

    expect(textValidator.state.h1).toBeUndefined()

    textValidator.validate()

    expect(textValidator.state.h1).toBeDefined()
    expect(textValidator.state.h1[0]).toMatchSnapshot()
})