import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { Todo } from 'src/app/models/Todo';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {
  @Input() todo: Todo = new Todo;
  @Output() deleteTodo: EventEmitter<Todo> = new EventEmitter();

  constructor(private todoService:TodoService) { }

  ngOnInit(): void {
  }

  //Set Dynamic Classes
  setClasses() {
    let classes = {
      todo: true,
      'is-complete': this.todo.completed
    }
    return classes;
  }

  onToggle(todo : any) {
    // Toggle in UI
    this.todo.completed = !this.todo.completed;
    // Toggel on server
    this.todoService.toggleCompleted(todo).subscribe(todo => 
      console.log(todo));

  }

  onDelete(todo : any) {              // This method catches the click event from the todo-item-component ui
    this.deleteTodo.emit(this.todo);  // Then this emits an event deleteTodo
  }
}
