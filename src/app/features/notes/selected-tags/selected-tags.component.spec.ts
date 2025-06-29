import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedTagsComponent } from './selected-tags.component';

describe('SelectedTagsComponent', () => {
  let component: SelectedTagsComponent;
  let fixture: ComponentFixture<SelectedTagsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectedTagsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectedTagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
