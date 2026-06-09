import { BadRequestException } from '@nestjs/common';
import type { ValidationError } from 'class-validator';

function collectValidationMessages(errors: ValidationError[]): string[] {
  const messages: string[] = [];
  for (const error of errors) {
    if (error.constraints) {
      messages.push(...Object.values(error.constraints));
    }
    if (error.children?.length) {
      messages.push(...collectValidationMessages(error.children));
    }
  }
  return messages;
}

export function validationExceptionFactory(errors: ValidationError[]): BadRequestException {
  const messages = collectValidationMessages(errors);
  const message = messages[0] ?? 'اطلاعات ارسالی نامعتبر است';
  return new BadRequestException(message);
}
