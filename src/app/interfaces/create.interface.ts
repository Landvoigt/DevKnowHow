import { FormControl, FormGroup, Validators } from "@angular/forms";
import { EmailRegex, NameRegex } from "@utils/regex";

export interface CreateFormModel {
    name: FormControl<string | null>;
    email: FormControl<string | null>;
    body: FormGroup<{
        category: FormControl<string | null>;
        subCategory: FormControl<string | null>;
        newCategory: FormControl<string | null>;
        command: FormControl<string | null>;
        description: FormControl<string | null>;
        example: FormControl<string | null>;
        param: FormControl<'sudo' | null>;
    }>;
    message: FormControl<string | null>;
}

export function createForm(): FormGroup<CreateFormModel> {
    return new FormGroup<CreateFormModel>({
        name: new FormControl<string | null>(null, [Validators.required, Validators.pattern(NameRegex),]),
        email: new FormControl<string | null>(null, [Validators.required, Validators.pattern(EmailRegex),]),
        body: new FormGroup({
            category: new FormControl<string | null>(null, Validators.required),
            subCategory: new FormControl<string | null>(null),
            newCategory: new FormControl<string | null>(null),
            command: new FormControl<string | null>(null, Validators.required),
            description: new FormControl<string | null>(null, Validators.required),
            example: new FormControl<string | null>(null),
            param: new FormControl<'sudo' | null>(null),
        }),
        message: new FormControl<string | null>(null),
    });
}