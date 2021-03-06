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
var RegisterComponent = (function () {
    function RegisterComponent(appService, router) {
        this.appService = appService;
        this.router = router;
    }
    RegisterComponent.prototype.ngOnInit = function () {
        this.model = {
            username: '',
            password: ''
        };
    };
    RegisterComponent.prototype.save = function () {
        var _this = this;
        this.appService.createUser(this.model).subscribe(function () {
            _this.router.navigate(['/']);
        }, function (error) {
            alert(error._body);
        });
    };
    return RegisterComponent;
}());
RegisterComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'register',
        templateUrl: 'register.component.html'
    }),
    __metadata("design:paramtypes", [app_service_1.AppService, router_1.Router])
], RegisterComponent);
exports.RegisterComponent = RegisterComponent;
//# sourceMappingURL=register.component.js.map