import { Component, OnInit, inject } from '@angular/core';
import { TokenStorageService } from '../../services/token.service';
import { AuthService } from '../../services/auth.service';
import { catchError } from 'rxjs';
import { User } from '../../models/user';
import { NavbarService } from '../../services/navbar.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

    private tokenService = inject(TokenStorageService);
	accessToken = this.tokenService.getRefresh();
	private navbarService = inject(NavbarService);

	constructor() { }

	
    ngOnInit(): void {
		this.navbarService.show()
	}
	
}
