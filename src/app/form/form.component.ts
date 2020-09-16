import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { AddTodo, SetSelectedTodo, UpdateTodo } from '../actions/todo.action';
import { Todo } from '../models/todo.model';
import { TodoState } from '../states/todo.state';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit, OnDestroy {

  @Select(TodoState.getSelectedTodo) selectedTodo: Observable<Todo>;
  todoForm: FormGroup;
  editTodo = false;
  private formSubscription: Subscription = new Subscription();

  constructor(private store: Store, private fb: FormBuilder) {
    this.createForm();
  }

  ngOnInit(): void {
    this.formSubscription.add(
      this.selectedTodo.subscribe(todo => {
        if (todo) {
          this.todoForm.patchValue({
            id: todo.id,
            userId: todo.userId,
            title: todo.title
          });
          this.editTodo = true;
        } else {
          this.editTodo = false;
        }
      })
    )
  }

  createForm() {
    this.todoForm = this.fb.group({
        id: [''],
        userId: ['', Validators.required],
        title: ['', Validators.required]
    });
}

  onSubmit() {
    if(this.editTodo) {
      this.formSubscription.add(
        this.store.dispatch(new UpdateTodo(this.todoForm.value.id, this.todoForm.value))
        .subscribe(() => {
          this.clearForm();
        })
      )
    } else {
      this.formSubscription.add(
        this.formSubscription = this.store.dispatch(new AddTodo(this.todoForm.value))
        .subscribe(() => {
          this.clearForm();
        })
      )
    }
  }

  clearForm() {
    this.store.dispatch(new SetSelectedTodo(null));
    this.todoForm.reset();
  }

  ngOnDestroy(): void {
    this.formSubscription.unsubscribe();
  }

}
