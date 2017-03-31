"use strict";
var Event = (function () {
    function Event(id, name, requiredUsers, startDate, modifiedBy, isUserSubscribed) {
        this.id = id;
        this.name = name;
        this.requiredUsers = requiredUsers;
        this.startDate = startDate;
        this.modifiedBy = modifiedBy;
        this.isUserSubscribed = isUserSubscribed;
    }
    return Event;
}());
exports.Event = Event;
//# sourceMappingURL=event.js.map