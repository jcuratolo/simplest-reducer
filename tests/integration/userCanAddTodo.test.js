const test = require('tape')
const createStore = require('../../store')

test('User can add a new todo', function(t) {
    const store = createStore({
        todos: [],
        draftTodo: '',
        currentView: 'todosListView'
    })
    const beforeState = store.getState()
    const actions = [
        ['put', 'currentView', 'addTodoFormView', 'Show add todo form'],
        ['put', 'draftTodo', {text: 'n', isComplete: false}, 'Update draft todo text'],
        ['put', 'draftTodo', {text: 'ne', isComplete: false}, 'Update draft todo text'],
        ['put', 'draftTodo', {text: 'new', isComplete: false}, 'Update draft todo text'],
        ['put', 'todos', [{text: 'new', isComplete: false}], 'Add draft todo to todos'],
        ['put', 'draftTodo', '', 'Clear draft todo'],
        ['put', 'currentView', 'todosListView', 'Show todos list']
    ] 
    
    actions.forEach(function ([type, key, value]) {
        store.dispatch({type, key, value})
    })

    const state = store.getState()

    t.is(state.todos.length, 1, 'One todo was added')
    t.is(state.todos[0].text, 'new', 'Text was correct')
    t.is(state.todos[0].isComplete, false, 'Complete was initialized to false')
    t.is(state.draftTodo, '', 'Draft todo was deleted')
    t.is(state.currentView, 'todosListView', 'Current view is now todosListView')
    t.end()
})

