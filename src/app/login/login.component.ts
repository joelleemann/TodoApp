import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { AuthService } from "../services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;
  isFetching = false;

  constructor(private auth: AuthService, private route: Router) {}

  ngOnInit() {}

  onLoginSubmit() {
    this.isFetching = true;
    this.auth.login(this.email, this.password).subscribe(data => {
      this.isFetching = false;
      this.route.navigate(["/"]); // redirect to main route
    });
  }
}
