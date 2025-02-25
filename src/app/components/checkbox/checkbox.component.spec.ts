import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CheckboxComponent } from './checkbox.component';
import { By } from '@angular/platform-browser';

describe('CheckboxComponent', () => {
  let component: CheckboxComponent;
  let fixture: ComponentFixture<CheckboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckboxComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit checkedChange event when checkbox is clicked', () => {
    spyOn(component.checkedChange, 'emit');

    const checkbox = fixture.debugElement.query(
      By.css('input[type="checkbox"]')
    ).nativeElement;
    checkbox.click();

    expect(component.checkedChange.emit).toHaveBeenCalledWith(true);
  });

  it('should display the correct label', () => {
    component.label = 'Test Label';
    fixture.detectChanges();

    const label = fixture.debugElement.query(By.css('label')).nativeElement;
    expect(label.textContent.trim()).toBe('Test Label');
  });

  it('should reflect the checked state', () => {
    component.checked = true;
    fixture.detectChanges();

    const checkbox = fixture.debugElement.query(
      By.css('input[type="checkbox"]')
    ).nativeElement;
    expect(checkbox.checked).toBe(true);
  });
});
