import {Injectable} from '@angular/core';

import {ValidatorFn, AsyncValidatorFn, AbstractControl, ValidationErrors, FormGroup, Validators} from '@angular/forms';

import {ReplaySubject} from "rxjs/ReplaySubject";
import {Observable} from "rxjs/Observable";

import {UserService} from '../services/user.service';
import {ErrorMsgs} from "../models/error-msgs";


@Injectable()
export class ValidationService {

    constructor(private userService: UserService) { }

    getValidationErrorMessage(validatorName: string, validatorValue?: any): string {
        const msgs: ErrorMsgs = {
            'required': 'Pole jest wymagane',
            'maxlength': `Maximum length is ${validatorValue}`,
            'minlength': `Minimum length is ${validatorValue}`,
            'doesUsernameExists': 'Login istnieje',
            'isUsernameValid': 'Wprowadź prawidłowy login. Tylko litery, numery i @/./+/-/_',
            'isAlpha': 'To pole może przyjmować tylko litery',
            'areEqual': 'Pola nie są identyczne',
            'isEmpty': 'U didn\'t provide any value',
        };

        return msgs[validatorName];
    }

    isRequired(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const defaultValidator = Validators.required(control);

            if(defaultValidator != null) {
                return {
                    'isRequired': {
                        'actualValue': control.value,
                        'errorMsg': this.getValidationErrorMessage('required')
                    }
                }
            } else {
                return null
            }
        }
    }

    customMaxLength(length: number): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            let defaultValidator = Validators.maxLength(length)(control);

            if(defaultValidator != null) {
                return {
                    'customMaxLength': {
                        'actualValue': control.value,
                        'errorMsg': this.getValidationErrorMessage('maxlength', length)
                    }
                }
            } else {
                return null;
            }
        }
    }

    customMinLength(length: number): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            let defaultValidator = Validators.minLength(length)(control);

            if(defaultValidator != null) {
                return {
                    'customMinLength': {
                        'actualValue': control.value,
                        'errorMsg': this.getValidationErrorMessage('minlength', length)
                    }
                }
            } else {
                return null;
            }
        }
    }

    doesUsernameExists(): AsyncValidatorFn {
        const $inputSubject = new ReplaySubject<string>();

        const $outputObservable = $inputSubject
            .debounceTime(500)
            .switchMap((value: string) => this.userService.tryUsername(value)
                .map( () => {
                    return {
                        'doesUsernameExists': {
                            'actualValue': value,
                            'errorMsg': this.getValidationErrorMessage('doesLoginExists')
                        }
                    }
                })
                .catch( () => Observable.of(null))
            )
            .share()
            .first();

        return (control: AbstractControl): Observable<ValidationErrors|null> => {
            $inputSubject.next(control.value);

            return $outputObservable
        }
    };

    isUsernameValid(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const regex = /^[\w.@+-]+$/;
            return !regex.test(control.value) ?
                {
                    'isUsernameValid': {
                        'actualValue': control.value,
                        'errorMsg': this.getValidationErrorMessage('isUsernameValid')
                    }
                } : null;
        }
    }

    areEqual(): ValidatorFn {
        return (group: FormGroup): ValidationErrors | null => {
            const areEqual = Object.entries(group.value)
                .map( (value) => value[1] )
                .reduce( (acc: boolean, actualValue: string, index: number, array: string[]) => {
                    acc = actualValue === array[index-1];
                    return acc;
                } ,false);

            return areEqual ?
                null :
                {
                    'areEqual': {
                        'equal': false,
                        'errorMsg': this.getValidationErrorMessage('areEqual')
                    }
                };
        };
    }

    isAlpha(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const regex = /^[a-z]{1}[a-z| ]+$/i;
            return !regex.test(control.value) ?
                {
                    'isAlpha': {
                        'actualValue': control.value,
                        'errorMsg': this.getValidationErrorMessage('isAlpha')
                    }
                } : null;
        };
    }
}
