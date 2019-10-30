import {inject, TestBed, getTestBed} from '@angular/core/testing';

import { TodoService } from './todo.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

const todos = [
  {
    id: 0,
    priority: 1,
    value: 'Clean house',
    date: null,
    completed: false
  },
  {
    id: 2,
    priority: '2',
    value: 'Pet cat',
    date: null,
    completed: false
  }
];

describe('TodoService', () => {
  let injector: TestBed;
  let service: TodoService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TodoService]
    });
    injector = getTestBed();
    service = injector.get(TodoService);
    httpMock = injector.get(HttpTestingController);
  });


  describe('#getTodos', () => {
    it('should return an Observable<Todo[]>', () => {
      service.getTodos().subscribe((data) => {
        expect(data.length).toBe(2);
        expect(data[0].id).toEqual(0);
        expect(data[0].value).toBe('Clean house');
      });

      // We set the expectations for the HttpClient mock
      const req = httpMock.expectOne(`${service.API_URL}/todo.json`);
      expect(req.request.method).toEqual('GET');
      // Then we set the fake data to be returned by the mock
      req.flush(todos);
    });
  });

  // make sure there are no outstanding requests after each test
  afterEach(() => {
    httpMock.verify();
  });
});
