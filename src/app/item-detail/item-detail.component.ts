import {Component, OnInit, Inject} from '@angular/core';
import {Item} from '../shared/item';
import {ItemService} from '../services/item.service';
import {ActivatedRoute, Params} from '@angular/router';
import {Location} from '@angular/common';
import 'rxjs/add/operator/switchMap';
import { MatDialog } from '@angular/material';
import { ShareDialog } from '../share-dialog/share-dialog.component';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.scss']
})
export class ItemDetailComponent implements OnInit {

  item: Item;
  itemIds: number[];
  prev: number;
  next: number;

  constructor(private itemService: ItemService,
              private route: ActivatedRoute,
              private location: Location,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.itemService.getItemIds().subscribe(items => {
      this.itemIds = items;
      this.route.params
        .switchMap((params: Params) => this.itemService.getItem(+params.id))
        .subscribe(item => {
          this.item = item;
          this.setPrevNext(item.id);
        });
    });
  }

  goBack(): void {
    this.location.back();
  }

  setPrevNext(itemId: number) {
    const index = this.itemIds.indexOf(itemId);
    this.prev = this.itemIds[(this.itemIds.length + index - 1) % this.itemIds.length];
    this.next = this.itemIds[(this.itemIds.length + index + 1) % this.itemIds.length];
  }

  openShareDialog(): void {
    this.dialog.open(ShareDialog, {
      width: '250px',
      data: {location: this.location.path()}
    });
  }
}
