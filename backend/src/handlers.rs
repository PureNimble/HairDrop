use crate::jwt::{create_jwt, verify_jwt};
use crate::models::{NewUser, User};
use crate::schema::user::dsl::*;
use actix_web::{web, HttpRequest, HttpResponse, Responder};
use bcrypt::{hash, verify};
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

#[derive(Deserialize)]
pub struct LoginData {
    pub email: String,
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

pub async fn vulnerable_search(
    pool: web::Data<Pool<ConnectionManager<MysqlConnection>>>,
    body: String,
    req: HttpRequest,
) -> impl Responder {
    let auth_header = req
        .headers()
        .get("Authorization")
        .and_then(|header| header.to_str().ok());

    if let Some(auth_header) = auth_header {
        if let Some(token) = auth_header.strip_prefix("Bearer ") {
            match verify_jwt(token) {
                Ok(_claims) => {
                    let mut conn = match pool.get() {
                        Ok(conn) => conn,
                        Err(_) => {
                            return HttpResponse::InternalServerError()
                                .body("Failed to get DB connection");
                        }
                    };

                    let search_term = body.trim().replace('"', "");
                    let sql = format!("SELECT * FROM user WHERE email LIKE '%{}%'", search_term);
                    let result = diesel::sql_query(sql).load::<User>(&mut conn);
                    return match result {
                        Ok(users) => HttpResponse::Ok().json(users),
                        Err(_) => {
                            HttpResponse::InternalServerError().body("Failed to perform search")
                        }
                    };
                }
                Err(_) => return HttpResponse::Unauthorized().body("Invalid token"),
            }
        }
    }

    HttpResponse::Unauthorized().body("Authorization header missing or invalid")
}

pub async fn secure_search(
    pool: web::Data<Pool<ConnectionManager<MysqlConnection>>>,
    body: String,
    req: HttpRequest,
) -> impl Responder {
    let auth_header = req
        .headers()
        .get("Authorization")
        .and_then(|header| header.to_str().ok());

    if let Some(auth_header) = auth_header {
        if let Some(token) = auth_header.strip_prefix("Bearer ") {
            match verify_jwt(token) {
                Ok(_claims) => {
                    let mut conn = match pool.get() {
                        Ok(conn) => conn,
                        Err(_) => {
                            return HttpResponse::InternalServerError()
                                .body("Failed to get DB connection");
                        }
                    };

                    let search_term = body.trim().replace('"', "");

                    // search all users with email like search_term, not using select
                    let result = user
                        .filter(email.like(&search_term))
                        .load::<User>(&mut conn);

                    return match result {
                        Ok(users) => HttpResponse::Ok().json(users),
                        Err(_) => {
                            HttpResponse::InternalServerError().body("Failed to perform search")
                        }
                    };
                }
                Err(_) => return HttpResponse::Unauthorized().body("Invalid token"),
            }
        }
    }

    HttpResponse::Unauthorized().body("Authorization header missing or invalid")
}
