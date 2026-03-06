import { Validation } from "../interfaces/validation";
import { ValidationComposite, RequiredFieldsValidation, DateValidation } from "../validations/index";
import { DateValidatorAdapter } from "../dateValidatorAdapter";

export const addTaskValidationCompositeFactory = (): Validation => {
    const validations: Validation[] = [];

    for (const field of ["title", "description", "date"]) {
        validations.push(new RequiredFieldsValidation(field));
    }

    validations.push(new DateValidation("date", new DateValidatorAdapter()));

    return new ValidationComposite(validations);
};