import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { LoansComponent } from './components/loans/loans.component';
import { ProfileComponent } from './components/profile/profile.component';

export const routes: Routes = [
  /**
   * get the following components and set LoginComponent as initial and default component
   */
  // Login : LoginComponent
  // Loans : LoansComponent
  // Profile : ProfileComponent
  {
    path: 'Login',
    component: LoginComponent,
  },
  {
    path: 'Loans',
    component: LoansComponent
  },
  {
    path: 'Profile',
    component: ProfileComponent
  },
  {
    path: '**',
    redirectTo: '/Login'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
