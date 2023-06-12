import { ValidatorFn, FormControl } from '@angular/forms';
export const trimValidator: ValidatorFn = (control: FormControl) => {
  if (control.value.startsWith(' ')) {
    return {
      'required': { value: 'control has leading whitespace' }
    };
  }
  if (control.value.endsWith(' ')) {
    return {
      'required': { value: 'control has trailing whitespace' }
    };
  }
  return null;
};
