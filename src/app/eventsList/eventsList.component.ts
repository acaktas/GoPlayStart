import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params, NavigationStart, NavigationEnd, NavigationError, NavigationCancel, RoutesRecognized } from '@angular/router';

import { AppService } from '../app.service';

import { Event } from '../model/event';
import { User } from '../model/user';

import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngbd-modal-content',
  templateUrl: './app/event/delete.modal.component.html'
})
export class NgbdModalContent {
  @Input() name: any;

  constructor(public activeModal: NgbActiveModal) {}
}

@Component({
    moduleId: module.id,
    templateUrl: 'eventsList.component.html'
})
export class EventsListComponent implements OnInit, OnDestroy {
    @Input() name: any;
    model: Event[] = [];
    currentUser: string;
    view: string;
    private sub: any;
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private appService: AppService,
        private modalService: NgbModal
    ) { }

    ngOnInit() {
        this.currentUser = localStorage.getItem('username');

        this.sub = this.route.params.subscribe(params => {
            this.view = params['view'];
            if (this.view === "my") {
                this.appService.getMyEvents().subscribe(
                    data => {
                        this.model = data;
                    }
                )
            }
            else if (this.view === "going") {
                this.appService.getSubscribedEvents().subscribe(
                    data => {
                        this.model = data;
                    }
                )
            }
            else if (this.view === "all") {
                this.appService.getAllEvents().subscribe(
                    data => {
                        this.model = data;
                    }
                )
            }
        });
    }

    edit(id: number) {
        this.router.navigate(['dashboard', 'event', id]);
    }

    delete(id: Event) {
        const modalRef = this.modalService.open(NgbdModalContent);
        modalRef.componentInstance.event = 'event';
    }

    subscribe(id: number) {
        this.appService.subscribeToEvent(id);
    }

    unsubscribe(id: number) {
        this.appService.unsubscribeToEvent(id);
    }

    ngOnDestroy() {
        //don't need to unsubscribe from the route params Observable.
        this.sub.unsubscribe();
    }
}