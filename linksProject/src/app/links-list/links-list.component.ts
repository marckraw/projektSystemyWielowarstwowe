import {Component} from '@angular/core';
import {LinksService} from "../services/links.service";
import {LinkData} from "../models/LinkData";
import {Observable} from "rxjs/Observable";

@Component({
    selector: 'linksapp-links-list',
    template: `
        <div class="row vertical-center">
            <div class="col-xs-12">
                <div class="links-list__header">
                    <h1>Lista Linków</h1>
                    <button class="btn btn-primary submitButton" (click)="toggleModal()">Dodaj link</button>
                </div>
                <div class="links-list__content">
                    <div class="links-list__item" *ngFor="let link of linksList | async">
                        {{ link.date }}
                        <h3><a href="{{ link.address }}" target="_blank">{{ link.address }}</a></h3>
                        <p>{{ link.description }}</p>
                        <button class="btn btn-danger removeButton" (click)="this.linksService.removeItem(link).subscribe()">Usuń</button>
                        {{ link.link_id }}
                    </div>
                </div>
            </div>
            <linksapp-modal-create 
                *ngIf="createModalIsVisible"
                [createModalIsVisible]="createModalIsVisible"
                (hideModal)="toggleModal($event)">
            </linksapp-modal-create>
        </div>
    `,
    styleUrls: ['./links-list.component.scss']
})
export class LinksListComponent {

    public linksList: Observable<LinkData[]>;
    public createModalIsVisible: boolean;


    constructor(private linksService: LinksService) {
        this.createModalIsVisible = false;

        this.linksList = this.linksService.getItems();

        this.linksList
            .subscribe(
                value => console.log(value)
            )

        // this.linksService.showLinks()
        //     .subscribe( value => {
        //         this.linksList = value;
        //         console.log(this.linksList);
        //     });
    }

    toggleModal(): void {
        this.createModalIsVisible = !this.createModalIsVisible;
    }

}
