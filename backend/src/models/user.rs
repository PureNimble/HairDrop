use crate::schema::user;

use diesel::prelude::*;
use serde::{Deserialize, Serialize};

#[derive(Debug, Queryable, QueryableByName, Selectable, Deserialize, Serialize)]
#[diesel(table_name = user)]
pub struct User {
    pub id: i32,
    pub email: String,
    pub first_name: String,
    pub last_name: String,
    pub password_hash: String,
    pub created_at: chrono::NaiveDateTime,
}

#[derive(Insertable)]
#[diesel(table_name = user)]
pub struct NewUser {
    pub email: String,
    pub first_name: String,
    pub last_name: String,
    pub password_hash: String,
}
