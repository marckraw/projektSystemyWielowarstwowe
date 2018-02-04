import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpModule} from '@angular/http';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {LoginComponent} from './login/login.component';
import {SignUpComponent} from './signup/signup.component';
import {MainProfileComponent} from './main-profile/main-profile.component';
import {LinksListComponent} from './links-list/links-list.component';
import {UserService} from "./services/user.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { ErrorsComponent } from './errors/errors.component';
import {ValidationService} from "./services/validation.service";
import {AuthService} from "./services/auth.service";
import {LocalStorageService} from "./services/local-storage.service";
import {LinksService} from "./services/links.service";
import { ModalCreateComponent } from './modal-create/modal-create.component';
import { ModalDeleteComponent } from './modal-delete/modal-delete.component';
import { ModalEditComponent } from './modal-edit/modal-edit.component';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        FooterComponent,
        LoginComponent,
        SignUpComponent,
        MainProfileComponent,
        LinksListComponent,
        ErrorsComponent,
        ModalCreateComponent,
        ModalDeleteComponent,
        ModalEditComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpModule,
        FormsModule,
        ReactiveFormsModule
    ],
    providers: [
        UserService, ValidationService, AuthService, LocalStorageService, LinksService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
