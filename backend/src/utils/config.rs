use dotenv::dotenv;
use std::env;

pub struct ServerConfig {
    pub host: String,
    pub port: u16,
    pub db_url: String,
    pub jwt_secret: String,
}

impl ServerConfig {
    pub fn from_env() -> Self {
        dotenv().ok(); // Load .env variables into the environment

        let host = env::var("SERVER.HOST").expect("SERVER.HOST must be set");
        let port = env::var("SERVER.PORT")
            .expect("SERVER.PORT must be set")
            .parse()
            .expect("SERVER.PORT must be a valid number");

        let db_url = env::var("DATABASE_URL").expect("DATABASE_URL must be set");

        let jwt_secret = env::var("JWT_SECRET").expect("JWT_SECRET must be set");

        ServerConfig {
            host,
            port,
            db_url,
            jwt_secret,
        }
    }
}
