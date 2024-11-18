use jsonwebtoken::{decode, encode, Algorithm, DecodingKey, EncodingKey, Header, Validation};
use serde::{Deserialize, Serialize};
use std::time::{SystemTime, UNIX_EPOCH};

#[derive(Serialize, Deserialize)]
pub struct Claims {
    sub: String, // Subject (username or user ID)
    exp: usize,  // Expiry time as UNIX timestamp
}

const SECRET_KEY: &[u8] = b"your_secret_key";

pub fn create_jwt(username: &str) -> String {
    let expiration = SystemTime::now()
        .duration_since(UNIX_EPOCH)
        .unwrap()
        .as_secs() as usize
        + 3600; // Token valid for 1 hour

    let claims = Claims {
        sub: username.to_owned(),
        exp: expiration,
    };

    encode(
        &Header::default(),
        &claims,
        &EncodingKey::from_secret(SECRET_KEY),
    )
    .expect("Failed to generate token")
}

pub fn verify_jwt(token: &str) -> Result<Claims, jsonwebtoken::errors::Error> {
    decode::<Claims>(
        token,
        &DecodingKey::from_secret(SECRET_KEY),
        &Validation::new(Algorithm::HS256),
    )
    .map(|data| data.claims)
}
