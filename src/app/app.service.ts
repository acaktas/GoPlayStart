import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { User } from './model/user';

@Injectable()
export class AppService {

    constructor(private http: Http) { }

    private baseUrl: string = 'http://itsaspmvccoreworkshop.azurewebsites.net/api/';
    private headers = new Headers({ 'Content-Type': 'application/json' });

    createUser(newUser: User): Promise<User> {
        return this.http.post(this.baseUrl + 'users', JSON.stringify(newUser), { headers: this.headers })
            .toPromise()
            .then(res => res.json().data as User)
            .catch(this.handleError);
    };

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}