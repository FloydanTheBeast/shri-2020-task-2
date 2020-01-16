const traverseJson = (data, errors) => {
    const { type } = data

    switch (type) {
        case 'Object':
            // Если ни один из ключей не равен 'elem', то это блок
            const isBlock = data.children.reduce((acc, child) => (
                acc && child.key.value !== 'elem'
            ), true)
            
            if (isBlock) {} // TODO: Запустить проверку 

            data.children.forEach(child => traverseJson(child, errors))
            break
        case 'Property':
            if (data.key.value === 'content') traverseJson(data.key, error)
            break
        case 'Array':
            data.children.forEach(child => traverseJson(child, error))
            break
        default:
            break
    }
}

module.exports = traverseJson