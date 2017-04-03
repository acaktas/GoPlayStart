import { User } from './user';

export class Event {
    constructor(
        public id: number,
        public name: string,
        public requiredUsers: number,
        public startDate: Date,
        public modifiedBy: string,
        public isUserSubscribed: boolean
    ) { }
}