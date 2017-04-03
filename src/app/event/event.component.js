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
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
require("rxjs/add/operator/switchMap");
var app_service_1 = require("../app.service");
var EventComponent = (function () {
    function EventComponent(router, route, parserFormatter, appService) {
        this.router = router;
        this.route = route;
        this.parserFormatter = parserFormatter;
        this.appService = appService;
    }
    EventComponent.prototype.ngOnInit = function () {
        var _this = this;
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
            .switchMap(function (params) { return _this.appService.getEventById(+params['id']); })
            .subscribe(function (newEvent) {
            if (newEvent != null) {
                _this.newEvent = newEvent;
                _this.model = {
                    id: _this.newEvent.id,
                    modifiedBy: _this.newEvent.modifiedBy,
                    name: _this.newEvent.name,
                    startDate: {
                        'year': _this.newEvent.startDate.getFullYear(),
                        'month': _this.newEvent.startDate.getMonth() + 1,
                        'day': _this.newEvent.startDate.getDate()
                    },
                    requiredUsers: _this.newEvent.requiredUsers
                };
            }
        });
    };
    EventComponent.prototype.onSubmit = function () {
        var _this = this;
        this.newEvent.name = this.model.name;
        this.newEvent.requiredUsers = this.model.requiredUsers;
        this.newEvent.startDate = new Date(this.parserFormatter.format(this.model.startDate));
        if (this.newEvent.id != 0) {
            this.appService.updateEvent(this.newEvent).subscribe(function (data) {
                _this.router.navigate(['dashboard', 'events', 'all']);
            });
        }
        else {
            this.appService.createEvent(this.newEvent).subscribe(function (data) {
                _this.router.navigate(['dashboard', 'events', 'all']);
            });
        }
    };
    return EventComponent;
}());
EventComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'event.component.html'
    }),
    __metadata("design:paramtypes", [router_1.Router,
        router_1.ActivatedRoute,
        ng_bootstrap_1.NgbDateParserFormatter,
        app_service_1.AppService])
], EventComponent);
exports.EventComponent = EventComponent;
//# sourceMappingURL=event.component.js.map