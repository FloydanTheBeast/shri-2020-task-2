const compareLocation = require('../utils/compareLocation')

class TextValidator {
    constructor(block, errors, traverseJson, state, postProcessors) {
        this.block = block
        this.children = block.children
        this.loc = block.loc
        this.errors = errors
        this.traverseJson = traverseJson
        this.state = state
        this.postProcessors = postProcessors
    }

    validate() {
        this.children.forEach(prop => {
            if (prop.key.value === 'mods')
            prop.value.children.forEach(mod => {
                if (mod.key.value === 'type')
                    switch(mod.value.value) {
                        case 'h1':
                            this.checkNumberOfH1()
                            break
                        case 'h2':
                            this.postProcessors.push(this.checkPositionOfH2.bind(this))
                            break
                        case 'h3':
                            this.postProcessors.push(this.checkPositionOfH3.bind(this))
                            break
                    }
            })   
        })
    }

    checkNumberOfH1() {
        if (!this.state.h1)
            this.state = Object.assign(this.state, { h1: [this.block] })
        else {
            this.state.h1.push(this.block)
            this.errors.push(
                {
                    'code': 'TEXT.SEVERAL_H1',
                    'error': 'Заголовок первого уровня должен быть единственным',
                    'location': {
                        'start': { 'column': this.loc.start.column, 'line': this.loc.start.line },
                        'end': { 'column': this.loc.end.column, 'line': this.loc.end.line }
                    }
                }
            )
        }
    }

    checkPositionOfH2() {
        if (!this.state.h2)
            this.state = Object.assign(this.state, { h2: [this.block] })
        else
            this.state.h2.push(this.block)

        if (this.state.h1 && !compareLocation(this.state.h1[this.state.h1.length - 1], this.block))
            this.errors.push(
                {
                    'code': 'TEXT.INVALID_H2_POSTION',
                    'error': 'Заголовок второго уровня не может находиться выше заголовка первого уровня',
                    'location': {
                        'start': { 'column': this.loc.start.column, 'line': this.loc.start.line },
                        'end': { 'column': this.loc.end.column, 'line': this.loc.end.line }
                    }
                }
            )
    }

    checkPositionOfH3() {
        if (this.state.h2 && !compareLocation(this.state.h2[this.state.h2.length - 1], this.block))
            this.errors.push(
                {
                    'code': 'TEXT.INVALID_H3_POSTION',
                    'error': 'Заголовок третьего уровня не может находиться выше заголовка второго уровня',
                    'location': {
                        'start': { 'column': this.loc.start.column, 'line': this.loc.start.line },
                        'end': { 'column': this.loc.end.column, 'line': this.loc.end.line }
                    }
                }
            )
    }
}

module.exports = TextValidator