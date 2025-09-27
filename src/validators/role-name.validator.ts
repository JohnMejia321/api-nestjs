import { registerDecorator, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

@ValidatorConstraint({ async: false })
export class IsValidRoleNameConstraint implements ValidatorConstraintInterface {
  validate(name: string) {
    if (!name) return false;
    // Solo letras, números, espacios y guiones
    const regex = /^[a-zA-Z0-9\s\-]+$/;
    return regex.test(name);
  }

  defaultMessage() {
    return 'El nombre del rol solo puede contener letras, números, espacios y guiones';
  }
}

export function IsValidRoleName(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsValidRoleNameConstraint,
    });
  };
}