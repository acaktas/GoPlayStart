import { Component, OnInit } from '@angular/core';

import { User } from '../model/user';

import { AppService } from '../app.service';

@Component({
    moduleId: module.id,
    selector: 'register',
    templateUrl: 'register.component.html'
})

export class RegisterComponent implements OnInit {
    model: User;
    constructor(private appService: AppService) {
        this.model = {
            username: '',
            password: ''
        }
    }

    ngOnInit() { }

    save() {
        this.appService.createUser(this.model);
    }
}