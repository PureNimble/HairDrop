use crate::models::{NewUser, User};
use crate::r2d2;
use crate::schema::users::dsl::*;
use actix_web::{web, HttpResponse, Responder};
use bcrypt::{hash, verify};
use diesel::prelude::*;
use diesel::r2d2::{ConnectionManager, Pool};
use serde::Deserialize;

#[derive(Deserialize)]
pub struct RegisterData {
    pub username: String,
    pub password: String,
    pub email: String,
}

#[derive(Deserialize)]
pub struct LoginData {
    pub username: String,
    pub password: String,
}

pub async fn register_user(
    pool: web::Data<Pool<ConnectionManager<MysqlConnection>>>,
    form: web::Json<RegisterData>,
) -> impl Responder {
    let mut conn = pool.get().expect("Failed to get DB connection");

    // Hash the password
    let hashed_password = match hash(&form.password, 4) {
        Ok(h) => h,
        Err(_) => return HttpResponse::InternalServerError().finish(),
    };

    let new_user = NewUser {
        username: form.username.clone(),
        password_hash: hashed_password, // Use the renamed variable here
        email: form.email.clone(),
    };

    diesel::insert_into(users)
        .values(&new_user)
        .execute(&mut conn)
        .expect("Error inserting new user");

    HttpResponse::Ok().json("User registered successfully")
}

pub async fn login_user(
    pool: web::Data<r2d2::Pool<ConnectionManager<MysqlConnection>>>,
    form: web::Json<LoginData>,
) -> impl Responder {
    let mut conn = match pool.get() {
        Ok(conn) => conn,
        Err(_) => return HttpResponse::InternalServerError().body("Failed to get DB connection"),
    };

    // Get user password hash
    let result = users
        .filter(username.eq(&form.username))
        .select(password_hash)
        .first::<String>(&mut conn);

    match result {
        Ok(password) => {
            // Verify the password
            if verify(&form.password, &password).unwrap_or(false) {
                HttpResponse::Ok().json("Login successful")
            } else {
                HttpResponse::Unauthorized().body("Invalid password")
            }
        }
        Err(diesel::result::Error::NotFound) => HttpResponse::NotFound().body("User not found"),
        Err(_) => HttpResponse::InternalServerError().body("Database error"),
    }
}
