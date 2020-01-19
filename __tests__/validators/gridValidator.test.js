const GridValidator = require('../../src/validators/gridValidator')
const parse = require('json-to-ast')

const testData = `
    {
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
    }
`

test('gridValidator works correctly', () => {
    let errors = []
    const gridValidator = new GridValidator(parse(testData), errors)

    expect(gridValidator.functionalColumns).toBe(0)
    expect(gridValidator.marketingColumns).toBe(0)
    expect(gridValidator.columns).toBe(10)
    expect(gridValidator.errors.length).toBe(0)

    gridValidator.validate()

    expect(gridValidator.functionalColumns).toBe(2)
    expect(gridValidator.marketingColumns).toBe(8)
    expect(gridValidator.errors.length).toBe(1)
})

test('gridValidator returns correct error', () => {
    let errors = []
    const gridValidator = new GridValidator(parse(testData), errors)
    gridValidator.validate()

    expect(gridValidator.errors).toMatchSnapshot()
})