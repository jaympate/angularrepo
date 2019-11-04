import {Injectable} from '@angular/core';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class WebsiteRoutes {
  constructor(private router: Router) {
  }

  getActive(path: string): string {
    return this.router.url === ('/' + path) ? 'active' : '';
  }
}

export interface NavigationOption {
  path: string;
  text: string;
}
