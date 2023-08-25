import { Component, Input, OnDestroy, OnInit, Self } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { Editor, toHTML, Toolbar } from 'ngx-editor';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-rich-text',
  templateUrl: './rich-text.component.html',
  styleUrls: ['./rich-text.component.scss'],
})
export class RichTextComponent
  implements OnInit, OnDestroy, ControlValueAccessor
{
  private initialized = false;
  @Input() currentLang = 'en';
  @Input() readOnly: boolean;
  localizedObject;

  borderColor = '#D9D9DE';

  // Rich Text Provider Properties
  editor = new Editor({
    history: true,
    inputRules: true,
    keyboardShortcuts: true,
    features: {
      linkOnPaste: true,
    },
  });

  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];

  constructor(@Self() public ngControl: NgControl) {
    ngControl.valueAccessor = this;
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }

  clear() {
    this.initialized = false;
    this.firstFocus = false;
    this.localizedObject = null;
  }
  ngOnInit(): void {
    this.editor.valueChanges
      .pipe(untilDestroyed(this))
      .subscribe((data: any) => {
        if (data.content && data.content.length) {
          const first = data.content[0];
          if (first.content) {
            this.localizedObject[this.currentLang] = toHTML(data);
            this.setData();
            return;
          }
        }

        this.localizedObject[this.currentLang] = null;
        this.setData();
      });

    this.ngControl.control.setValidators((control) => {
      const value = control.value;
      const isValid = value && (value.ar || value.en);
      return isValid ? null : [];
    });
  }

  setData() {
    this.ngControl.control.setValue(this.localizedObject);
  }

  // FORM
  firstFocus: boolean;
  writeValue(obj: any): void {
    this.localizedObject = obj || {};
    if (this.initialized) {
      return;
    }

    this.initialized = true;
  }

  registerOnChange(fn: any): void {}

  registerOnTouched(fn: any): void {}
}

// Quill Editor Code
// @ViewChild('quillEditor') quill: QuillEditorComponent;
// styles = {
//   'min-height': '200px',
//   'border-bottom-right-radius': '5px',
//   'border-bottom-left-radius': '5px',
// };
// [
//   ['bold', 'italic', 'underline', 'strike'],
//   [{ color: [] }, { background: [] }],
//   ['blockquote', 'code-block'],
//
//   [{ header: 1 }, { header: 2 }], // custom button values
//   [{ list: 'ordered' }, { list: 'bullet' }],
//   [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
//   [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
//   [{ direction: 'rtl' }], // text direction
//
//   // [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
//   [{ header: [1, 2, 3, 4, 5, 6, false] }],
//   //
//   // [{ font: [] }],
//   [{ align: [] }],
//   ['clean'], // remove formatting button
//   ['link'], // link and image, video
// ],

// modules: QuillModules = {
//   toolbar: {
//     container: '#toolbar',
//   },
// };

// MarkUp

// <!--<quill-editor-->
// <!--  #quillEditor-->
// <!--  [readOnly]="readOnly"-->
// <!--  [modules]="modules"-->
// <!--  [styles]="styles"-->
// <!--  [(ngModel)]="localizedObject[currentLang]"-->
// <!--  (onContentChanged)="setData()"-->
// <!--  dir="rtl"-->
// <!--&gt;-->
// <!--</quill-editor>-->
