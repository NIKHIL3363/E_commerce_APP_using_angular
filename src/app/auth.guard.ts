import { CanActivateFn } from '@angular/router';
import { Users } from './services/users.service';
import { inject } from '@angular/core';

export const authGuard = () => {
  
     
     
     
     const s=inject(Users)



     return s.issignedup.next
     

};
