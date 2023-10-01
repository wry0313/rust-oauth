
use crate::{
    authenticate_token::AuthenticationGuard,
    google_oauth::{get_google_user, request_token},
    model::{AppState, LoginUserSchema, QueryCode, RegisterUserSchema, TokenClaims, User},
    response::{FilteredUser, UserData, UserResponse},
};
use actix_web::{
    cookie::{time::Duration as ActixWebDuration, Cookie},
    get, post, web, HttpResponse, Responder,
};
use chrono::{prelude::*, Duration};
use jsonwebtoken::{encode, EncodingKey, Header};
use reqwest::header::LOCATION;
use uuid::Uuid;

pub fn user_to_response(user: &User) -> FilteredUser {
    FilteredUser {
        id: user.id.to_owned().unwrap(),
        name: user.name.to_owned(),
        email: user.email.to_owned(),
        verified: user.verified.to_owned(),
        photo: user.photo.to_owned(),
        provider: user.provider.to_owned(),
        role: user.role.to_owned(),
        createdAt: user.createdAt.unwrap(),
        updatedAt: user.updatedAt.unwrap(),
    }
}
