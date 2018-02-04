import {Injectable} from '@angular/core';
import {LocalStorageService} from "./local-storage.service";
import {Http} from "@angular/http";
import {API_PATH} from "../shared/absolute-paths";
import {LoginData} from "../models/LoginData";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Router} from "@angular/router";
import {ShortUserData} from "../models/ShortUserData";

@Injectable()
export class AuthService {
    private loggedIn: boolean;
    private userData = new BehaviorSubject<ShortUserData>({username: '', user_id: 0});
    private userDataChange = this.userData.asObservable();

    constructor(
        private http: Http,
        private localStorageService: LocalStorageService,
        private router: Router
    ) {
        let getData = this.localStorageService.getData('user_data');
        this.loggedIn = !!getData;
        this.userData.next(JSON.parse(getData));
    }

    logIn(loginData: LoginData) {

        console.log("loguje usera...");


        const headers = new Headers();
        headers.append('Content-Type', 'application/json');


        return this.http
            .post(`${API_PATH}user/login.php`, loginData, headers)
            .map(res => res.json())
            .do( res => {
                if(res !== null) {
                    this.localStorageService.setData(res);
                    this.loggedIn = true;
                    this.userData.next(res);
                }
                console.log(res);
                return res;
            });
    }

    logOut(): void {
        this.localStorageService.removaData('user_data');
        this.userData.next(null);
        this.loggedIn = false;
        this.router.navigate(['/login']);
    }

    isLoggedIn(): boolean {
        return this.loggedIn;
    }

    getLoggedInUser(): ShortUserData {
        return this.userData.getValue();
    }
}
