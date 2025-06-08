import { Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { AnimalFormComponent } from './animal-form/animal-form.component';
import { AnimalListComponent } from './animal-list/animal-list.component';
import { ObservationFormComponent } from './observation-form/observation-form.component';
import { ObservationListComponent } from './observation-list/observation-list.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

export const routes: Routes = [
    { path: 'about', component: AboutComponent },
    { path: 'animal/add', component : AnimalFormComponent },
    { path: 'animal/:id', component : AnimalFormComponent },
    { path: 'animals', component : AnimalListComponent},
    { path: 'observation/add', component : ObservationFormComponent },
    { path: 'observation/:id', component : ObservationFormComponent },
    { path: 'observations', component : ObservationListComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent }
];
