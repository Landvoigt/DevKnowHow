import { Directive, ElementRef, HostListener, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import DOMPurify from 'dompurify';

@Directive({
  selector: '[contentEditable]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ContentEditableDirective),
      multi: true,
    },
  ],
  standalone: true
})
export class ContentEditableDirective implements ControlValueAccessor {
  @Input() contentEditable: string = '';

  constructor(private el: ElementRef) { }
  // The method that sets and sanitizes the value in the form control 
  writeValue(value: any): void {
    this.el.nativeElement.innerHTML = value ? DOMPurify.sanitize(value) : '';
  }

  // The method that registers the onChange callback to update the value in the form control 
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  // The method that registers the onTouched callback 
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  // Triggered when the content of the element changes
  @HostListener('input', ['$event'])
  onInput(event: Event): void {
    const sanitizedContent = DOMPurify.sanitize(this.el.nativeElement.innerHTML);
    this.onChange(sanitizedContent);
  }

  // Called when the element is blurred (loses focus) 
  @HostListener('blur', ['$event'])
  onBlur(event: Event): void { this.onTouched(); }

  // The onChange function that will be called when the value changes 
  private onChange = (value: any) => { };

  // The onTouched function that will be called when the field is blurred 
  private onTouched = () => { };
}