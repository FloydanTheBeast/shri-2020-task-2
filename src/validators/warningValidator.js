const traverseJson = require('../jsonTraversal')
const getBlockName = require('../utils/getBlockName')
const sizes = require('../utils/constsSizes')

class WarningValidator {
    constructor(block, errors) {
        this.children = block.children
        this.loc = block.loc
        this.content = block.children.find(child => child.key.value === 'content')
        this.textSize = null
        this.errors = errors

        this.has
    }

    validate() {
        if (this.content)
            this.content.value.children.forEach(child => {
                traverseJson(child, this.errors, this.blockValidatorResolver.bind(this))
            })
    }

    blockValidatorResolver(block) {
        switch (getBlockName(block)) {
            case 'text':
                this.checkTextSizes(block)
                break;
        }
    }

    checkTextSizes(block) {        
        let sizeMod = null

        block.children.forEach(child => {
            if (child.key.value === 'mods') {
                const mods = child.value
                
                sizeMod = mods.children.find(mod => 
                    mod.key.value === 'size'
                ).value.value

                if (this.textSize === null) this.textSize = sizeMod
            }
        })

        // FIXME: Прерывать дальнейшую проверку, если нашлась ошибка
        if (this.textSize !== sizeMod || !sizes.includes(sizeMod)) 
            this.errors.push(
                {
                    'code': 'WARNING.TEXT_SIZES_SHOULD_BE_EQUAL',
                    'error': 'Тексты в блоке warning должны быть одного размера',
                    'location': {
                        'start': { 'column': this.loc.start.column, 'line': this.loc.start.line },
                        'end': { 'column': this.loc.end.column, 'line': this.loc.end.line }
                    }
                }
            )
    }
    
}

module.exports = WarningValidator