import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlainsightlistComponent } from './plainsightlist.component';

describe('PlainsightlistComponent', () => {
  let component: PlainsightlistComponent;
  let fixture: ComponentFixture<PlainsightlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlainsightlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlainsightlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
