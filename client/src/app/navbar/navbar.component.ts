import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TokenStorageService } from '../services/token.service';
import { AuthService } from '../services/auth.service';
import { Observable, catchError, map } from 'rxjs';
import { Token } from '@angular/compiler';
import { User } from '../models/user';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {

  //@ts-ignore
  // status$: Observable<Token>;

  

  private tokenService = inject(TokenStorageService);
  private authService = inject(AuthService);
  user$ : Observable<User | null> = this.authService.user$;
  // message$ = this.authService.message$;

  ngOnInit() {
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
      // console.log(resp);
    }, (error: any) => {
      // console.error(error);
    });

    this.tokenService.signOut();
  }

  

}
