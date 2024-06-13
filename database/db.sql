CREATE DATABASE oconadb; 

CREATE TABLE users(id SERIAL PRIMARY KEY,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    name VARCHAR(255) NOT NULL,
    middle_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL,
    email_verified BOOLEAN DEFAULT false,
    password VARCHAR(255),
    phone_number VARCHAR(255),
    company VARCHAR(100),
    active BOOLEAN DEFAULT true,
    
);

CREATE TABLE tickets(
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    title VARCHAR(100),
    content VARCHAR(255),
    created_of VARCHAR(255),
    complete BOOLEAN DEFAULT FALSE
    
);

CREATE TABLE companies(id SERIAL PRIMARY KEY,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    name VARCHAR(255) NOT NULL,
    street VARCHAR(255) NOT NULL,
    ext_num VARCHAR(255) NOT NULL,
    int_num VARCHAR(100) NOT NULL,
    colony VARCHAR(255),
    rfc VARCHAR(255),
    phone_number VARCHAR(255),
    active BOOLEAN DEFAULT true
    
);