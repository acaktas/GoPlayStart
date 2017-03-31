import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/user'

import { AppService } from '../app.service';

@Component({
    moduleId: module.id,
    selector: 'login',
    templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {
    model: any = {};
    constructor(
        private appService: AppService,
        private router: Router) { }

    ngOnInit() { }

    login(){
        this.appService.login(this.model.username, this.model.password).then(
            data => {
                this.router.navigate(['/dashboard/events/all']);
        }
        ).catch(error=>{
            alert(error._body);
        });        
    }
}