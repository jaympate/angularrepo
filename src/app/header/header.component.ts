import {Component} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  isCollapsed = true;

  toggle(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  closeNavigationBar(): void {
    this.isCollapsed = true;
  }
}
