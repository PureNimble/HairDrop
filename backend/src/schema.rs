// @generated automatically by Diesel CLI.

diesel::table! {
    user (id) {
        id -> Integer,
        #[max_length = 255]
        email -> Varchar,
        #[max_length = 255]
        first_name -> Varchar,
        #[max_length = 255]
        last_name -> Varchar,
        password_hash -> Text,
        created_at -> Timestamp,
    }
}
