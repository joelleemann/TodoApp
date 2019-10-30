import {Component, OnInit} from '@angular/core';
import {TodoService} from '../../services/todo.service';
import {Todo} from '../../models/todo';
import {Observable, Subscription} from 'rxjs';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  todos: Todo[];
  subscription: Subscription;

  constructor(private todoService: TodoService) { }

  ngOnInit() {
    this.subscription = this.todoService.getTodos().subscribe((data) => {
      this.todos = data;
    });
  }

  onDelete(todo) {
    this.todoService.remove(todo);
  }

  onEdit(todo) {
    this.todoService.edit(todo);
  }
}
