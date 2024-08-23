import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemSizeListComponent } from './item-size-list.component';

describe('ItemSizeListComponent', () => {
  let component: ItemSizeListComponent;
  let fixture: ComponentFixture<ItemSizeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemSizeListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemSizeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
