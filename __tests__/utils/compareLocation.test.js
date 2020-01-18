const parse = require('json-to-ast')
const compareLocation = require('../../src/utils/compareLocation')

const elem = parse(`
    [{
        "block": "text",
        "mods": { "size": "m" }
    },
    {
        "block": "text",
        "mods": { "size": "l" }
    }]
`)

test('1 if element passed as second argument is above element passed as first argument, 0 othewise', () => {
    expect(compareLocation(elem.children[0], elem.children[1])).toBeTruthy(),
    expect(compareLocation(elem.children[1], elem.children[0])).toBeFalsy()
})