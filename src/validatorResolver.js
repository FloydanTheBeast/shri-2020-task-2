const getBlockName = require('./utils/getBlockName')
const WarningValidator = require('./validators/warningValidator')
const TextValidator = require('./validators/textValidator')
const GridValidator = require('./validators/gridValidator')

class ValidatorResolver {
    constructor(errors, traverseJson, state = {}) {
        this.errors = errors
        this.state = state
        this.traverseJson = traverseJson

        this.postProcessors = []
    }

    resolve(block) {
        switch (getBlockName(block)) {
            case 'warning':
                const warningValidator = new WarningValidator(block, this.errors, this.traverseJson)
                warningValidator.validate()
                break
            case 'text':
                const textValidator = new TextValidator(block, this.errors, this.traverseJson, this.state, this.postProcessors)
                textValidator.validate()
                break
            case 'grid':
                const gridValidator = new GridValidator(block, this.errors, this.traverseJson)
                gridValidator.validate()
                break
            default:
                break
        }
    }
}

module.exports = ValidatorResolver