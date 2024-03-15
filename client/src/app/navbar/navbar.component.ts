import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TokenStorageService } from '../services/token.service';
import { AuthService } from '../services/auth.service';
import { Observable, catchError, map } from 'rxjs';
import { Token } from '@angular/compiler';
import { User } from '../models/user';
import { CommonModule, NgIf } from '@angular/common';
import { NavbarService } from '../services/navbar.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, CommonModule, NgIf],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {

  //@ts-ignore
  // status$: Observable<Token>;

  

  private tokenService = inject(TokenStorageService);
  private authService = inject(AuthService);
  public navbarService = inject(NavbarService);


  user$ : Observable<User | null>;
//   user : User | null = null;
  // message$ = this.authService.message$;

  ngOnInit() {
	this.user$ = this.authService.user$;
	const user = this.tokenService.getUser();

	if(user) {
		this.authService.setUser(user);
	}
    // this.user$.subscribe({ next: data => {
	// 	console.log(data);
	// 	if(data === null || this.tokenService.getUser() == null) {
	// 		this.user == null;
	// 	} else {
	// 		console.log("else runs");
	// 		this.user = data || this.tokenService.getUser();
	// 	}
    // }})

    // this.status$ = this.authService.stateItem$.pipe(map(state => {
    //   console.log(state);
    //   return state;
    // }));
    // this.authService.stateItem$.subscribe(data => {
    //   console.log("navbar", data);
    //   if(data) {
    //     this.user = this.tokenService.getUser();
    //   } else {
    //     this.user = null;
    //   }
    // })
  }

  constructor() {};
	


	
  
  logoutUser() {
    this.authService.logout().subscribe((resp) => {
      console.log(resp);
	  
    }, (error: any) => {
      console.error(error);
    });

    
  }

  

}
