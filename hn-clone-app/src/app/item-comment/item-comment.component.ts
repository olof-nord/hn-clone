import { Component, Input, OnInit } from '@angular/core';
import { Item } from '@api/models/item';

@Component({
  selector: 'app-item-comment',
  templateUrl: './item-comment.component.html',
  styleUrls: ['./item-comment.component.scss']
})
export class ItemCommentComponent implements OnInit {

  @Input()
  item: Item;

  private baseURL = 'https://news.ycombinator.com/';

  constructor() {}

  ngOnInit(): void {
    // Fetch child comments
  }

  getUserURI(): string {
    return this.baseURL + 'user?id=' + this.item?.by;
  }

}
