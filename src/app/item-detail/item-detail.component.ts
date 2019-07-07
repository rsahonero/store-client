import {Component, OnInit} from '@angular/core';
import {Item} from '../shared/item';
import {ItemService} from '../services/item.service';
import {ActivatedRoute, Params} from '@angular/router';
import {Location} from '@angular/common';
import 'rxjs/add/operator/switchMap';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material';
import {ItemGalleryComponent} from '../item-gallery/item.gallery.component';
import { ShareDialog } from '../share-dialog/share-dialog.component';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.scss'],
  providers: [
    {provide: MAT_DIALOG_DATA, useValue: {}}
  ]
})
export class ItemDetailComponent implements OnInit {

  item: Item;
  itemIds: number[];
  prev: number;
  next: number;
  image;
  private validExtensions = ['png', 'jpg', 'jpeg'];
  activeButton = false;
  imageSelected: File;

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

  uploadImage(item): void {
    this.itemService.uploadImage(this.imageSelected, item.id)
      .subscribe((response) => {
        this.image = undefined;
        this.activeButton = false;
        if (response.body === 'Image uploaded successfully') {
          this.itemService.getItem(item.id)
            .subscribe(response => {
              this.item = response;
            });
        }
      }, (error1) => {
        console.log(error1);
      });
  }

  validateImage(event): void {
    if (this.image !== undefined) {
      const path = this.image.toString();
      const ext = path.substring(path.lastIndexOf('.') + 1);
      if (this.validateExtension(ext)) {
        this.activeButton = true;
        const files = event.target.files;
        this.imageSelected = files.item(0);
      }
    }
  }

  private validateExtension(ext: string): boolean {
    return this.validExtensions.includes(ext.toLowerCase());
  }

  showGallery(): void {
    const gallery = this.dialog.open(ItemGalleryComponent, {
      width: '90%',
      height: '90%',
      data: {item: this.item}
    });
    gallery.afterClosed().subscribe(() => {
      this.itemService.getItem(this.item.id).subscribe((response) => {
        this.item = response;
      });
    });
  }

  openShareDialog(): void {
    this.dialog.open(ShareDialog, {
      width: '250px',
      data: {location: this.location.path()}
    });
  }
}
