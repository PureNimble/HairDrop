use crate::models::user::NewUser;
use crate::schema::user::dsl::*;
use crate::utils::passwordpolicy::validate_password;
use actix_web::{web, HttpResponse, Responder};
use bcrypt::hash;
use diesel::prelude::*;
use diesel::r2d2::{ConnectionManager, Pool};
use serde::Deserialize;

#[derive(Deserialize)]
pub struct RegisterData {
    pub email: String,
    pub first_name: String,
    pub last_name: String,
    pub password: String,
}

pub async fn register_user(
    pool: web::Data<Pool<ConnectionManager<MysqlConnection>>>,
    form: web::Json<RegisterData>,
) -> impl Responder {
    let mut conn = pool.get().expect("Failed to get DB connection");

    let password_errors = validate_password(&form.password);
    if !password_errors.is_empty() {
        return HttpResponse::BadRequest().json(password_errors);
    }

    // Hash the password
    let hashed_password = match hash(&form.password, 4) {
        Ok(h) => h,
        Err(_) => return HttpResponse::InternalServerError().finish(),
    };

    let new_user = NewUser {
        email: form.email.clone(),
        first_name: form.first_name.clone(),
        last_name: form.last_name.clone(),
        password_hash: hashed_password,
    };

    diesel::insert_into(user)
        .values(&new_user)
        .execute(&mut conn)
        .expect("Error inserting new user");

    HttpResponse::Ok().json("User registered successfully")
}
