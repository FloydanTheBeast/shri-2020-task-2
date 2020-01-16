const getBlockName = require('./utils/getBlockName')

const validate = block => {
    
    switch (getBlockName(block)) {
        case 'warning':
            // TODO: Проверка 'warning'
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