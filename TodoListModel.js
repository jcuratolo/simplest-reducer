function put(key, value) {
    return ['put', key, value]
}

class TodoListModel {
    constructor(store) {
        this.store = store
        this.todos = store.getState().todos
        this.draftTodo = store.getState().draftTodo
        store.subscribe(() => {
            this.todos = store.getState().todos
            this.draftTodo = store.getState().draftTodo
        })
    }

    makeId() {
        return Math.floor(Date.now() * Math.random())
    }

    addTodo() {
        var newTodo = {id:  this.makeId(), text: this.draftTodo, isComplete: false}
        const actions = [
            ['put', 'todos', this.todos.concat(newTodo)]
            ['put', 'draftTodo', '']
        ]
        
        actions.forEach(a => {
            const [type, key, value] = a
            this.store.dispatch({type, key, value})
        })
    }

    deleteTodo(id) {
        this.store.dispatch({
            type: 'put',
            key: 'todos',
            value: this.todos.filter(t => t.id !== id)
        })
    }

    markAsComplete(id) {
        this.store.dispatch({
            type: 'put',
            key: 'todos',
            value: this.todos.map(t => {
                if (t.id === id) t.isComplete = true
                return t
            })
        })
    }
}