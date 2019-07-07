import {Component, Inject, OnInit} from '@angular/core';
import {Item} from '../shared/item';
import {ItemService} from '../services/item.service';
import { ItemInstanceState } from '../shared/item_instance_state';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {
  category: string;
  brand: string;
  power: string;
  state = '1';
  items: Item[];
  itemStates: ItemInstanceState[];

  constructor(private itemService: ItemService,
              @Inject('BaseURL') private BaseURL) {
  }

  ngOnInit(): void {
    this.itemService.getItems().subscribe(items => {
      this.items = items;
      console.log(items);
    });

    this.itemService.getItemInstanceStates().subscribe(itemStates => {
      this.itemStates = itemStates;
    });
  }

  itemStateChanged(item: Item) {
    this.itemService.updateItem(item).subscribe(itemResponse => {
      const foundIndex = this.items.findIndex(i => i.id === itemResponse.id);
      this.items[foundIndex] = itemResponse;
    });
  }

  filterItems() {
    let filter = `state=${this.state}`;
    if (this.category) {
      filter += `&category=${this.category}`;
    }
    if (this.brand) {
      filter += `&brand=${this.brand}`;
    }
    if (this.power) {
      filter += `&power=${this.power}`;
    }
    this.itemService.getFilteredItems(filter).subscribe(items => {
      this.items = items;
    });
  }
}
