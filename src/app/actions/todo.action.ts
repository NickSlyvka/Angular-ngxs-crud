import { Todo } from '../models/todo.model';

export class GetTodos {
    static readonly type = '[Todo] Get';
}

export class AddTodo {
    static readonly type = '[Todo] Add';

    constructor(public payload: Todo) {}
}

export class UpdateTodo {
    static readonly type = '[Todo] Update';
    
    constructor(public id: number, public payload: Todo) {}
}


export class DeleteTodo {
    static readonly type = '[Todo] Delete'

    constructor(public id: number) {}
}

export class SetSelectedTodo {
    static readonly type = '[Todo] Set'

    constructor(public payload: Todo) {}
}

