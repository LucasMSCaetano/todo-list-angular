import { Component, OnInit } from '@angular/core';
import { Todo } from './Todo';
import { TodoListApiService} from './services/todo-list-api.service'
import { TodoModel } from './models/todo-list-api'
import { NgForm} from '@angular/forms'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

  todo = {} as TodoModel;
  todos: TodoModel[];

  constructor(private todoService: TodoListApiService) {}

  ngOnInit() {
    this.getTodos();
  }

  saveTodo(form: NgForm) {

    if (this.todo.id !== undefined) {
      this.todoService.updateTodo(this.todo).subscribe(() => {
        this.cleanForm(form);
      });
    } else {
      this.todoService.saveTodo(this.todo).subscribe(() => {
        this.cleanForm(form);
      });
    }
  }

  getTodos() {
    this.todoService.getTodos().subscribe((todo: TodoModel[]) => {
      this.todos = todo;
    });
  }

  deleteTodo(todo: TodoModel) {
    this.todoService.deleteTodo(todo).subscribe(() => {
      this.getTodos();
    });
  }

  editTodo(todo: TodoModel) {
    this.todo = { ...todo };
  }

  cleanForm(form: NgForm) {
    this.getTodos();
    form.resetForm();
    this.todo = {} as TodoModel;
  }
}
