use crate::schema::users;

use diesel::prelude::*;

#[derive(Debug, Queryable, Selectable)]
#[diesel(table_name = users)]
pub struct User {
    pub id: i32,
    pub username: String, // Matches Text
    pub password_hash: String, // Matches Text
    pub email: String, // Matches Text
    pub created_at: chrono::NaiveDateTime, // Matches Timestamp
}

#[derive(Insertable)]
#[diesel(table_name = users)]
pub struct NewUser {
    pub username: String,
    pub email: String,
    pub password_hash: String,
}
