import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Todo } from '../models/Todo';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type' : "application/json"
  })
}

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  [x: string]: any;
  todosUrl:string = 'https://jsonplaceholder.typicode.com/todos';
  todosLimit = "?_limit=5";

  constructor(private http:HttpClient) { }

  // Get To dos
  getTodos():Observable<Todo[]> {       // This method will return an object type observable.
    return this.http.get<Todo[]>(`${this.todosUrl}${this.todosLimit}`);
  }

  // Delete Todo
  deleteTodo(todo:Todo):Observable<Todo> {
    const url = `${this.todosUrl}/${todo.id}`;
    return this.http.delete<Todo>(url, httpOptions);
  }

  // Add Todo
  addTodo(todo:Todo):Observable<Todo> {
    return this.http.post<Todo>(this.todosUrl, todo, httpOptions);
  }

  // Toggle Completed
  toggleCompleted(todo: Todo):Observable<any> {   // we will use any because the retur will not be exact as Todo anymore.
    const url = `${this.todosUrl}/${todo.id}`;
    return this.http.put(url, todo, httpOptions); // httpOptions will include the header "Content-Type"
  }

}
