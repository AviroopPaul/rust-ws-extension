#!/bin/bash

# Exit on any error
set -e

echo "🦀 Building Rust WASM module..."

# Ensure we have wasm-pack installed
if ! command -v wasm-pack &> /dev/null; then
    echo "Installing wasm-pack..."
    cargo install wasm-pack
fi

# Build the WASM package
cd rust-wasm-extension
wasm-pack build --target web --release

# Create extension/wasm directory if it doesn't exist
mkdir -p ../extension/wasm

# Copy the generated WASM files to extension directory
cp pkg/*.js ../extension/wasm/
cp pkg/*.wasm ../extension/wasm/

echo "✨ Build complete! WASM files copied to extension/wasm/" 