import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../model/user';

import { AppService } from '../app.service';

@Component({
    moduleId: module.id,
    selector: 'register',
    templateUrl: 'register.component.html'
})

export class RegisterComponent implements OnInit {
    model: User;
    constructor(private appService: AppService, private router: Router) {
        this.model = {
            username: '',
            password: ''
        }
    }

    ngOnInit() { }

    save() {
        this.appService.createUser(this.model).then(() => {            
             this.router.navigate(['/']);
        });
    }
}