import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlainSightListComponent } from './plain-sight-list.component';

describe('PlainSightListComponent', () => {
  let component: PlainSightListComponent;
  let fixture: ComponentFixture<PlainSightListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlainSightListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlainSightListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
