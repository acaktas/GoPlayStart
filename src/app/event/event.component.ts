import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';

import 'rxjs/add/operator/switchMap';

import { AppService } from '../app.service';

import { User } from '../model/user';
import { Event } from '../model/event';

@Component({
    moduleId: module.id,
    templateUrl: 'event.component.html'
})
export class EventComponent implements OnInit {
    private currentUser: string;
    model: any;
    private newEvent: Event;
    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private parserFormatter: NgbDateParserFormatter,
        private appService: AppService)
    { }

    ngOnInit() {
        this.currentUser = localStorage.getItem('username');
        this.model = {
            id: 0,
            modifiedBy: this.currentUser,
            name: '',
            startDate: {
                'year': new Date().getFullYear(),
                'month': new Date().getMonth() + 1,
                'day': new Date().getDate()
            },
            requiredUsers: 0
        };

        this.route.params
            .switchMap((params: Params) => this.appService.getEventById(+params['id']))
            .subscribe(newEvent => {
                if (newEvent != null) {
                    this.newEvent = newEvent;
                    this.model = {
                        id: this.newEvent.id,
                        modifiedBy: this.newEvent.modifiedBy,
                        name: this.newEvent.name,
                        startDate: {
                            'year': this.newEvent.startDate.getFullYear(),
                            'month': this.newEvent.startDate.getMonth() + 1,
                            'day': this.newEvent.startDate.getDate()
                        },
                        requiredUsers: this.newEvent.requiredUsers
                    };
                }
            });
    }

    onSubmit() {
        this.newEvent.name = this.model.name;
        this.newEvent.requiredUsers = this.model.requiredUsers;
        this.newEvent.startDate = new Date(this.parserFormatter.format(this.model.startDate));
        if (this.newEvent.id != 0) {
            this.appService.updateEvent(this.newEvent).subscribe(
                data => {
                    this.router.navigate(['dashboard', 'events', 'all']);
                }
            )
        }
        else {
            this.appService.createEvent(this.newEvent).subscribe(
                data => {
                    this.router.navigate(['dashboard', 'events', 'all']);
                }
            )
        }
    }
}