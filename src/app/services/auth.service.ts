import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { AuthResponse } from "../models/auth-response";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  public accessToken: string;

  constructor(private http: HttpClient) {}

  login(email, password): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${environment.api_url}/login`, {
        email,
        password
      })
      .pipe(
        map((response: any) => {
          this.accessToken = response.access_token;
          localStorage.setItem("access_token", this.accessToken);
          return response as AuthResponse;
        })
      );
  }

  getToken(): string {
    if (!this.accessToken) {
      this.accessToken = localStorage.getItem("access_token");
    }

    return this.accessToken;
  }
}
