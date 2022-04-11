import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent  implements OnInit {

  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';

  constructor(private authService: AuthService, 
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,) { 

  
        // redirect to home if already logged in
        if (this.authService.isLoggedIn) { 
          this.router.navigate(['/']);
      }

      this.authService.currentUser.subscribe(user => console.log('user connected ->', user));
    }

    public hasError = (controlName: string, errorName: string) =>{
      return this.loginForm.controls[controlName].hasError(errorName);
    }
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
  });

  }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

  onSubmit(){
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
        return;
    }
    
    this.loading = true;
    this.authService.login(this.f.username.value, this.f.password.value)
        .pipe(first())
        .subscribe(
            data => {
                this.router.navigate(['/']);
            },
            error => {
                this.error = error.error.message;
                this.loading = false;
            });
}
      
}

