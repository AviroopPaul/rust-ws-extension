use wasm_bindgen::prelude::*;

// This is the function that will be exposed to JavaScript
#[wasm_bindgen]
pub fn greet(name: &str) -> String {
    format!("Hello, {}!", name)
}
