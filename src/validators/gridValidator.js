const blockTypes = require('../consts/blockTypes')

class GridValidator {
    constructor(block, errors) {
        this.children = block.children
        this.loc = block.loc
        this.content = block.children.find(child => child.key.value === 'content')
        this.errors = errors

        this.columns = null
        this.functionalColumns = 0
        this.marketingColumns = 0

        this.getColumnsMod()
    }

    getColumnsMod() {
        this.children.forEach(child => {
            if (child.key.value === 'mods')
                child.value.children.forEach(mod => {
                    if (mod.key.value === 'm-columns') {
                        this.columns = Number(mod.value.value)
                    }
                })
        })
    }

    validate() {
        this.content.value.children.forEach(block => {
            // Количество колонок, занимаемое элементом
            let blockColumnSpan = 0
            let blockType = ''
            
            block.children.forEach(prop => {
                if (prop.key.value === 'elemMods') 
                    prop.value.children.forEach(mod => {
                        if (mod.key.value === 'm-col')
                            blockColumnSpan = Number(mod.value.value)
                    })

                if (prop.key.value === 'content') 
                    prop.value.children[0].children.forEach(nestedBlockProp => {
                        if (nestedBlockProp.key.value === 'block')
                            blockType = nestedBlockProp.value.value
                    })
            })

            
            if (blockTypes.functional.includes(blockType))
                this.functionalColumns += blockColumnSpan
            else if (blockTypes.marketing.includes(blockType))
                this.marketingColumns += blockColumnSpan
        })

        try {
            if (this.marketingColumns / this.columns > 0.5)
                this.errors.push(
                    {
                        'code': 'GRID.TOO_MUCH_MARKETING_BLOCKS',
                        'error': 'Маркетинговые блоки занимают более 50% сетки',
                        'location': {
                            'start': { 'column': this.loc.start.column, 'line': this.loc.start.line },
                            'end': { 'column': this.loc.end.column, 'line': this.loc.end.line }
                        }
                    }
                )
        }
        catch {
            console.warn('Количество колонок у grid равно нулю')
        }
    }
}

module.exports = GridValidator