import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {MainProfileComponent} from "./main-profile/main-profile.component";
import {SignUpComponent} from "./signup/signup.component";
import {LinksListComponent} from "./links-list/links-list.component";

const routes: Routes = [
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full',
    }, {
        path: 'login',
        component: LoginComponent,
        children: []
    }, {
      path: 'profile',
      component: MainProfileComponent,
      children: []
    }, {
        path: 'listaLinkow',
        component: LinksListComponent,
        children: []
    }, {
        path: 'rejestracja',
        component: SignUpComponent,
        children: []
    }, {
        path: '**',
        redirectTo: '/login'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
