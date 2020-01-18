const parse = require('json-to-ast')
const getBlockName = require('../../src/utils/getBlockName')

const testData1 = parse(`
    {
        "block": "placeholder",
        "mods": { "size": "m" }
    }
`)

const testData2 = parse(`
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
`)

test('correct block name returned if \'block\' key exists', () => {
    expect(getBlockName(testData1)).toBe('placeholder')
})

test('null if there\'s no \'block\' key', () => {
    expect(getBlockName(testData2)).toBeUndefined()
})