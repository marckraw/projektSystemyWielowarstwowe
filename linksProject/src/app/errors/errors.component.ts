import {Component, Input, DoCheck} from '@angular/core';
import {FormControl} from "@angular/forms";

@Component({
    selector: 'linksapp-errors',
    template: `
        <ul *ngIf="subFormControlName.errors != null && isInvalid()">
            <li *ngFor="let error of this.errorArray">{{ this.subFormControlName.errors[error]?.errorMsg }}</li>
        </ul>
    `,
    styles: [`        
        ul {
            font-size: 10px;
            font-style: italic;
            color: red;
            list-style: none;
            padding-left: 0;
        }
    `]
})
export class ErrorsComponent implements DoCheck {
    @Input() subFormControlName: FormControl;
    @Input() submitted: boolean;

    private errorArray: string[] = [];

    isInvalid() {
        return this.subFormControlName.invalid && (this.subFormControlName.touched || this.submitted);
    }

    ngDoCheck() {
        this.errorArray = [];

        if(this.subFormControlName.errors != undefined) {
            this.errorArray = Object.keys(this.subFormControlName.errors);
        }
    }
}
