use crate::jwt::verify_jwt;
use crate::models::user::User;
use actix_web::{web, HttpRequest, HttpResponse, Responder};
use diesel::prelude::*;
use diesel::r2d2::{ConnectionManager, Pool};

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
                        Err(err) => {
                            return HttpResponse::InternalServerError()
                                .body(format!("Database connection error: {}", err));
                        }
                    };

                    let search_term = body.trim().replace('"', "");
                    let sql = format!("SELECT * FROM user WHERE email LIKE '%{}%'", search_term);
                    let result = diesel::sql_query(sql).load::<User>(&mut conn);
                    return match result {
                        Ok(users) => HttpResponse::Ok().json(users),
                        Err(err) => HttpResponse::InternalServerError()
                            .body(format!("Database query failed: {}", err)),
                    };
                }
                Err(err) => {
                    return HttpResponse::Unauthorized()
                        .body(format!("JWT verification failed: {}", err));
                }
            }
        }
    }

    HttpResponse::Unauthorized().body("Authorization header missing or invalid")
}