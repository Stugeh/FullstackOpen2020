const initialFilter = ''

const reducer = (state = initialFilter, action) => {
    switch(action.type){
        case 'CHANGE': return action.data.textBox
        default: return state
    }
}

export const updateFilter = (textBox) => ({type: 'CHANGE', data: {textBox}})

export default reducer