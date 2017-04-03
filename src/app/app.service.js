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
var Rx_1 = require("rxjs/Rx");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
var AppService = (function () {
    function AppService(http) {
        this.http = http;
        //private baseUrl: string = 'http://localhost:3838/api/';
        this.baseUrl = 'http://itsaspmvccoreworkshop.azurewebsites.net/api/';
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
    }
    AppService.prototype.createUser = function (newUser) {
        return this.http.post(this.baseUrl + 'users', JSON.stringify(newUser), { headers: this.headers })
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    ;
    AppService.prototype.login = function (username, password) {
        var _this = this;
        var urlSearchParams = new URLSearchParams();
        urlSearchParams.append('username', username);
        urlSearchParams.append('password', password);
        var body = urlSearchParams.toString();
        var headers = new http_1.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        return this.http.post(this.baseUrl + 'token', body, { headers: headers })
            .map(function (res) { return _this.onLoginResponse(res.json(), username); })
            .catch(this.handleError);
    };
    ;
    AppService.prototype.onLoginResponse = function (token, username) {
        localStorage.setItem('token', JSON.stringify(token));
        localStorage.setItem('username', username);
    };
    ;
    AppService.prototype.onLogout = function () {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
    };
    ;
    AppService.prototype.getMyEvents = function () {
        return this.http.get(this.baseUrl + 'events', this.jwtRequestOptions())
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    ;
    AppService.prototype.getAllEvents = function () {
        return this.http.get(this.baseUrl + 'events', this.jwtRequestOptions())
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    ;
    AppService.prototype.getSubscribedEvents = function () {
        return this.http.get(this.baseUrl + 'events', this.jwtRequestOptions())
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    ;
    AppService.prototype.subscribeToEvent = function (id) { };
    ;
    AppService.prototype.unsubscribeToEvent = function (id) { };
    ;
    AppService.prototype.getEventById = function (id) {
        if (id == 0) {
            return Rx_1.Observable.empty();
        }
        else {
            return this.http.get(this.baseUrl + 'events/' + id, this.jwtRequestOptions())
                .map(this.onGetEventById)
                .catch(this.handleError);
        }
    };
    ;
    AppService.prototype.onGetEventById = function (res) {
        var event = res.json();
        event.startDate = new Date(event.startDate);
        return event;
    };
    ;
    AppService.prototype.createEvent = function (newEvent) {
        return this.http.post(this.baseUrl + 'events', JSON.stringify(newEvent), this.jwtRequestOptions())
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    ;
    AppService.prototype.updateEvent = function (newEvent) {
        return this.http.put(this.baseUrl + 'events/' + newEvent.id, JSON.stringify(newEvent), this.jwtRequestOptions())
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    ;
    AppService.prototype.handleError = function (error) {
        console.error('An error occurred', error);
        if (error.status == 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('username');
        }
        ;
        return Promise.reject(error.message || error);
    };
    ;
    AppService.prototype.jwtRequestOptions = function () {
        var token = JSON.parse(localStorage.getItem('token'));
        if (token) {
            var headers = new http_1.Headers({ 'Authorization': 'Bearer ' + token.access_token, 'Content-Type': 'application/json' });
            return new http_1.RequestOptions({ headers: headers });
        }
    };
    ;
    return AppService;
}());
AppService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], AppService);
exports.AppService = AppService;
//# sourceMappingURL=app.service.js.map