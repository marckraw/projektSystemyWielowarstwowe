import {Component, OnInit} from '@angular/core';
import {UserService} from "../services/user.service";
import {AuthService} from "../services/auth.service";
import {UserData} from "../models/UserData";

@Component({
    selector: 'linksapp-main-profile',
    template: `
        <div class="row vertical-center">
            <div class="col-xs-12">
                <h1>Dane użytkownika</h1>
                <h3>Imie: <strong>{{ this.userData?.first_name }}</strong></h3>
                <h3>Nazwisko: <strong>{{ this.userData?.surname }}</strong></h3>
                <h3>Login: <strong>{{ this.userData?.username }}</strong></h3>
            </div>
        </div>
    `,
    styleUrls: ['./main-profile.component.scss']
})
export class MainProfileComponent implements OnInit {

    userData: UserData;

    constructor(
        private userService: UserService,
        private authService: AuthService
    ) {}

    ngOnInit() {
        // console.log(this.authService.getLoggedInUser().user_id);
        this.userService.getUserData(this.authService.getLoggedInUser().user_id)
            .subscribe(val => this.userData = val );
    }
}
