const traverseJson = (data, errors, validator) => {
    const { type } = data
    
    switch (type) {
        case 'Object':
            const isBlock = data.children.reduce((acc, child) => (
                acc || child.key.value === 'block'
            ), false)

            if (isBlock) validator(data, errors)
            
            data.children.forEach(child => { 
                traverseJson(child, errors, validator)
            })
            break
        case 'Property':
            if (data.key.value === 'content') {
                traverseJson(data.value, errors, validator)
            }
            break
        case 'Array':
            data.children.forEach(child => traverseJson(child, errors, validator))
            break
        default:
            break
    }
}

module.exports = traverseJson