import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpennedChatsComponent } from './openned-chats.component';

describe('OpennedChatsComponent', () => {
  let component: OpennedChatsComponent;
  let fixture: ComponentFixture<OpennedChatsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OpennedChatsComponent]
    });
    fixture = TestBed.createComponent(OpennedChatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
