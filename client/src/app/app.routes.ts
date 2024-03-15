import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ForgotComponent } from './pages/forgot/forgot.component';
import { NewPasswordComponent } from './pages/new-password/new-password.component';
import { ConfirmEmailComponent } from './pages/confirm-email/confirm-email.component';
import { VerifyEmailComponent } from './pages/verify-email/verify-email.component';
import { AdminComponent } from './pages/admin/admin.component';
import { ModComponent } from './pages/mod/mod.component';
import { LoginGuard } from './guards/login.guard';
import { ProtectedComponent } from './pages/protected/protected.component';
import { RoleGuard } from './guards/role.guard';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'forgot', component: ForgotComponent},
    {path: 'reset', component: NewPasswordComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'confirm', component: ConfirmEmailComponent},
    {path: 'verify', component: VerifyEmailComponent},

    // Protected
    {path: 'protected', component: ProtectedComponent, canActivate: [LoginGuard]},
    {path: 'admin', component: AdminComponent, canActivate: [RoleGuard], data: { roles: ['admin']}},
    {path: 'mod', component: ModComponent, canActivate: [RoleGuard],  data: { roles: ['mod']}},
];