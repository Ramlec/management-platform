import { registerDecorator, ValidationArguments, ValidationOptions } from "class-validator";

export function IsBefore(property: string, validationOptions?: ValidationOptions) {
    return function (object: object, propertyName: string) {
        registerDecorator({
            constraints: [property],
            name: `isBefore`,
            options: validationOptions,
            propertyName: propertyName,
            target: object.constructor,
            validator: {
                defaultMessage(args: ValidationArguments) {
                    const [relatedPropertyName] = args.constraints as [string];
                    return `${args.property} must be before ${relatedPropertyName}`;
                },
                validate(value: Date | number | string | undefined, args: ValidationArguments) {
                    const [relatedPropertyName] = args.constraints as [string];
                    const relatedValue = (args.object as Record<string, unknown>)[
                        relatedPropertyName
                    ] as Date | number | string | undefined;

                    if (!value || !relatedValue) {
                        return true; // Let other validators handle missing values
                    }

                    return new Date(value) < new Date(relatedValue);
                },
            },
        });
    };
}
