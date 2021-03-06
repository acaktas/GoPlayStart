"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var auth_guard_1 = require("../auth.guard");
var dashboard_component_1 = require("./dashboard.component");
var eventsList_component_1 = require("../eventsList/eventsList.component");
var event_component_1 = require("./../event/event.component");
var routes = [
    {
        path: 'dashboard', component: dashboard_component_1.DashboardComponent, canActivate: [auth_guard_1.AuthGuard], children: [
            { path: '', redirectTo: 'events/all', pathMatch: 'full' },
            { path: 'events/:view', component: eventsList_component_1.EventsListComponent, pathMatch: 'full' },
            { path: 'event/:id', component: event_component_1.EventComponent, pathMatch: 'full' }
        ],
    }
];
var DashboardRoutingModule = (function () {
    function DashboardRoutingModule() {
    }
    return DashboardRoutingModule;
}());
DashboardRoutingModule = __decorate([
    core_1.NgModule({
        imports: [router_1.RouterModule.forChild(routes)],
        exports: [router_1.RouterModule],
    })
], DashboardRoutingModule);
exports.DashboardRoutingModule = DashboardRoutingModule;
exports.routedDashboardComponents = [dashboard_component_1.DashboardComponent, eventsList_component_1.EventsListComponent, event_component_1.EventComponent];
//# sourceMappingURL=dashboard.routing.js.map