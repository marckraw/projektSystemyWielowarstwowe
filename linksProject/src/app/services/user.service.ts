import {Injectable} from '@angular/core';
import {Http} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {UserData} from "../models/UserData";
import {API_PATH} from "../shared/absolute-paths";


@Injectable()
export class UserService {


    constructor(private http: Http) {}

    public addUser(userData: UserData): Observable<any> {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');


        return this.http
            .post(`${API_PATH}user/create.php`, userData, headers)
            .map(res => res.json());
    }

    public getUserData(id: number) {
        const headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');


        return this.http
            .get(`${API_PATH}user/show/user.php?id=${id}`, headers)
            .map(res => res.json());
    }

    public tryUsername(username: string) {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');


        return this.http
            .post(`${API_PATH}user/username.php`, username, headers)
            .map(res => res.json());
    }

    public getRequest(): Observable<any> {
        const headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');


        return this.http
            .get(`${API_PATH}user/create.php`, headers)
            .map(res => res.json());
    }

    public makeTestRequest2(): Observable<any> {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return this.http
            .get('/assets/api/sample.json', headers)
            .map(res => res.json());
    }

}
