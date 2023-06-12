import { DynamicFormBase } from "./dynamic-form-base";

export class TextboxQuestion extends DynamicFormBase<string> {
  controlType = 'textbox';
  type: string;

  constructor(options: {} = {}) {
    super(options);
    this.type = options['type'] || '';
  }
}
