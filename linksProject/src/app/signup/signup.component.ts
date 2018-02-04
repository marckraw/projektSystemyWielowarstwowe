import {Component} from '@angular/core';
import {UserService} from "../services/user.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {ValidationService} from "../services/validation.service";
import {UserData} from "../models/UserData";
import {Router} from "@angular/router";

@Component({
    selector: 'linksapp-signup',
    template: `
        <div class="row vertical-center">
            <div class="col-xs-10 col-xs-offset-1 registrationContainer">
                <h1>Stwórz konto</h1>
                <div class="registrationForm" [formGroup]="formGroup">
                    <div class="row">
                        <div class="col-xs-6 registrationForm__left">
                            <label for="">Imię:</label>
                            <input type="text" [formControlName]="'first_name'">
                            <linksapp-errors
                                [submitted]="this.submitted"
                                [subFormControlName]="formGroup.controls['first_name']">
                            </linksapp-errors>
                            <label for="">Nazwisko:</label>
                            <input type="text" [formControlName]="'surname'">
                            <linksapp-errors
                                [submitted]="this.submitted"
                                [subFormControlName]="formGroup.controls['surname']">
                            </linksapp-errors>
                            <label for="">Avatar:</label>
                            <input type="text" [formControlName]="'avatar'">
                            <linksapp-errors
                                [submitted]="this.submitted"
                                [subFormControlName]="formGroup.controls['avatar']">
                            </linksapp-errors>
                        </div>
                        <div class="col-xs-6 registrationForm__right">
                            <label for="">Login:</label>
                            <input type="text" [formControlName]="'username'">
                            <linksapp-errors
                                [submitted]="this.submitted"
                                [subFormControlName]="formGroup.controls['username']">
                            </linksapp-errors>
                            <div [formGroup]="formGroup.controls['passwordGroup']">
                                <label for="">Hasło:</label>
                                <input type="password" [formControlName]="'password'">
                                <linksapp-errors
                                    [submitted]="this.submitted"
                                    [subFormControlName]="formGroup.get('passwordGroup.password')">
                                </linksapp-errors>
                                <label for="">Powtórz hasło:</label>
                                <input type="password" [formControlName]="'passwordConfirmation'">
                                <linksapp-errors
                                    [submitted]="this.submitted"
                                    [subFormControlName]="formGroup.get('passwordGroup.passwordConfirmation')">
                                </linksapp-errors>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <pre>
                            Status formularza: {{ formGroup.status }}
                        </pre>
                        <pre>
                            Name: {{ formGroup.controls['first_name'].value }} {{ formGroup.controls['first_name'].status }}
                            Surname: {{ formGroup.controls['surname'].value }}  {{ formGroup.controls['surname'].status }}
                            Avatar: {{ formGroup.controls['avatar'].value }}  {{ formGroup.controls['avatar'].status }}
                            Login: {{ formGroup.controls['username'].value }}  {{ formGroup.controls['username'].status }}
                            Password: {{ formGroup.get('passwordGroup.password').value }}
                            Password Confirmation: {{ formGroup.get('passwordGroup.passwordConfirmation').value }}
                            passgroup valid ?: {{ formGroup.controls['passwordGroup'].status }}
                        </pre>
                    </div>
                    <div class="row">
                        <div class="col-xs-10 registrationButtons">
                            <button [routerLink]="['/login']" class="btn btn-danger cancelButton">Cancel</button>
                            <button class="btn btn-primary submitButton" (click)="sendUserCreationRequest()">Sign Up</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
    styleUrls: ['./signup.component.scss']
})
export class SignUpComponent {

    public formGroup: FormGroup;
    public submitted: boolean = false;

    private userData;

    constructor(
        private userService: UserService,
        private formBuilder: FormBuilder,
        private validationService: ValidationService,
        private router: Router
    ) {
        this.createForm();
    }

    public createForm() {
        this.formGroup = this.formBuilder.group({
            first_name: ['', [
                this.validationService.isRequired(),
                this.validationService.customMaxLength(20)
            ]],
            surname: ['', [
                this.validationService.isRequired(),
                this.validationService.customMaxLength(20)
            ]],
            avatar: ['', [this.validationService.isRequired()]],
            username: ['', [
                this.validationService.isRequired(),
                this.validationService.customMaxLength(20)
            ]],
            passwordGroup: this.formBuilder.group({
                password: ['', [
                    this.validationService.isRequired(),
                    this.validationService.customMinLength(5),
                    this.validationService.customMaxLength(30)
                ]],
                passwordConfirmation: ['', [
                    this.validationService.isRequired(),
                    this.validationService.customMinLength(5),
                    this.validationService.customMaxLength(30)
                ]]
            }, {validator: this.validationService.areEqual()})
        })
    }

    public sendUserCreationRequest() {

        this.submitted = true;

        if(this.formGroup.status === 'VALID') {
            this.userData = this.formGroup.value;
            Object.assign(this.userData, { password: this.formGroup.get('passwordGroup.password').value });
            delete this.userData.passwordGroup;


            this.userService.addUser(this.userData)
                .subscribe( value => {
                    this.router.navigate(['/login']);
                });
        }
    }
}
