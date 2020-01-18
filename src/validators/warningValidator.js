const getBlockName = require('../utils/getBlockName')
const textSizes = require('../consts/textSizes')
const placeholderSizes = require('../consts/placeholderSizes')
const compareLocation = require('../utils/compareLocation')

class WarningValidator {
    constructor(block, errors, traverseJson, state, postProcessors) {
        this.children = block.children
        this.loc = block.loc
        this.content = block.children.find(child => child.key.value === 'content')
        this.primarySize = null
        this.errors = errors
        this.traverseJson = traverseJson
        this.state = state
        this.postProcessors = postProcessors
    }

    validate() {
        if (this.content)
            this.content.value.children.forEach(child => {
                this.traverseJson(child, this.errors, this.blockValidatorResolver.bind(this))
            })
    }

    blockValidatorResolver(block) {
        switch (getBlockName(block)) {
            case 'text':
                this.checkTextSizes(block)
                break
            case 'button':
                this.checkButtonSize(block)
                this.postProcessors.push(this.checkButtonPosition.bind(this, block))
                break
            case 'placeholder':
                this.checkPlaceholderSize(block)
                break
        }
    }

    checkTextSizes(block) {        
        let sizeMod = null

        block.children.forEach(child => {
            if (child.key.value === 'mods') {
                sizeMod = child.value.children.find(mod => 
                    mod.key.value === 'size'
                ).value.value

                if (this.primarySize === null) {
                    this.primarySize = sizeMod
                }
            }
        })

        // FIXME: Прерывать дальнейшую проверку, если нашлась ошибка    
        if (this.primarySize !== sizeMod || !textSizes.includes(sizeMod)) 
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

    checkButtonSize(block) {
        // Если эталонный размер ещё не найден, то откладываем проверку
        if (!this.primarySize) 
            this.postProcessors.push(this.checkButtonSize.bind(this, block))
        else {
            block.children.forEach(prop => {
                if (prop.key.value === 'mods')
                    prop.value.children.forEach(mod => {
                        if (mod.key.value === 'size') {
                            let textSizeIndex = textSizes.findIndex(
                                textSize => textSize === this.primarySize
                            )

                            let btnSizeIndex = textSizes.findIndex( 
                                textSize => textSize === mod.value.value
                            )

                            if (textSizeIndex !== btnSizeIndex - 1)
                                this.errors.push(
                                    {
                                        'code': 'WARNING.INVALID_BUTTON_SIZE',
                                        'error': 'Недопустимый размер button',
                                        'location': {
                                            'start': { 'column': block.loc.start.column, 'line': block.loc.start.line },
                                            'end': { 'column': block.loc.end.column, 'line': block.loc.end.line }
                                        }
                                    }
                                )
                        }
                    })
            })
        }
    }

    checkButtonPosition(block) {
        if (this.state.placeholders && !compareLocation(this.state.placeholders[this.state.placeholders.length - 1], block))
            this.errors.push(
                {
                    'code': 'WARNING.INVALID_BUTTON_POSITION',
                    'error': 'Блок button не может находиться выше блока placeholder',
                    'location': {
                        'start': { 'column': block.loc.start.column, 'line': block.loc.start.line },
                        'end': { 'column': block.loc.end.column, 'line': block.loc.end.line }
                    }
                }
            )
    }

    checkPlaceholderSize(block) {
        let placeholderSize

        if (!this.state.placeholders)
            this.state = Object.assign(this.state, { placeholders: block })
        else
            this.state.placeholders.push(block)

        block.children.forEach(child => {
            if (child.key.value === 'mods') {
                const mods = child.value
                
                placeholderSize = mods.children.find(mod => 
                    mod.key.value === 'size'
                ).value.value
            }
        })
        
        if (!placeholderSizes.includes(placeholderSize)) 
            this.errors.push(
                {
                    'code': 'WARNING.INVALID_PLACEHOLDER_SIZE',
                    'error': 'Недопустимый размер placeholder',
                    'location': {
                        'start': { 'column': block.loc.start.column, 'line': block.loc.start.line },
                        'end': { 'column': block.loc.end.column, 'line': block.loc.end.line }
                    }
                }
            )
    }
}

module.exports = WarningValidator