import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HeroesComponent }      from './heroes/heroes.component';
import { DashboardComponent }   from './dashboard/dashboard.component';
import { HeroDetailsComponent } from './hero-details/hero-details.component';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';

const routes : Routes = [
  { path: 'heroes',       component: HeroesComponent },
  { path: 'dashboard',    component: DashboardComponent },
  { path: 'detail/:id',   component: HeroDetailsComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
]

@NgModule({
  exports: [ RouterModule ],
  imports: [ 
    RouterModule.forRoot(routes),
  ]
})

export class AppRoutingModule { 

}
