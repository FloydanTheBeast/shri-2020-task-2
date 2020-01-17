const getBlockName = require('./utils/getBlockName')
const WarningValidator = require('./validators/warningValidator')
const GridValidator = require('./validators/gridValidator')

const resolveValidator = (block, errors) => {
    switch (getBlockName(block)) {
        case 'warning':
            const warningValidator = new WarningValidator(block, errors)
            warningValidator.validate()
            break
        case 'text':
            // TODO: Проверка 'text'
            break
        case 'grid':
            const gridValidator = new GridValidator(block, errors)
            gridValidator.validate()
            break
        default:
            break
    }
}

module.exports = resolveValidator