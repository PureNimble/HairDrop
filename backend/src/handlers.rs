use crate::models::{NewUser, User};
use crate::r2d2;
use crate::schema::users::dsl::*;
use actix_web::{web, HttpResponse, Responder};
use bcrypt::{hash, verify};
use diesel::prelude::*;
use diesel::r2d2::{ConnectionManager, Pool};
use diesel::sql_types::{Integer, Timestamp, VarChar};
use serde::Deserialize;

#[derive(Deserialize)]
pub struct RegisterData {
    pub username: String,
    pub email: String,
    pub password: String,
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
        email: form.email.clone(),
        password_hash: hashed_password, // Use the renamed variable here
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

    // Find the user by username

    let result = users
        .filter(username.eq(&form.username))
        .first::<User>(&mut conn);

    match result {
        Ok(user) => {
            // Verify the password
            if verify(&form.password, &user.password_hash).unwrap_or(false) {
                HttpResponse::Ok().json("Login successful")
            } else {
                HttpResponse::Unauthorized().body("Invalid password")
            }
        }
        Err(_) => HttpResponse::NotFound().body("User not found"),
    }
}
