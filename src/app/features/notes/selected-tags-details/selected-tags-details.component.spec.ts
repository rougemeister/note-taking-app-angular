import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedTagsDetailsComponent } from './selected-tags-details.component';

describe('SelectedTagsDetailsComponent', () => {
  let component: SelectedTagsDetailsComponent;
  let fixture: ComponentFixture<SelectedTagsDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectedTagsDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectedTagsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
