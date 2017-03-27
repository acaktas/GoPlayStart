import { Component, OnInit } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'register',
    templateUrl: 'register.component.html'
})

export class RegisterComponent implements OnInit {
    username: string;
    password: string;
    confirmPassword: string;
    constructor() { }

    ngOnInit() { }

    save() { 
        debugger;
    }
}