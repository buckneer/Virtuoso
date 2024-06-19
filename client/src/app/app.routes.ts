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
import {MyCoursesComponent} from "./pages/course/my-courses/my-courses.component";
import {AddCourseComponent} from "./pages/course/add-course/add-course.component";
import { CourseComponent } from "./pages/course/course/course.component";
import {AddLessonComponent} from "./pages/lesson/add-lesson/add-lesson.component";

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
    {path: 'protected', component: ProtectedComponent, canActivate: [RoleGuard], data: {roles: ['admin', 'mod', 'user']}},
    {path: 'admin', component: AdminComponent, canActivate: [RoleGuard], data: { roles: ['admin']}},
    {path: 'mod', component: ModComponent, canActivate: [RoleGuard],  data: { roles: ['admin', 'mod']}},
    {path: 'my-courses', component: MyCoursesComponent, canActivate: [RoleGuard], data: {roles: []}},
    {path: 'add-course', component: AddCourseComponent, canActivate: [RoleGuard], data: { roles: []}},
    {path: 'course/:courseId', component: CourseComponent, canActivate: [RoleGuard], data: { roles: []}},
    {path: 'course/:courseId/lesson/new', component: AddLessonComponent, canActivate: [RoleGuard], data: { roles: []}},
];
