import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageTargetComponent } from './image-target.component';

describe('ImageTargetComponent', () => {
  let component: ImageTargetComponent;
  let fixture: ComponentFixture<ImageTargetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImageTargetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageTargetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
