use crate::jwt::verify_jwt;
use crate::models::user::User;
use crate::schema::user::dsl::*;
use actix_web::{web, HttpRequest, HttpResponse, Responder};
use diesel::prelude::*;
use diesel::r2d2::{ConnectionManager, Pool};

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
