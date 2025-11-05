import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

export function IsBefore(property: string, validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: 'isBefore',
            target: object.constructor,
            propertyName: propertyName,
            constraints: [property],
            options: validationOptions,
            validator: {
                validate(value: any, args: ValidationArguments) {
                    const [relatedPropertyName] = args.constraints;
                    const relatedValue = (args.object as any)[relatedPropertyName];

                    if (!value || !relatedValue) {
                        return true; // Let other validators handle missing values
                    }

                    return new Date(value) < new Date(relatedValue);
                },
                defaultMessage(args: ValidationArguments) {
                    const [relatedPropertyName] = args.constraints;
                    return `${args.property} must be before ${relatedPropertyName}`;
                },
            },
        });
    };
}