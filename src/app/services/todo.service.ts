import { Injectable } from '@angular/core';
import {Todo} from '../models/todo';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  API_URL = 'https://todoapp-8d35f.firebaseio.com';
  private todoItems = new BehaviorSubject<Todo[]>([]);
  private dataStore: { todos: Todo[] } = { todos: [] };
  readonly todos = this.todoItems.asObservable();
  private selectedTodo = new BehaviorSubject<Todo>(null);
  readonly selected = this.selectedTodo.asObservable();
  public items: Observable<Todo[]>;

  constructor(private http: HttpClient) {
  }

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.API_URL + '/todo.json')
      .pipe(map((response: any) => {
        if (response === null) {
          return [];
        }
        return response.map((item) => item as Todo);
      }));
  }

  add(todo: Todo) {
    todo.id = todo.id ? todo.id : Math.round((Math.random() * 5));
    this.dataStore.todos.push(todo);
    this.save();
  }

  put(todo: Todo) {
    this.dataStore.todos = this.dataStore.todos.map((item: Todo) => {
      if (item.id === todo.id) {
        item = todo;
      }
      return item;
    });
    this.save();
  }

  remove(todo: Todo) {
    this.dataStore.todos = this.dataStore.todos.filter((item: Todo) => todo.value !== item.value);
    this.save();
  }

  edit(todo: Todo) {
    this.selectedTodo.next(Object.assign({}, todo));
  }

  private save() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        // 'Authorization': 'my-auth-token'
      })
    };
    const subscription = this.http.put(this.API_URL + '/todos.json', this.dataStore.todos, httpOptions)
      .subscribe(response => {
        console.log(response);
        localStorage.setItem('todoItems', JSON.stringify(this.dataStore.todos));
        this.todoItems.next(Object.assign({}, this.dataStore).todos);
        subscription.unsubscribe();
      });
  }
}
