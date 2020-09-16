import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Todo } from '../models/todo.model';
import { TodoService } from '../services/todo.service';
import { tap } from 'rxjs/operators';
import { AddTodo, DeleteTodo, GetTodos, SetSelectedTodo, UpdateTodo } from '../actions/todo.action';

export class TodoStateModel {
    todos: Todo[];
    selectedTodo: Todo;
}

@State({
    name: 'todos',
    defaults: {
        todos: [],
        selectedTodo: null
    }
})

@Injectable()
export class TodoState {
    constructor(private todoService: TodoService) {}

    @Selector()
    static getTodoList(state: TodoStateModel) {
        return state.todos;
    }

    @Selector()
    static getSelectedTodo(state: TodoStateModel) {
        return state.selectedTodo;
    }

    @Action(GetTodos)
    getTodos(ctx: StateContext<TodoStateModel>) {
        return this.todoService.getTodos().pipe(
            tap((result) => {
                const state = ctx.getState();
                ctx.setState({
                    ...state,
                    todos: result
                })
            })
        )
    }

    @Action(AddTodo)
    addTodo(ctx: StateContext<TodoStateModel>, {payload}: AddTodo) {
        return this.todoService.addTodo(payload).pipe(
            tap((result) => {
                const state = ctx.getState();
                ctx.patchState({
                    todos: [...state.todos, result]
                })
            })
        )
    }
    
    @Action(UpdateTodo) 
    updateTodo(ctx: StateContext<TodoStateModel>, {id, payload}: UpdateTodo) {
        return this.todoService.updateTodo(id, payload).pipe(
            tap((result) => {
                const state = ctx.getState();
                const todoList = [...state.todos];
                const todoIndex = todoList.findIndex(item => item.id === id);
                todoList[todoIndex] = result;
                ctx.setState({
                    ...state,
                    todos: todoList
                })
            })
        )
    }

    @Action(DeleteTodo) 
    deleteTodo(ctx: StateContext<TodoStateModel>, {id}: DeleteTodo) {
        return this.todoService.deleteTodo(id).pipe(
            tap(() => {
                const state = ctx.getState();
                const filteredTodos = state.todos.filter(item => item.id !== id);
                ctx.setState({
                    ...state,
                    todos: filteredTodos
                })
            })
        )
    }
    
    @Action(SetSelectedTodo) 
    setSelectedTodo(ctx: StateContext<TodoStateModel>, {payload}: SetSelectedTodo) {
        const state = ctx.getState();
        ctx.setState({
            ...state,
            selectedTodo: payload
        })
    }
}