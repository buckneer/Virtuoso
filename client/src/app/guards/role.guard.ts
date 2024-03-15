import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { inject } from '@angular/core';
import { TokenStorageService } from '../services/token.service';

export class RoleGuard implements CanActivate {


	private storageService = inject(TokenStorageService);
	private router = inject(Router);

	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	  ): boolean {
		// let logged = true;
		let logged = this.storageService.getRoles();
		const allowed = route.data['roles'] as Array<string>;
		
		if (logged) {
			// Perform check for roles
			if(this.hasPermissions(logged, allowed)) return true;
			
			// this.router.navigate(['/']);
			return false;
		}
		this.router.navigate(['login']);
		return false;
	}

	private hasPermissions(userRoles: Array<string>, requiredRoles: Array<string>) {
		if (userRoles.includes('admin')) {
			return true; // Admin can access all roles
		}
		if (userRoles.includes('mod')) {
			return requiredRoles.every(role => userRoles.includes(role) && role !== 'admin'); // Mod can't access admin roles
		}
		if (userRoles.includes('user')) {
			return requiredRoles.every(role => userRoles.includes(role) && role === 'user'); // User can only access user roles
		}
		return false; // Unknown user role
	}
}