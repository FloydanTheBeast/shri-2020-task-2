class TextValidator {
    constructor(block, errors, traverseJson, state) {
        this.block = block
        this.children = block.children
        this.loc = block.loc
        this.errors = errors
        this.traverseJson = traverseJson
        this.state = state
    }

    validate() {
        console.log(this.state)
        this.children.forEach(prop => {
            if (prop.key.value === 'mods')
            prop.value.children.forEach(mod => {
                if (mod.key.value === 'type' && mod.value.value === 'h1')
                    if (!this.state.h1)
                        this.state = Object.assign(this.state, { h1: this.block })
                    else
                        this.errors.push(
                            {
                                'code': 'TEXT.SEVERAL_H1',
                                'error': 'Заголовок первого уровня может быть единственным',
                                'location': {
                                    'start': { 'column': this.loc.start.column, 'line': this.loc.start.line },
                                    'end': { 'column': this.loc.end.column, 'line': this.loc.end.line }
                                }
                            }
                        )
            })   
        })
    }
}

module.exports = TextValidator