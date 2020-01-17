
import 'quill';

export interface Config {
  container: string;
}

export interface QuillInstance {
  on: any;
}

export default class Counter {
  quill: any;
  options: any;
public textarea;
 constructor(quill: any, options: any) {
        this.quill = quill;
        this.options = options;
        this.addTextarea();
        this.bindEditorBehavior();
        this.bindButtonBehavior();
}

 public addTextarea() {
        let container = this.quill.addContainer('ql-custom');

        this.textarea = document.createElement('textarea');
        this.textarea.className = "ql-edit-html-textarea";
        this.textarea.style.display = "none";

        container.appendChild(this.textarea);
    }

  public bindEditorBehavior() {
        let editor = document.querySelector('.ql-editor');

        this.quill.on('text-change', () => {
            if (editor) {
                let html = editor.innerHTML;

                this.textarea.value = html;
            }
        });
    }

  public bindButtonBehavior() {
        let button = document.querySelector('.ql-edit-html');

        if (button) {
            button.addEventListener('click', () => {
                if (this.textarea.style.display === '') {
                    let html = this.textarea.value;

                    this.quill.pasteHTML(html);
                }

                this.textarea.style.display = this.textarea.style.display === 'none' ? '' : 'none';
            });
        }
    }
}