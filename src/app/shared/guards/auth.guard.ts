import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { filter, map, Observable, of, take } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(): Observable<boolean | UrlTree> {
    return this.auth.currentUser.pipe(
      filter((val) => val !== null),
      take(1),
      map((isAuthenticated) => {
        if (isAuthenticated) {
          return true;
        } else {
          return this.router.createUrlTree(['/']);
        }
      })
    );
  }
}
