import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './pages/login/login.component';
import {FruitListComponent} from './pages/fruit-list/fruit-list.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'fruit-list',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'fruit-list',
    component: FruitListComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
