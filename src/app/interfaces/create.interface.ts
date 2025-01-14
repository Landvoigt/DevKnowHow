import { FormControl, FormGroup, Validators } from "@angular/forms";
import { EmailRegex, NameRegex } from "@utils/regex";

export interface CreateFormModel {
    name: FormControl<string | null>;
    email: FormControl<string | null>;
    body: FormGroup<{
        command: FormControl<string | null>;
        description: FormControl<string | null>;
        category: FormControl<string | null>;
        newCategory: FormControl<string | null>;
        subCategory: FormControl<string | null>;
        newSubCategory: FormControl<string | null>;
        example: FormControl<string | null>;
        tooltip: FormControl<string | null>;
    }>;
    message: FormControl<string | null>;
}

export function createForm(): FormGroup<CreateFormModel> {
    return new FormGroup<CreateFormModel>({
        name: new FormControl<string | null>(null, [Validators.required, Validators.pattern(NameRegex),]),
        email: new FormControl<string | null>(null, [Validators.required, Validators.pattern(EmailRegex),]),
        body: new FormGroup({
            command: new FormControl<string | null>(null, Validators.required),
            description: new FormControl<string | null>(null, Validators.required),
            category: new FormControl<string | null>(null, Validators.required),
            newCategory: new FormControl<string | null>(null),
            subCategory: new FormControl<string | null>(null),
            newSubCategory: new FormControl<string | null>(null),
            example: new FormControl<string | null>(null),
            tooltip: new FormControl<string | null>(null),
        }),
        message: new FormControl<string | null>(null),
    });
}