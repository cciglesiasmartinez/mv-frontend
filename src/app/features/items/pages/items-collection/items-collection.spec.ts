import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemsCollection } from './items-collection';

describe('ItemsCollection', () => {
  let component: ItemsCollection;
  let fixture: ComponentFixture<ItemsCollection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemsCollection]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemsCollection);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
