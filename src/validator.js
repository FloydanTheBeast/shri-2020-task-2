const getBlockName = require('./utils/getBlockName')
const WarningValidator = require('./validators/warningValidator')

const validate = (block, errors) => {
    
    switch (getBlockName(block)) {
        case 'warning':
            const warningValidator = new WarningValidator(block, errors)
            warningValidator.validate()
            break
        case 'text':
            // TODO: Проверка 'text'
            break
        case 'grid':
            // TODO: Проверка 'grid'
            break
        default:
            break
    }
}

module.exports = validate