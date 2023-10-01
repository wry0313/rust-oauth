mod authenticate_token;
mod config;
// mod github_oauth;
mod google_oauth;
mod handler;
mod model;
mod response;

use actix_web::{get, middleware::Logger, App, HttpResponse, HttpServer, Responder};

#[get("/ping")]
async fn health_checker_handler() -> impl Responder {
    const MESSAGE: &str = "How to Implement Google OAuth2 in Rust";

    HttpResponse::Ok().json(serde_json::json!({"status": "success", "message": MESSAGE}))
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    if std::env::var_os("RUST_LOG").is_none() {
        std::env::set_var("RUST_LOG", "actix_web=info");
    }
    env_logger::init();

    println!("server started successfully");

    HttpServer::new(move || {
        App::new()
            .service(health_checker_handler)
            .wrap(Logger::default())
    })
    .bind(("127.0.0.1", 8080))?
    .run()
    .await
}
