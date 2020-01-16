const getBlockName = block => {
    let blockName

    block.children.forEach(child => {
        if (child.key.value === 'block') blockName = child.value.value
    })

    return blockName
}

module.exports = getBlockName