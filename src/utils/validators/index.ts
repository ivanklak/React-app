export interface IFieldValidator {
  (value: string): string | undefined;
}

export const required: IFieldValidator = value => {
  if (value) {
    return undefined;
  }

  return 'Field is required';
};

export const maxLengthCreator =
  (maxLength: number): IFieldValidator =>
  value => {
    if (value.length > maxLength) {
      return `Max length is ${maxLength} symbols`;
    }

    return undefined;
  };
