import { Component } from '@angular/core';

import { RegisterComponent } from './register/register.component';

@Component({
  selector: 'my-app',
  template: `<register></register>`,
})
export class AppComponent  { name = 'Angular'; }
