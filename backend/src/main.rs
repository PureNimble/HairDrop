mod jwt;
mod models;
mod schema;
mod services;
mod utils;

use actix_cors::Cors;
use actix_limitation::Limiter;
use actix_web::{web, App, HttpServer};
use diesel::mysql::MysqlConnection;
use diesel::r2d2::{self, ConnectionManager};
use lazy_static::lazy_static;
use std::sync::Arc;
use std::time::Duration;
use utils::config::ServerConfig;

use post_login::login_user;
use post_register::register_user;
use post_search::vulnerable_search;
use post_searchsafe::secure_search;
use services::{post_login, post_register, post_search, post_searchsafe};

type Pool = r2d2::Pool<ConnectionManager<MysqlConnection>>;

lazy_static! {
    static ref SERVER_CONFIG: Arc<ServerConfig> = Arc::new(ServerConfig::from_env());
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    let database_url = SERVER_CONFIG.db_url.clone();

    // Create a connection pool
    let manager = ConnectionManager::<MysqlConnection>::new(database_url);
    let pool = Pool::builder()
        .build(manager)
        .expect("Failed to create pool.");
    println!(
        "Server started at http://{}:{}/",
        SERVER_CONFIG.host, SERVER_CONFIG.port
    );

    // Start the HTTP server
    HttpServer::new(move || {
        let cors = Cors::default()
            .allowed_origin("https://hairdrop.me")
            .allow_any_method()
            .allow_any_header()
            .max_age(3600);

        // Rate limit requests to 5 per minute per IP
        let limiter = Limiter::new().limit_by_ip(5, Duration::from_secs(60));

        App::new()
            .wrap(cors) // Attach CORS middleware
            .wrap(limiter) // Attach rate limiting middleware
            .app_data(web::Data::new(pool.clone()))
            .route("/register", web::post().to(register_user))
            .route("/login", web::post().to(login_user))
            .route("/search", web::post().to(vulnerable_search))
            .route("/searchSafe", web::post().to(secure_search))
    })
    .bind((SERVER_CONFIG.host.as_str(), SERVER_CONFIG.port))?
    .run()
    .await
}
