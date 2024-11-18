extern crate diesel;

mod config;
mod handlers;
mod jwt;
mod models;
mod schema;

use actix_web::{web, App, HttpServer};
use config::ServerConfig;
use diesel::mysql::MysqlConnection;
use diesel::r2d2::{self, ConnectionManager};

type Pool = r2d2::Pool<ConnectionManager<MysqlConnection>>;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    // Load the server configuration from the environment
    let server_config = ServerConfig::from_env();
    let database_url = server_config.db_url;

    // Create a connection pool
    let manager = ConnectionManager::<MysqlConnection>::new(database_url);
    let pool = Pool::builder()
        .build(manager)
        .expect("Failed to create pool.");
    println!(
        "Server started at http://{}:{}/",
        server_config.host, server_config.port
    );

    // Start the HTTP server
    HttpServer::new(move || {
        App::new()
            .app_data(web::Data::new(pool.clone()))
            .route("/register", web::post().to(handlers::register_user))
            .route("/login", web::post().to(handlers::login_user))
            .route("/users", web::get().to(handlers::get_users))
    })
    .bind((
        server_config.host.as_str(),
        server_config.port.parse().expect("Invalid Number"),
    ))?
    .run()
    .await
}