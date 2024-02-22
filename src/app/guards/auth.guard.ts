import { inject } from '@angular/core';
import {
  CanActivateFn,
  Router,
} from '@angular/router';
import { LoginHelper } from '../helpers/LoginHelper';

export const authGuard: CanActivateFn = (route, state) =>{
  var teste = route.params;

  //var stt = state.root;
  const router = inject(Router);
  const token = localStorage.getItem('token');

  //debugger

  //$2a$10$BoIsjiTpwFgdLs9ykfBd.uML/62P4Zi9zQIyS6FnzGIReSrJwB4FW
  if(token == "undefined" || token == undefined || token == null || token == ""){
    router.navigate(['login'])
    return false;
  }

  return !LoginHelper.prototype.tokenExpired(token);


/*   if(token && !LoginHelper.prototype.tokenExpired(token)){
    return true;
  } */

}



/* @Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }

} */
