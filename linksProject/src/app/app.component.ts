import {Component} from '@angular/core';

import "rxjs/add/observable/of";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/first";
import "rxjs/add/operator/map";
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/do'
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/switchMap';


@Component({
    selector: 'app-root',
    template: `        
        <linksapp-header></linksapp-header>
        <div class="container-fluid mainContainer">
            <router-outlet></router-outlet>
        </div>
        <linksapp-footer></linksapp-footer>
    `,
    styles: []
})
export class AppComponent {}
