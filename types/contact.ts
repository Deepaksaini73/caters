export type FormState = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export type ContactFormProps = {
  formState: FormState;
  isSubmitting: boolean;
  isSubmitted: boolean;
  error: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
}