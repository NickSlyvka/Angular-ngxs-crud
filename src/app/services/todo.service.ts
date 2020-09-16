import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from '../models/todo.model';

@Injectable({
    providedIn: 'root'
})

export class TodoService {
    constructor(private http: HttpClient) {}

    getTodos() {
        return this.http.get<Todo[]>('https://jsonplaceholder.typicode.com/todos');
    }

    addTodo(payload: Todo) {
        return this.http.post<Todo>('https://jsonplaceholder.typicode.com/todos', payload);
    }

    updateTodo(id: number, payload: Todo) {
        return this.http.put<Todo>('https://jsonplaceholder.typicode.com/todos/' + id, payload);
    }

    deleteTodo(id: number) {
        return this.http.delete('https://jsonplaceholder.typicode.com/todos/' + id);
    }
}