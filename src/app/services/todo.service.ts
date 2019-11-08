import { Injectable } from "@angular/core";
import { Todo } from "../models/todo";
import { BehaviorSubject, Observable } from "rxjs";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { map } from "rxjs/operators";
import { environment } from "../../environments/environment";
@Injectable({
  providedIn: "root"
})
export class TodoService {
  API_URL = "https://todoapp-8d35f.firebaseio.com";
  private todoItems = new BehaviorSubject<Todo[]>([]);
  private dataStore: { todos: Todo[] } = { todos: [] };
  readonly todos = this.todoItems.asObservable();
  private selectedTodo = new BehaviorSubject<Todo>(null);
  readonly selected = this.selectedTodo.asObservable();
  public items: Observable<Todo[]>;

  constructor(private http: HttpClient) {}

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(environment.api_url + "/todo").pipe(
      map((response: any) => {
        if (response === null) {
          return [];
        }
        return response.data.map(item => item as Todo);
      })
    );
  }

  add(todo: Todo) {
    return this.http.post(environment.api_url + "/todo", todo).pipe(
      map(response => {
        console.log(response);
        this.dataStore.todos.push(response.data as Todo);
        this.todoItems.next(Object.assign({}, this.dataStore).todos);
      })
    );
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
    this.dataStore.todos = this.dataStore.todos.filter(
      (item: Todo) => todo.value !== item.value
    );
    this.save();
  }

  edit(todo: Todo) {
    this.selectedTodo.next(Object.assign({}, todo));
  }
}
