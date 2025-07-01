import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatButtonComponent } from './creat-button.component';

describe('CreatButtonComponent', () => {
  let component: CreatButtonComponent;
  let fixture: ComponentFixture<CreatButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreatButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
