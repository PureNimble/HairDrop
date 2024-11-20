use crate::jwt::create_jwt;
use crate::models::user::User;
use crate::schema::user::dsl::*;
use actix_web::{web, HttpResponse, Responder};
use bcrypt::verify;
use diesel::prelude::*;
use diesel::r2d2::{ConnectionManager, Pool};
use serde::Deserialize;

#[derive(Deserialize)]
pub struct LoginData {
    pub email: String,
    pub password: String,
}
pub async fn login_user(
    pool: web::Data<Pool<ConnectionManager<MysqlConnection>>>,
    form: web::Json<LoginData>,
) -> impl Responder {
    let mut conn = match pool.get() {
        Ok(conn) => conn,
        Err(_) => return HttpResponse::InternalServerError().body("Failed to get DB connection"),
    };

    let result = user.filter(email.eq(&form.email)).first::<User>(&mut conn);

    match result {
        Ok(other_user) => {
            if verify(&form.password, &other_user.password_hash).unwrap_or(false) {
                // Generate JWT token
                let token = create_jwt(&other_user.email);
                HttpResponse::Ok().json(token)
            } else {
                HttpResponse::Unauthorized().body("Invalid password")
            }
        }
        Err(_) => HttpResponse::NotFound().body("User not found"),
    }
}
