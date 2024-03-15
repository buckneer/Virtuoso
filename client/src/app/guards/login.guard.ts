import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { TokenStorageService } from '../services/token.service';

export class LoginGuard implements CanActivate {


	private storageService = inject(TokenStorageService);
	private router = inject(Router);

	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	  ): boolean {
		let logged = this.storageService.getUser();
		
		if (logged) {
		  return true;
		}
		this.router.navigate(['/login']);
		
		return false;
	}
}