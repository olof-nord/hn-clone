import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ApiConfiguration } from '@api/api-configuration';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Hacker News';

  story: any = { };

  constructor(http: HttpClient, apiConfiguration: ApiConfiguration) {
    http.get(apiConfiguration.rootUrl + '/item/8863.json')
      .subscribe(s => this.story = s);
  }
}
