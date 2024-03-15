import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ForgotComponent } from './pages/forgot/forgot.component';
import { NewPasswordComponent } from './pages/new-password/new-password.component';
import { ConfirmEmailComponent } from './pages/confirm-email/confirm-email.component';
import { VerifyEmailComponent } from './pages/verify-email/verify-email.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'forgot', component: ForgotComponent},
    {path: 'reset', component: NewPasswordComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'confirm', component: ConfirmEmailComponent},
    {path: 'verify', component: VerifyEmailComponent}
];