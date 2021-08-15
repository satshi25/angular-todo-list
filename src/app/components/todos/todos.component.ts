import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import {Todo} from '../../models/Todo';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {
  todos!: Todo[];
  constructor(private todoService:TodoService) { }

  ngOnInit()  {
    this.todoService.getTodos().subscribe( todos => {
      this.todos = todos;
    });
  }

  deleteTodo(todo:Todo) {         // Catches the emitted deleteTodo Event from todo-item-components
    // Remove from UI
    this.todos = this.todos.filter(t => t.id !== todo.id);    // Delete from the UI... with filter it will loop with all of the todos and set a condition
                                                              // for each todo where t.id is not all equal to todo.id
    // Remove from server
    this.todoService.deleteTodo(todo).subscribe();
  }

  addTodo(todo:Todo) {
    this.todoService.addTodo(todo).subscribe(todo => {
      this.todos.push(todo);
    })
  }
}