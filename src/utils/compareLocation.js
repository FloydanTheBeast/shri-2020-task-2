// Сравнение положения соседних блоков
const compareLocation = ({ loc: loc1 }, {loc: loc2}) => {
    return 1 ? loc1.end.line < loc2.end.line 
            || (loc1.end.line === loc2.end.line && loc1.end.column < loc2.end.column) : 0
}

module.exports = compareLocation