import {
  AfterViewInit, Component, ElementRef, forwardRef, Input, NgZone, OnDestroy,
  ViewChild
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
declare let tinymce: any;

export const TINYMCE_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => InquiryTinyComponent),
  multi: true
};

@Component({
  selector: 'simple-tiny',
  template: `<textarea #textArea [value]="value"></textarea>`,
  providers: [TINYMCE_VALUE_ACCESSOR]
})

export class InquiryTinyComponent implements AfterViewInit, OnDestroy, ControlValueAccessor {
  @Input() setReadOnly: number;
  @Input() isEnhanced: string;
  @ViewChild('textArea') textArea: ElementRef;
  editor: any;
  value: string;
  onChange = (_: any) => { };

  constructor(private zone: NgZone) {

  }
  writeValue(value: any): void {

    this.value = value;
    this.ngOnDestroy();
    this.ngAfterViewInit();
    if (this.editor) {

      this.editor.setContent(value || '', { format: 'raw' });

    }

  }

  registerOnChange(fn: (_: any) => void): void {
    this.onChange = fn;

  }

  ngAfterViewInit() {

    tinymce.init({

      target: this.textArea.nativeElement,
      menubar: false,
      branding: false,
      skin_url: 'assets/skins/ui/oxide',
      height: '350',
      readonly: this.setReadOnly == 0 ? false : true,
      /* display statusbar */
      statubar: true,
      force_br_newlines: true,
      force_p_newlines: false,
      forced_root_block: '',

      /* plugin */
      plugins: [
        'advlist autolink link lists'
      ],
      default_link_target: '_blank',
      extended_valid_elements: 'a[href|target=_blank]',
      /* toolbar */
      toolbar: this.isEnhanced == 'true' ? 'undo redo | bold italic underline | fontselect |  fontsizeselect | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link' : 'undo redo | bold italic underline | alignleft aligncenter alignright alignjustify',
      /** ADDED FOR FONT SIZE */
      fontsize_formats: '8pt 10pt 12pt 14pt 18pt 24pt 36pt',
      setup: editor => {
        this.editor = editor;
        editor.on('change', () => {

          const content = editor.getContent();

          this.zone.run(() => this.onChange(content));

        });

        editor.on('click', (e, d) => {

          if (e.target.nodeName !== undefined && e.target.nodeName == 'A') {
            window.open(e.target.href, '_blank');
          }

        });

      },

    });

  }


  registerOnTouched(fn: () => void): void {

  }

  ngOnDestroy() {
    tinymce.remove(this.editor);
  }
}




