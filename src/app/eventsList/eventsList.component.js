"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var app_service_1 = require("../app.service");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var NgbdModalContent = (function () {
    function NgbdModalContent(activeModal) {
        this.activeModal = activeModal;
    }
    return NgbdModalContent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], NgbdModalContent.prototype, "name", void 0);
NgbdModalContent = __decorate([
    core_1.Component({
        selector: 'ngbd-modal-content',
        templateUrl: './app/event/delete.modal.component.html'
    }),
    __metadata("design:paramtypes", [ng_bootstrap_1.NgbActiveModal])
], NgbdModalContent);
exports.NgbdModalContent = NgbdModalContent;
var EventsListComponent = (function () {
    function EventsListComponent(route, router, appService, modalService) {
        this.route = route;
        this.router = router;
        this.appService = appService;
        this.modalService = modalService;
        this.model = [];
    }
    EventsListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.currentUser = localStorage.getItem('username');
        this.sub = this.route.params.subscribe(function (params) {
            _this.view = params['view'];
            if (_this.view === "my") {
                _this.appService.getMyEvents().subscribe(function (data) {
                    _this.model = data;
                });
            }
            else if (_this.view === "going") {
                _this.appService.getSubscribedEvents().subscribe(function (data) {
                    _this.model = data;
                });
            }
            else if (_this.view === "all") {
                _this.appService.getAllEvents().subscribe(function (data) {
                    _this.model = data;
                });
            }
        });
    };
    EventsListComponent.prototype.edit = function (id) {
        this.router.navigate(['dashboard', 'event', id]);
    };
    EventsListComponent.prototype.delete = function (id) {
        var modalRef = this.modalService.open(NgbdModalContent);
        modalRef.componentInstance.event = 'event';
    };
    EventsListComponent.prototype.subscribe = function (id) {
        this.appService.subscribeToEvent(id);
    };
    EventsListComponent.prototype.unsubscribe = function (id) {
        this.appService.unsubscribeToEvent(id);
    };
    EventsListComponent.prototype.ngOnDestroy = function () {
        //don't need to unsubscribe from the route params Observable.
        this.sub.unsubscribe();
    };
    return EventsListComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], EventsListComponent.prototype, "name", void 0);
EventsListComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'eventsList.component.html'
    }),
    __metadata("design:paramtypes", [router_1.ActivatedRoute,
        router_1.Router,
        app_service_1.AppService,
        ng_bootstrap_1.NgbModal])
], EventsListComponent);
exports.EventsListComponent = EventsListComponent;
//# sourceMappingURL=eventsList.component.js.map