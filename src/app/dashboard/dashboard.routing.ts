import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../auth.guard';

import { DashboardComponent } from './dashboard.component';
import { EventsListComponent } from '../eventsList/eventsList.component'
import { EventComponent } from './../event/event.component'

const routes: Routes = [
    {
        path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard], children: [
            { path: '', redirectTo: 'events/all', pathMatch: 'full' },
            { path: 'events/:view', component: EventsListComponent, pathMatch: 'full' },
            { path: 'event/:id', component: EventComponent, pathMatch: 'full' }
        ],
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class DashboardRoutingModule { }

export const routedDashboardComponents = [DashboardComponent, EventsListComponent, EventComponent];