import { registerDecorator, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

@ValidatorConstraint({ async: false })
export class IsValidUsernameConstraint implements ValidatorConstraintInterface {
  validate(username: string) {
    if (!username) return false;
    // Solo letras, números y guiones bajos
    const regex = /^[a-zA-Z0-9_]+$/;
    return regex.test(username);
  }

  defaultMessage() {
    return 'El username solo puede contener letras, números y guiones bajos (_)';
  }
}

export function IsValidUsername(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsValidUsernameConstraint,
    });
  };
}