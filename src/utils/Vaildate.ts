export interface ValidationItem<K extends string = string> {
  key: K;
  message: string;
  isValid: boolean;
}

export type ValidationErrors<K extends string> = Record<K, string>;

export function isValidFields<K extends string>(items: ValidationItem<K>[]): boolean {
  return items.every(({ isValid }) => isValid);
}

export function validateFields<K extends string>(
  items: ValidationItem<K>[],
  setErrors: (errors: ValidationErrors<K>) => void,
): boolean {
  const newErrors = {} as ValidationErrors<K>;

  items.forEach(({ key, message, isValid }) => {
    newErrors[key] = isValid ? '' : message;
  });

  setErrors(newErrors);

  return Object.values(newErrors).every((msg) => msg === '');
}
