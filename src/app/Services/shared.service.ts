//This service is for sharing data btwn components that lack parent-child relationship.
//step 1: Create a Sidebar Service
//Create a service that manages the state of the sidebar (isSidebarActive).

//Step 2: Inject the Service into Your Sidebar Component
//Use the service to toggle the sidebar in the sidebar component.

//Step 3: Update the Content Component to React to Sidebar Changes
//In the content component (where the container is), you can subscribe to the sidebar state and adjust the CSS accordingly.

//Step 4: Apply the Shift to the Container with CSS
//You can use conditional classes in your template and CSS to apply the shift when the sidebar is active.

//Step 5: Update the Sidebar to Toggle Its State
//Ensure that the sidebar is toggling correctly, and the state is reflected in the SidebarService.
// sidebar.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  // Initial value set to false for inactive state
  private sidebarActive = new BehaviorSubject<boolean>(false);
  public sidebarActive$ = this.sidebarActive.asObservable();

  toggleSidebar() {
    this.sidebarActive.next(!this.sidebarActive.value);
  }

  setSidebarState(isActive: boolean) {
    this.sidebarActive.next(isActive);
  }

  getSidebarState() {
    return this.sidebarActive.value;
  }
}
