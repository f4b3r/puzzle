import { StringMapWithRename } from '@angular/compiler/src/compiler_facade_interface';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterService } from 'src/app/_services/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm :FormGroup;
  constructor(  private formBuilder: FormBuilder,
    private registerService: RegisterService) { }
  Roles: any = ['Admin', 'Author', 'Reader'];

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', Validators.required]
  })
  }

  public hasError = (controlName: string, errorName: string) =>{
    return this.registerForm.controls[controlName].hasError(errorName);
  }
  result:string;
  error:string;

  get f() { return this.registerForm.controls; }
  onSubmit(){
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    this.registerService.registerUser(this.f.username.value,
      this.f.password.value,this.f.email.value).subscribe(
        user => {
          this.result = 'User registered'
          console.log('user registered', user)
        },
        error => {
          this.error = error.error.message;
          console.error(error)
        }
      )

  }
}
