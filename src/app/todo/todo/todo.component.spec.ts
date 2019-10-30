import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoComponent } from './todo.component';
import {TodoFormComponent} from '../todo-form/todo-form.component';
import {TodoListComponent} from '../todo-list/todo-list.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ReactiveFormsModule} from '@angular/forms';
import {TodoService} from '../../services/todo.service';
import {Observable} from 'rxjs';
import {CommonModule} from '@angular/common';
import {TodoRoutingModule} from '../todo-routing.module';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClient} from '@angular/common/http';

describe('TodoComponent', () => {
  let component: TodoComponent;
  let fixture: ComponentFixture<TodoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        CommonModule,
        TodoRoutingModule,
        ReactiveFormsModule,
        BrowserModule
      ],
      declarations: [
        TodoComponent,
        TodoFormComponent,
        TodoListComponent
      ],
      providers: [
        { provide: TodoService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
