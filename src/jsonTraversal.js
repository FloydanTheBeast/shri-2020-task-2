const ValidatorResolver = require('./validatorResolver')

class JsonTraversal {
    constructor(errors) {
        this.errors = errors
        this.traverseJson = this.traverseJson.bind(this)
        this.validator = new ValidatorResolver(this.errors, this.traverseJson)
    }

    traverseJson(data, errors, validator) {
        const { type } = data
        
        switch (type) {
            case 'Object':
                const isBlock = data.children.reduce((acc, child) => (
                    acc || child.key.value === 'block'
                ), false)

                if (isBlock) {
                    if (validator) validator(data)
                    else this.validator.resolve(data)
                }
                
                data.children.forEach(child => { 
                    this.traverseJson(child, errors, validator)
                })
                break
            case 'Property':
                if (data.key.value === 'content' || data.key.value === 'mix') {
                    this.traverseJson(data.value, errors, validator)
                }
                break
            case 'Array':
                data.children.forEach(child => this.traverseJson(child, errors, validator))
                break
            default:
                break
        }
    }

    postProcessing() {
        let postProcessors = this.validator.postProcessors.slice()

        while (postProcessors.length > 0) {
            let postProcessor = postProcessors.pop()
            postProcessor.call()
        }
    }
}
module.exports = JsonTraversal