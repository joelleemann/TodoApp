import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {TodoService} from '../../services/todo.service';
import {Todo} from '../../models/todo';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss']
})
export class TodoFormComponent implements OnInit {
  value = new FormControl('');
  priority = new FormControl(1);
  priorityOptions = [1, 2, 3, 4, 5, 6, 7, 8];
  todoForm: FormGroup;
  selectedTodo: Observable<Todo>;
  selectedTodoId: number;

  constructor(private formBuilder: FormBuilder, private todoService: TodoService) {
    this.todoForm = this.formBuilder.group({
      value: '',
      priority: ''
    });
  }

  ngOnInit() {
    this.todoService.selected.subscribe((item: Todo) => {
      if (!item) {
        return;
      }
      this.selectedTodoId = item.id;
      this.todoForm.patchValue(item);
    }); // subscribe to entire collection
  }

  onSubmit(todo) {
    if (this.selectedTodoId) {
      todo.id = this.selectedTodoId;
      this.todoService.put(todo as Todo);
    } else {
      this.todoService.add(todo as Todo);
    }
    this.todoForm.reset();
  }

}
