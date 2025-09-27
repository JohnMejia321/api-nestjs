import { registerDecorator, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

@ValidatorConstraint({ async: false })
export class IsAllowedEmailDomainConstraint implements ValidatorConstraintInterface {
  validate(email: string) {
    if (!email) return false;
    const allowedDomains = ['gmail.com', 'outlook.com', 'yahoo.com', 'hotmail.com']; // Lista de dominios permitidos
    const domain = email.split('@')[1];
    return allowedDomains.includes(domain);
  }

  defaultMessage() {
    return 'El dominio del email no está permitido. Dominios permitidos: gmail.com, outlook.com, yahoo.com, hotmail.com';
  }
}

export function IsAllowedEmailDomain(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsAllowedEmailDomainConstraint,
    });
  };
}