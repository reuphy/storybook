import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ToggleComponent } from './toggle.component';
import { By } from '@angular/platform-browser';

describe('ToggleComponent', () => {
  let component: ToggleComponent;
  let fixture: ComponentFixture<ToggleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToggleComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit toggleChange event when toggled', () => {
    spyOn(component.toggleChange, 'emit');

    const checkbox = fixture.debugElement.query(
      By.css('input[type="checkbox"]')
    ).nativeElement;
    checkbox.click();

    expect(component.toggleChange.emit).toHaveBeenCalledWith(true);
  });

  it('should reflect the checked state', () => {
    component.isChecked = true;
    fixture.detectChanges();

    const checkbox = fixture.debugElement.query(
      By.css('input[type="checkbox"]')
    ).nativeElement;
    expect(checkbox.checked).toBe(true);
  });
});
