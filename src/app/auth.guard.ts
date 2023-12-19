import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const expectedRole = route.data['expectedRole'] as string;
console.log(expectedRole,AuthService.hasUserRole(expectedRole));

  if (!expectedRole || !AuthService.hasUserRole(expectedRole)) {
    // Redirect to the login page or unauthorized page
    // const routerInstance = Router;
    // // Assuming you have a static method for navigation in your AuthService
    // routerInstance.navigate()
    return false;
  }

  return true;
};
