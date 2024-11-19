# Use the official Rust image as a base
FROM rust:slim

# Install necessary build dependencies
RUN apt install \
    build-essential\
    libmariadb-dev-compat \
    libmariadb-dev \


# Set the working directory to /app
WORKDIR /app

# Copy the rest of the application code into the container
COPY . /app

# Cache dependencies for faster builds
RUN CARGO_INCREMENTAL=1 cargo build --release

# Expose the port your application will run on (adjust this if needed)
EXPOSE 2228

# Run your application
CMD ["./target/release/rust-backend"]