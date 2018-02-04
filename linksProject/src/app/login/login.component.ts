import {Component} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {AuthService} from "../services/auth.service";
import {ValidationService} from "../services/validation.service";
import {Router} from "@angular/router";

@Component({
    host: {
        '(document:keyup.enter)': 'logUser()'
    },
    selector: 'linksapp-login',
    template: `
        <div class="row vertical-center">
            <div class="col-xs-6 headingContainer">
                <h1 (click)="makeSomething()">Zaloguj się do serwisu</h1>
            </div>
            <div class="col-xs-6 loginContainer">
                <h2>Logowanie</h2>
                <div class="loginForm" [formGroup]="loginFormGroup">
                    <span style="color: red" *ngIf="this.error">Nie prawidłowe dane logowania, spróbuj ponownie</span>
                    <input type="text" [formControlName]="'username'">
                    <input type="password" [formControlName]="'password'">
                    <button class="btn btn-primary submitButton" (click)="logUser()">Login</button>
                </div>
                <div class="registrationLink">
                    <p>otherwise...</p>
                    <p>you can <a [routerLink]="['/rejestracja']">make an account</a></p>
                </div>
            </div>
        </div>
    `,
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {

    public loginFormGroup: FormGroup;

    private error: boolean = false;

    constructor(
        private validationService: ValidationService,
        private formBuilder: FormBuilder,
        private authService: AuthService,
        private router: Router
    ) {
        this.createForm();
    }

    public createForm() {
        this.loginFormGroup = this.formBuilder.group({
            username: ['', [
                this.validationService.isRequired(),
                this.validationService.customMaxLength(20),
            ]],
            password: ['', [
                this.validationService.isRequired(),
                this.validationService.customMaxLength(20)
            ]],
        })
    }

    logUser() {
        this.authService.logIn({
            username: this.loginFormGroup.controls['username'].value,
            password: this.loginFormGroup.controls['password'].value
        })
            .subscribe(
                val => {
                    if(val !== null ) {
                        this.error = false;
                        this.router.navigate(['/profile'])
                    } else {
                        this.error = true;
                    }
                }
            );
    }

    makeSomething() {
        console.log(this.authService.getLoggedInUser());
    }
}
