import { Component, ElementRef } from '@angular/core';
import { addClass, hasClass, removeClass } from './utils/toggle-class/dom';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: false,
})
export class AppComponent {
  // Track the collapsed state of each accordion section
  personalInfoCollapsed = false;
  addressCollapsed = true;
  paymentCollapsed = true;

  constructor(private elementRef: ElementRef) {
    this.elementRef = elementRef;
  }

  onAccordionHeaderClick(event: Event) {
    const target = event.currentTarget as HTMLButtonElement;
    const contentId = target.getAttribute('aria-controls');

    if (!contentId) return;

    const content = document.getElementById(contentId);
    if (!content) return;

    // Determine which section was clicked based on the content ID
    switch (contentId) {
      case 'personal-info-content':
        this.personalInfoCollapsed = !this.personalInfoCollapsed;
        break;
      case 'address-content':
        this.addressCollapsed = !this.addressCollapsed;
        break;
      case 'payment-content':
        this.paymentCollapsed = !this.paymentCollapsed;
        break;
    }

    // Update aria-expanded attribute
    target.setAttribute(
      'aria-expanded',
      (!this.isContentCollapsed(contentId)).toString()
    );

    return false;
  }

  private isContentCollapsed(contentId: string): boolean {
    switch (contentId) {
      case 'personal-info-content':
        return this.personalInfoCollapsed;
      case 'address-content':
        return this.addressCollapsed;
      case 'payment-content':
        return this.paymentCollapsed;
      default:
        return false;
    }
  }
}
