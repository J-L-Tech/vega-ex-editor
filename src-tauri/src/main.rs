// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::fs::{self};
use rfd::FileDialog;

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
fn save(contents: &str, file_extension: &str) -> String {
    if let Some(path) = FileDialog::new().add_filter("Type", &[file_extension]).save_file() {
        match fs::write(&path, contents) {
            Ok(()) =>              return format!("File was Saved to path: {}", path.display()),
            Err(e) =>       return format!("Error Occured while saving to {}: {}", path.display(), e.to_string()),
        }
    } else {
        return "File was not Saved".into();
    }
}

#[tauri::command]
fn open() -> Result<String, String> {
    if let Some(path) = FileDialog::new().add_filter("JSON", &["json"]).pick_file() {
        match fs::read_to_string(&path) {
            Ok(content) =>     return Ok(content),
            Err(e) =>           return Err(format!("Error Occured while retreiving file from {}: {}", path.display(), e.to_string())),
        };
    }
    else {
        return Err(format!("File was not picked"));
    }
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet, save, open])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
