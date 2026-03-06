import { Validation } from "../interfaces/validation";
import { ValidationComposite } from "../validations/validationComposite";
import { RequiredFieldsValidation } from "../validations/requiredFieldsValidation";
import { DateValidation } from "../validations/dateValidation";
import { DateValidatorAdapter } from "../dateValidatorAdapter";

export const addTaskValidationCompositeFactory = (): ValidationComposite => {
    const validations: Validation[] = [];

    for (const field of ["title", "description", "date"]) {
        validations.push(new RequiredFieldsValidation(field));
    }

    validations.push(new DateValidation("date", new DateValidatorAdapter()));

    return new ValidationComposite(validations);
};