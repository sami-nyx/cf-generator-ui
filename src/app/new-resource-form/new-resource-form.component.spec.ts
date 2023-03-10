import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewResourceFormComponent } from './new-resource-form.component';

describe('NewResourceFormComponent', () => {
  let component: NewResourceFormComponent;
  let fixture: ComponentFixture<NewResourceFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewResourceFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewResourceFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
