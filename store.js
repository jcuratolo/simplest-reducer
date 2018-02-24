const {createStore} = require('redux')

module.exports = function (initialState={}) {
    return createStore(function (state=initialState, action) {
        const {key, value} = action
        switch (action.type) {
            case 'put':
                state[key] = value
            default: break;
        }
    
        return state
    })
}