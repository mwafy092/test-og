import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdBoxComponent } from './prod-box.component';

describe('ProdBoxComponent', () => {
  let component: ProdBoxComponent;
  let fixture: ComponentFixture<ProdBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProdBoxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProdBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
