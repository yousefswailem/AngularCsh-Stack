// import { CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
// import { Injector } from '@angular/core';
// import { AuthService } from '../Authentication Service/auth.service';
// import { Observable } from 'rxjs';


// export const authGuard: CanActivateFn = (
//   route: ActivatedRouteSnapshot,
//   state: RouterStateSnapshot,
//   injector: Injector
// ): boolean | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> => {
//   const authService = injector.get(AuthService);
  
//   if (authService.isLoggedIn()) {
//     return true;
//   } else {
//     // If you have access to Router, you can redirect here
//     // const router = injector.get(Router);
//     // router.navigate(['/login']);
//     return false;
//   }
// };
