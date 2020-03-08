import { Component, Input, OnInit } from '@angular/core';
import { Item } from '@api/models';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {

  @Input()
  item: Item;

  @Input()
  index?: number;

  private baseURL = 'https://news.ycombinator.com/';

  constructor() {}

  ngOnInit(): void {}

  getHostname(): string {
    const url: URL = new URL(this.item?.url);

    const tld = url.hostname.split('.').slice(-1)[0];
    const domain = url.hostname.split('.').slice(-2)[0];

    return domain + '.' + tld;
  }

  getOtherItemsURI(): string {
    return this.baseURL + 'from?site=' + this.getHostname();
  }

  getUserURI(): string {
    return this.baseURL + 'user?id=' + this.item?.by;
  }

  getHideURI(): string {
    return this.baseURL + 'hide?id=' + this.item?.id + '&goto=news';
  }

}
