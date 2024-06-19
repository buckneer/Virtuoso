import { Component, OnInit, inject } from '@angular/core';
import { TokenStorageService } from '../../services/token.service';
import { AuthService } from '../../services/auth.service';
import { catchError } from 'rxjs';
import { User } from '../../models/user';
import { NavbarService } from '../../services/navbar.service';
import {HomeHeroComponent} from "../../components/home-hero/home-hero.component";
import {NgOptimizedImage} from "@angular/common";

@Component({
	selector: 'app-home',
	standalone: true,
	imports: [
		HomeHeroComponent,
		NgOptimizedImage
	],
	templateUrl: './home.component.html',
	styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

    private tokenService = inject(TokenStorageService);
	private authService = inject(AuthService);
	accessToken = this.tokenService.getRefresh();
	private navbarService = inject(NavbarService);

	constructor() { }


    ngOnInit(): void {
		this.navbarService.show();
	}


	getProtected() {
		this.authService.protected().subscribe({
			next: data => {
				//console.log(data);
			},
			error: err => {
				//console.log(err)
			}
		})
	}

}
