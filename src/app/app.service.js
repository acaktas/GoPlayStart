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
var http_1 = require("@angular/http");
require("rxjs/add/operator/toPromise");
var AppService = (function () {
    function AppService(http) {
        this.http = http;
        this.baseUrl = 'http://itsaspmvccoreworkshop.azurewebsites.net/api/';
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
    }
    AppService.prototype.createUser = function (newUser) {
        return this.http.post(this.baseUrl + 'users', JSON.stringify(newUser), { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json().data; })
            .catch(this.handleError);
    };
    ;
    AppService.prototype.login = function (name, password) {
        var _this = this;
        var params = new URLSearchParams();
        params.set('username', name);
        params.set('password', password);
        return this.http.get(this.baseUrl + 'users', { params: params, headers: this.headers })
            .toPromise()
            .then(function (res) { return _this.onLoginResponse(res.json().data); })
            .catch(this.handleError);
    };
    AppService.prototype.onLoginResponse = function (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
    };
    AppService.prototype.handleError = function (error) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    };
    return AppService;
}());
AppService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], AppService);
exports.AppService = AppService;
//# sourceMappingURL=app.service.js.map