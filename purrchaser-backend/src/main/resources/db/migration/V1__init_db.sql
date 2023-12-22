CREATE TABLE roles
(
    role_id   INT AUTO_INCREMENT PRIMARY KEY,
    authority VARCHAR(255) NOT NULL
);


CREATE TABLE schools
(
    school_id INT AUTO_INCREMENT PRIMARY KEY,
    name      VARCHAR(255) NOT NULL
);


CREATE TABLE dorms
(
    dorm_id INT AUTO_INCREMENT PRIMARY KEY,
    name    VARCHAR(255) NOT NULL
);


CREATE TABLE users
(
    user_id             INT AUTO_INCREMENT PRIMARY KEY,
    email               VARCHAR(255) NOT NULL UNIQUE,
    password            VARCHAR(255) NOT NULL,
    first_name          VARCHAR(255) NOT NULL,
    last_name           VARCHAR(255),
    school_id           INT,
    created_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    dorm_id             INT,
    graduation_year     YEAR,
    profile_picture_url VARCHAR(255),
    bio                 TEXT,
    is_verified         BOOLEAN   DEFAULT FALSE,
    FOREIGN KEY (school_id) REFERENCES schools (school_id),
    FOREIGN KEY (dorm_id) REFERENCES dorms (dorm_id)
);


CREATE TABLE user_role_junction
(
    user_id INT NOT NULL,
    role_id INT NOT NULL,
    PRIMARY KEY (user_id, role_id),
    FOREIGN KEY (user_id) REFERENCES users (user_id),
    FOREIGN KEY (role_id) REFERENCES roles (role_id)
);


CREATE TABLE user_dorms
(
    user_dorm_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id      INT  NOT NULL,
    dorm_id      INT  NOT NULL,
    start_date   DATE NOT NULL,
    end_date     DATE,
    is_current   BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (user_id) REFERENCES users (user_id),
    FOREIGN KEY (dorm_id) REFERENCES dorms (dorm_id)
);

INSERT INTO roles (authority)
VALUES ('ADMIN'),
       ('USER');