import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { TodoModel } from '../models/todo-list-api'

@Injectable({
  providedIn: 'root'
})

export class TodoListApiService {

  url = 'http://localhost:3000';

  constructor(private httpClient: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  getTodos(): Observable<TodoModel[]> {
    return this.httpClient.get<TodoModel[]>(this.url + '/findAllTodos')
    .pipe(
      retry(2),
      catchError(this.handleError))
  }

  getTodoById(id: number): Observable<TodoModel> {
    return this.httpClient.get<TodoModel>(this.url + '/findOneTodo/' + id)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  saveTodo(todo: TodoModel): Observable<TodoModel> {
    return this.httpClient.post<TodoModel>(this.url, + '/createTodo' + JSON.stringify(todo), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  updateTodo(todo: TodoModel): Observable<TodoModel> {
    return this.httpClient.put<TodoModel>(this.url + '/updateTodo/' + todo.id, JSON.stringify(todo), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  deleteTodo(todo: TodoModel) {
    return this.httpClient.delete<TodoModel>(this.url + '/deletedTodo/' + todo.id, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error code: ${error.status}, ` + `Menssage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(() => new Error(errorMessage));
  };
}
