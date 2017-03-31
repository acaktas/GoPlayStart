import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { User } from './model/user';
import { Token } from './model/token';
import { Event } from './model/event';

@Injectable()
export class AppService {

    constructor(private http: Http) { }

    //private baseUrl: string = 'http://localhost:3838/api/';
    private baseUrl: string = 'http://itsaspmvccoreworkshop.azurewebsites.net/api/';
    private headers = new Headers({ 'Content-Type': 'application/json' });

    createUser(newUser: User) {
        return this.http.post(this.baseUrl + 'users', JSON.stringify(newUser), { headers: this.headers })
            .map(res => res.json())
            .catch(this.handleError);
    };

    login(username: string, password: string) {

        let urlSearchParams = new URLSearchParams();
        urlSearchParams.append('username', username);
        urlSearchParams.append('password', password);

        let body = urlSearchParams.toString();

        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        return this.http.post(this.baseUrl + 'token', body, { headers: headers })
            .map(res => this.onLoginResponse(res.json(), username))
            .catch(this.handleError);
    };

    onLoginResponse(token: Token, username: string) {
        localStorage.setItem('token', JSON.stringify(token));
        localStorage.setItem('username', username);
    };

    onLogout() {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
    };

    getMyEvents(): Observable<Event[]> {
        return this.http.get(this.baseUrl + 'events', this.jwtRequestOptions())
            .map(res => res.json())
            .catch(this.handleError);
    };

    getAllEvents(): Observable<Event[]> {
        return this.http.get(this.baseUrl + 'events', this.jwtRequestOptions())
            .map(res => res.json())
            .catch(this.handleError);
    };

    getSubscribedEvents(): Observable<Event[]> {
        return this.http.get(this.baseUrl + 'events', this.jwtRequestOptions())
            .map(res => res.json())
            .catch(this.handleError);
    };

    subscribeToEvent(id: number) { };
    unsubscribeToEvent(id: number) { };

    getEventById(id: number): Observable<Event> {
        if (id == 0) {
            return Observable.empty<Event>();
        }
        else {
            return this.http.get(this.baseUrl + 'events/' + id, this.jwtRequestOptions())
                .map(this.onGetEventById)
                .catch(this.handleError);
        }
    };

    onGetEventById(res: Response) {
        let event: Event = res.json();
        event.startDate = new Date(event.startDate);
        return event;
    };

    createEvent(newEvent: Event) {
        return this.http.post(this.baseUrl + 'events', JSON.stringify(newEvent), this.jwtRequestOptions())
            .map(res => res.json())
            .catch(this.handleError);
    };

    updateEvent(newEvent: Event) {
        return this.http.put(this.baseUrl + 'events/' + newEvent.id, JSON.stringify(newEvent), this.jwtRequestOptions())
            .map(res => res.json())
            .catch(this.handleError);
    };

    private handleError(error: any) {
        console.error('An error occurred', error);
        if (error.status == 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('username');
        };
        return Promise.reject(error.message || error);
    };

    private jwtRequestOptions() {
        let token = JSON.parse(localStorage.getItem('token'));
        if (token) {
            let headers = new Headers({ 'Authorization': 'Bearer ' + token.access_token, 'Content-Type': 'application/json' });
            return new RequestOptions({ headers: headers });
        }
    };
}