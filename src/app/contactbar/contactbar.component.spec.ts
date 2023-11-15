import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactbarComponent } from './contactbar.component';

describe('ContactbarComponent', () => {
  let component: ContactbarComponent;
  let fixture: ComponentFixture<ContactbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContactbarComponent]
    });
    fixture = TestBed.createComponent(ContactbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
