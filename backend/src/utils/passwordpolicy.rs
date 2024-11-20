use regex::Regex;

pub fn validate_password(password: &str) -> Vec<String> {
    let mut errors = Vec::new();

    if password.len() < 8 {
        errors.push("Password must be at least 8 characters long.".to_string());
    }

    if !Regex::new(r"[A-Z]").unwrap().is_match(password) {
        errors.push("Password must contain at least one uppercase letter.".to_string());
    }

    if !Regex::new(r"[a-z]").unwrap().is_match(password) {
        errors.push("Password must contain at least one lowercase letter.".to_string());
    }

    if !Regex::new(r"[0-9]").unwrap().is_match(password) {
        errors.push("Password must contain at least one number.".to_string());
    }

    if !Regex::new(r"[!@#$%^&*(),.?\:{}|<>]").unwrap().is_match(password) {
        errors.push("Password must contain at least one special character.".to_string());
    }

    if password.contains(' ') {
        errors.push("Password must not contain spaces.".to_string());
    }

    errors
}
