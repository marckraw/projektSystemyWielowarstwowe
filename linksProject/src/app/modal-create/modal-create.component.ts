import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {LinksService} from "../services/links.service";

@Component({
    selector: 'linksapp-modal-create',
    template: `
        <div class="content" [formGroup]="createLinkForm">
            <h1>Add link</h1>
            <div class="row">
                <div class='col-12'>
                    <div class='form-group link-url'>
                        <label>
                            <span>Link url</span>
                            <input
                                class='form-control'
                                name='url'
                                type='text'
                                [formControlName]="'url'"
                            >
                        </label>
                    </div>
                    <div class='form-group'>
                        <label>
                            <span>Desctiption (textarea)</span>
                            <textarea
                                class='form-control'
                                name='description'
                                [formControlName]="'description'"
                            ></textarea>
                        </label>
                    </div>
                    <div class='form-group'>
                        <label>
                            <span>Date</span>
                            <input
                                class='form-control'
                                name='date'
                                type='text'
                                [formControlName]="'date'"
                            >
                        </label>
                    </div>
                </div>
            </div>
            <div class="row links-modal-footer">
                <div class="col-12">
                    <div class="buttons">
                        <button class="btn btn-danger cancelButton" (click)="toggleModal()">Cancel</button>
                        <button class="btn btn-primary submitButton" (click)="addLink()">Add Link</button>
                    </div>
                </div>
            </div>
        </div>
    `,
    styleUrls: ['./modal-create.component.scss']
})
export class ModalCreateComponent {

    @Input() createModalIsVisible: boolean;
    @Output() hideModal = new EventEmitter<boolean>();

    createLinkForm: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private linksService: LinksService
    ) {
        this.createForm();

        let date = new Date().toISOString().slice(0, 19).replace('T', ' ');
        this.createLinkForm.controls.date.setValue(date);
    }


    toggleModal() {
        this.hideModal.emit(false);
    }

    addLink() {
        this.linksService.addLink({
            address: this.createLinkForm.controls.url.value,
            date: this.createLinkForm.controls.date.value,
            description: this.createLinkForm.controls.description.value
        })
            .subscribe( value => console.log(value));
        this.toggleModal();
    }

    makeRequest() {

    }


    createForm() {
        this.createLinkForm = this.formBuilder.group({
            url: [''],
            description: [''],
            date: ['']
        })
    }
}
