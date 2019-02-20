const hackers = (state = {test: [{name: 'test'}]}, action) => {
    switch (action.type) {
        case 'ADD_HACKER_NEWS':
            return Object.assign({}, state, {
                stories: action.payload.map(s => s.val())
            });
        case 'ADD_HACKERS':
            return Object.assign({}, state, {
                users: action.payload.map(s => s.val())
            });
        case 'ADD_COMMENTS':
            return Object.assign({}, state, {
                comments: action.payload.map(s => s.val())
            });
        default:
            return state
    }
}
export default hackers;