import { CanActivateFn } from '@angular/router';
import { AuthService } from '../Authentication Service/auth.service';


export function authGuard(authService: AuthService): CanActivateFn {
  return (route, state) => {
    return authService.isLoggedIn();
  };
}

// export function authGuardLogout(authService: AuthService): CanActivateFn {
//   return (route, state) => {
//     return authService.logout();
//   };
// }
