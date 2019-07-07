import {Component, Inject, OnInit} from '@angular/core';
import {NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions} from 'ngx-gallery';
import 'hammerjs';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {ItemService} from '../services/item.service';

@Component({
  selector: 'app-item-gallery',
  templateUrl: './item.gallery.component.html',
  styleUrls: ['./item.gallery.component.scss']
})
export class ItemGalleryComponent implements OnInit {
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  item: any;
  index = 0;
  refresh = false;
  size = 0;

  constructor(private dialog: MatDialogRef<ItemGalleryComponent>, @Inject(MAT_DIALOG_DATA) public data: any,
              private itemService: ItemService) {
    this.item = this.data.item;
  }

  ngOnInit(): void {

    this.galleryOptions = [
      {
        width: '100%',
        height: '100%',
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide
      },
      // max-width 800
      {
        breakpoint: 800,
        width: '100%',
        height: '100%',
        imagePercent: 80,
        thumbnailsPercent: 20,
        thumbnailsMargin: 20,
        thumbnailMargin: 20
      },
      // max-width 400
      {
        breakpoint: 400,
        preview: false
      }
    ];
    this.loadGallery();
    this.size = this.item.imageList.length;
  }

  changeEvent(event) {
    this.index = event.index;
  }

  hide() {
    this.dialog.close();
  }

  deleteImage() {
    this.itemService.deleteImage(this.item.imageList[this.index].id)
      .subscribe((response) => {
        this.itemService.getItem(this.item.id).subscribe((result) => {
          this.item = result;
          this.reload();
        });
        this.refresh = true;
      });
  }

  reload(): void {
    this.size = this.item.imageList.length;
    if (this.size === 0) {
      this.hide();
    } else {
      this.loadGallery();
    }
  }

  loadGallery(): void {
    this.galleryImages = [];
    this.item.imageList.forEach((element) => {
      this.galleryImages.push(
        {
          small: 'data:image/png;base64,' + element.image,
          medium: 'data:image/png;base64,' + element.image,
          big: 'data:image/png;base64,' + element.image
        }
      );
    });
    this.index = 0;
  }
}
