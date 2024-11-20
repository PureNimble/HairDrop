export const passwordRequirements = [
    "Be at least 8 characters long",
    "Contain at least one uppercase letter",
    "Contain at least one lowercase letter",
    "Include at least one number",
    "Contain at least one special character (e.g., !@#$%^&*)",
    "Not contain spaces"
];

export const validatePassword = (password) => {
    const validationRules = [
        { test: (pwd) => pwd.length >= 8 },
        { test: (pwd) => /[A-Z]/.test(pwd) },
        { test: (pwd) => /[a-z]/.test(pwd) },
        { test: (pwd) => /[0-9]/.test(pwd) },
        { test: (pwd) => /[!@#$%^&*(),.?":{}|<>]/.test(pwd) },
        { test: (pwd) => !/\s/.test(pwd) },
    ];

    const failedRules = validationRules
        .map((rule, index) => (rule.test(password) ? null : passwordRequirements[index]))
        .filter(Boolean);

    return failedRules.length === 0 ? [] : failedRules;
};
