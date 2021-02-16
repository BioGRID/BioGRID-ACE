// Incorporate a synchronous delay, good for testing workflow of
// some pages. Delay is in milliseconds.
export function syncDelay (delay: number) {
    const start = Date.now()
    let now = start
    while (now - start < delay) {
        now = Date.now()
    }
}

// Split a string on spaces, except when the spaces
// are surrounded by quotes
// taken from here:
// https://stackoverflow.com/questions/4031900/split-a-string-by-whitespace-keeping-quoted-segments-allowing-escaped-quotes/46946420#46946420
// @credit Tsuneo Yoshioka
export function tokenizeSearchString (searchText: string): string[] {
    const matches = searchText.match(/\\?.|^$/g)!.reduce((p: any, c: any) => {
        if (c === '"') {
            /* tslint:disable:no-bitwise */
            p.quote ^= 1
            /* tslint:enable:no-bitwise */
        } else if (!p.quote && c === ' ') {
            p.a.push('')
        } else {
            p.a[p.a.length - 1] += c.replace(/\\(.)/, '$1')
        }
        return p
    }, { a: [''] }).a

    if (matches != null) {
        return matches
    }

    return []
}

// Asynchronous Delay function
// time is in milliseconds
export function asyncTimeout (ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

// Check if a value of type valueType already exists in an array. Additional values and types can be checked as well.
export function isStringInArrayOfObjects (value: string, listOfOptions: any[], valueType: string, listOfAdditionalValues: any[]) {
    for (const item of Object.values(listOfOptions)) {
        if (item[valueType] === value) {
            if (listOfAdditionalValues && listOfAdditionalValues.length > 0) {
                let foundAllMatchingValues = false
                for (const extraValue of Object.values(listOfAdditionalValues)) {
                    for (const [matchingKey, matchingValue] of Object.entries(extraValue)) {
                        if (item[matchingKey] === matchingValue) {
                            foundAllMatchingValues = true
                        } else {
                            foundAllMatchingValues = false
                        }
                    }
                }
                if (foundAllMatchingValues) {
                    return false
                }
            } else {
                return false
            }
        }
    }
    return true
}

// Test if a number is a numeric value
export function isNumeric (n: any) {
    return !isNaN(parseFloat(n)) && isFinite(n)
}
