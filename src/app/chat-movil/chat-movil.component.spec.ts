import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatMovilComponent } from './chat-movil.component';

describe('ChatMovilComponent', () => {
  let component: ChatMovilComponent;
  let fixture: ComponentFixture<ChatMovilComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChatMovilComponent]
    });
    fixture = TestBed.createComponent(ChatMovilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
