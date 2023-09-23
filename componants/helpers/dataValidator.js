export function phoneValidator(phone, language) {
    const messages = {
        en: {
            empty: 'Please enter a phone number.',
            invalid: 'Invalid phone number.'
        },
        ar: {
            empty: 'يرجى إدخال رقم الهاتف.',
            invalid: 'رقم الهاتف غير صحيح.'
        }
    };

    if (!phone || phone.length === 0) {
        return messages[language].empty;
    }

    const phoneRegex = /^[0-9]{11}$/; // 10 digits phone number format
    if (!phoneRegex.test(phone)) {
        return messages[language].invalid;
    }

    return '';
}

export function nameValidator(name, language) {
    const messages = {
        en: {
            empty: 'Please enter a name.'
        },
        ar: {
            empty: 'يرجى إدخال الاسم.'
        }
    };

    if (!name || name.length === 0) {
        return messages[language].empty;
    }

    return '';
}

export function addressValidator(address, language) {
    const messages = {
        en: {
            empty: 'Please enter an address.'
        },
        ar: {
            empty: 'يرجى إدخال العنوان.'
        }
    };

    if (!address || address.length === 0) {
        return messages[language].empty;
    }

    return '';
}

export function usernameValidator(username, language) {
    const messages = {
        en: {
            empty: 'Please enter a username.'
        },
        ar: {
            empty: 'يرجى إدخال اسم المستخدم.'
        }
    };

    if (!username || username.length === 0) {
        return messages[language].empty;
    }

    return '';
}

export function passwordValidator(password, language) {
    const messages = {
        en: {
            empty: 'Please enter a password.',
            short: 'Password must be at least 5 characters long.'
        },
        ar: {
            empty: 'يرجى إدخال كلمة المرور.',
            short: 'يجب أن تكون كلمة المرور على الأقل 5 أحرف.'
        }
    };

    if (!password) return messages[language].empty;
    if (password.length < 5) return messages[language].short;
    return '';
}

export function emailValidator(email, language) {
    const messages = {
        en: {
            empty: 'Please enter an email address.',
            invalid: 'Invalid email address.'
        },
        ar: {
            empty: 'يرجى إدخال البريد الإلكتروني.',
            invalid: 'عفوًا! نحتاج إلى عنوان بريد إلكتروني صحيح.'
        }
    };

    const re = /\S+@\S+\.\S+/;
    if (!email) return messages[language].empty;
    if (!re.test(email)) return messages[language].invalid;
    return '';
}

export function tradingExperienceYearsValidator(year, language) {
    const messages = {
        en: {
            empty: 'Please enter the number of trading experience years.',
            short: 'Trading experience years must be at least 2 characters long.'
        },
        ar: {
            empty: 'يرجى إدخال عدد سنوات الخبرة في التداول.',
            short: 'يجب أن تكون عدد سنوات الخبرة في التداول على الأقل 2 أحرف.'
        }
    };

    if (!year) return messages[language].empty;
    if (year.length < 2) return messages[language].short;
    return '';
}
