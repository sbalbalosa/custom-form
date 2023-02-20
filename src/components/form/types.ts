export type Validation = (value: string) => string | null;

export type FormValidations = Record<string, Validation[] | undefined>;
export type FormErrors = Record<string, string | undefined>;

export type FormMetaState = {
  isValid: boolean;
  isBootstraped: boolean;
};

export type FieldState =
  | {
      error?: string;
      value?: string;
      touched?: boolean;
    }
  | undefined;

export type FormState = {
  form: FormMetaState;
  fields: Record<string, FieldState>;
};

export type Field = NonNullable<FieldState>;
export type FieldKeys = keyof Field;
export type FieldValues = Field[keyof Field];
export type FieldError = Field["error"];
export type FieldValue = Field["value"];
export type FieldTouched = Field["touched"];

export type StoreSubscriber = ((state: FormState) => void) | null;
