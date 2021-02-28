// Generate validation error messages
// based on the type of validator and passed in parameters
export function generateValidationError (validationType: string, field: string, param1: string | null) {
    switch (validationType.toLowerCase()) {
        case 'required' :
            return field + ' cannot be empty'

        case 'lettersandspacesonly' :
            return field + ' must contain only letters and spaces'

        case 'printableasciionly' :
            return field + ' must contain only printable ascii characters'

        case 'email' :
            return field + ' must be a valid email'

        case 'minlength' :
            return field + ' must be at least ' + param1 + ' in length'

        case 'maxlength' :
            return field + ' must be no more than ' + param1 + ' in length'

        case 'sameas' :
            return field + ' must be identical to ' + param1

        case 'passwordcomplexity' :
            return field + ' must contain at least one capital letter, one number, and one special character'

        case 'numeric' :
            return field + ' must contain only numbers'

        case 'valueinarray' :
            return field + ' already exists'

        case 'decimal' :
            return field + ' must contain only decimal (float) values'

        case 'complexnumericnewlines' :
            return field + ' must contain only valid decimal (float) values, separated by newlines'
    }
}
