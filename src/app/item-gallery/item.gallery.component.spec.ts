import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Item.GalleryComponent } from './item.gallery.component';

describe('Item.GalleryComponent', () => {
  let component: Item.GalleryComponent;
  let fixture: ComponentFixture<Item.GalleryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Item.GalleryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Item.GalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
