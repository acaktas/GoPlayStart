import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { User } from './model/user';
import { Token } from './model/token';

@Injectable()
export class AppService {

    constructor(private http: Http) { }

    //private baseUrl: string = 'http://localhost:3838/api/';
    private baseUrl: string = 'http://itsaspmvccoreworkshop.azurewebsites.net/api/';
    private headers = new Headers({ 'Content-Type': 'application/json' });

    createUser(newUser: User) {
        return this.http.post(this.baseUrl + 'users', JSON.stringify(newUser), { headers: this.headers })
            .toPromise()
            .then()
            .catch(this.handleError);
    };

    login(username: string, password: string) {
        let urlSearchParams = new URLSearchParams();
        urlSearchParams.append('username', username);
        urlSearchParams.append('password', password);
        let body = urlSearchParams.toString();
        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        return this.http.post(this.baseUrl + 'token', body, { headers: headers })
            .toPromise()
            .then(res => this.onLoginResponse(res.json(), username))
            .catch(this.handleError);
    };

    onLoginResponse(token: Token, username: string) {
        localStorage.setItem('token', JSON.stringify(token));
        localStorage.setItem('username', username);
    };

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    };
}