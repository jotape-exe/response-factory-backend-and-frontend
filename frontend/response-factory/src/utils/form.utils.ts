import type { FormErrors } from "../types/form-errors.interface"

export const mapErrors = <T>(details: any[]): FormErrors<T> => {
  const errors: FormErrors<T> = {}

  for (const err of details) {
    const field = err.path?.[0]
    if (field) {
      errors[field as keyof T] = err.message
    }
  }

  return errors
}
