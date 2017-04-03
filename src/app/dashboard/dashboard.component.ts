import { Component, OnInit } from '@angular/core';
import { User } from '../model/user'
import { Router } from '@angular/router';
import { AppService } from '../app.service';

@Component({
    moduleId: module.id,
    templateUrl: 'dashboard.component.html'
})
export class DashboardComponent implements OnInit {
    currentUser: string;    
    constructor(private appService: AppService, private router: Router) { }

    ngOnInit() { 
        this.currentUser = localStorage.getItem('username');
    }

    logout(){
        this.appService.onLogout();
        this.router.navigate(['/']);
    }
}