const getBlockName = require('../utils/getBlockName')
const sizes = require('../utils/constsSizes')

class WarningValidator {
    constructor(block, errors) {
        this.children = block.children
        this.loc = block.loc
        this.content = block.children.find(child => child.key.value === 'content')

        this.errors = errors
    }

    validate() {
        if (this.content)
            // console.log(this.content)
            this.content.value.children.forEach(block => block.children.forEach(child => console.log(child)))
    }

    blockValidatorResolver(block) {
        switch (block.getBlockName()) {
            case 'text':
                checkTextSizes(block)
        }
    }

    checkTextSizes(block) {
        block.children.forEach(child => {
            if (child.key.value === 'mods') {
                const mods = child.key.value

                const size = mods.value.children.find(mod => {
                    mod.key.value === 'size'
                }).value.value

                console.log('test')
                
            }
        })
    }
    
}

module.exports = WarningValidator