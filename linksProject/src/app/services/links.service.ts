import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {LinkData} from "../models/LinkData";
import {API_PATH} from "../shared/absolute-paths";
import {Http} from "@angular/http";
import {LocalStorageService} from "./local-storage.service";
import {BehaviorSubject} from "rxjs/BehaviorSubject";

@Injectable()
export class LinksService {

    private linksListSubject: BehaviorSubject<LinkData[]> = new BehaviorSubject([]);
    private linksList: LinkData[] = [];

    constructor(
        private http: Http,
        private localStorageService: LocalStorageService
    ) {
        this.linksListSubject.subscribe( (item: LinkData[]) => this.linksList = item);
    }

    getItems(): Observable<any> {
        this.addLinksToObservable();
        return this.linksListSubject.asObservable();
    }

    removeItem(item: LinkData): Observable<any> {
        const currentItems = [...this.linksList];
        const itemsWithoutRemoved = currentItems
            .filter( _ => _.link_id !== item.link_id);

        this.linksListSubject.next(itemsWithoutRemoved);

        const headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return this.http
            .get(`${API_PATH}links/delete.php?id=${item.link_id}`, headers)
            .map(res => res.json())
    }


    addLink(linkData: any): Observable<any> {
        this.linksListSubject.next([...this.linksList, linkData]);

        const headers = new Headers();
        headers.append('Content-Type', 'application/json');

        const userId = JSON.parse(this.localStorageService.getData('user_data')).user_id;
        const preparedLinkData = {...linkData, userId};

        return this.http
            .post(`${API_PATH}links/create.php`, preparedLinkData, headers)
            .map(res => res.json());
    }

    addLinksToObservable() {
        this.showLinks()
            .subscribe( value => this.linksListSubject.next(value))
    }

    showLinks(): Observable<any> {
        const headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');

        const userId = JSON.parse(this.localStorageService.getData('user_data')).user_id;
        // const preparedLinkData = {...linkData, userId};


        return this.http
            .get(`${API_PATH}links/show.php?id=${userId}`, headers)
            .map(res => res.json());
    }

    removeLink() {
        console.log("removing link...")
    }
}
