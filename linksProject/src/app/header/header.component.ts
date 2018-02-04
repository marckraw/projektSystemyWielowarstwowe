import {Component} from '@angular/core';
import {AuthService} from "../services/auth.service";

@Component({
    selector: 'linksapp-header',
    template: `
        <div class="mainMenu">
            <nav>
                <ul>
                    <li>
                        <a
                            *ngIf="!authService.isLoggedIn()"
                            [routerLink]="['/login']" 
                            routerLinkActive="active-link"
                            [routerLinkActiveOptions]="{ exact: true }">Logowanie</a>
                        <a
                            *ngIf="authService.isLoggedIn()"
                            (click)="authService.logOut()"
                            style="cursor: pointer;">Wyloguj</a>
                    </li>
                    <li>
                        <a
                            *ngIf="!authService.isLoggedIn()"
                            [routerLink]="['/rejestracja']" 
                            routerLinkActive="active-link">Rejestracja</a></li>
                    <li>
                        <a
                            *ngIf="authService.isLoggedIn()"
                            [routerLink]="['/profile']" 
                            routerLinkActive="active-link">Profil</a>
                    </li>
                    <li>
                        <a
                            *ngIf="authService.isLoggedIn()"
                            [routerLink]="['/listaLinkow']" 
                            routerLinkActive="active-link">Lista linków</a>
                    </li>
                </ul>
            </nav>
        </div>
    `,
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
    constructor(public authService: AuthService) {}
}
