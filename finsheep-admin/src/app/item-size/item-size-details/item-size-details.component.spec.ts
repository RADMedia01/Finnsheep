import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemSizeDetailsComponent } from './item-size-details.component';

describe('ItemSizeDetailsComponent', () => {
  let component: ItemSizeDetailsComponent;
  let fixture: ComponentFixture<ItemSizeDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemSizeDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemSizeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
