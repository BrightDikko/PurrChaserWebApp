CREATE TABLE roles
(
    role_id   INT AUTO_INCREMENT PRIMARY KEY,
    authority VARCHAR(255) NOT NULL
);


CREATE TABLE schools
(
    school_id    INT AUTO_INCREMENT PRIMARY KEY,
    name         VARCHAR(255) NOT NULL,
    email_format VARCHAR(255) NOT NULL
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


CREATE TABLE primary_categories
(
    primary_category_id INT AUTO_INCREMENT PRIMARY KEY,
    name                VARCHAR(255) NOT NULL
);


CREATE TABLE secondary_categories
(
    secondary_category_id INT AUTO_INCREMENT PRIMARY KEY,
    name                  VARCHAR(255) NOT NULL,
    primary_category_id   INT,
    FOREIGN KEY (primary_category_id) REFERENCES primary_categories (primary_category_id)
);


CREATE TABLE tertiary_categories
(
    tertiary_category_id INT AUTO_INCREMENT PRIMARY KEY,
    name                 VARCHAR(255) NOT NULL,
    secondary_category_id INT,
    FOREIGN KEY (secondary_category_id) REFERENCES secondary_categories (secondary_category_id)
);


CREATE TABLE listings
(
    listing_id       INT AUTO_INCREMENT PRIMARY KEY,
    created_at       TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at       TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    seller_id        INT,
    title            VARCHAR(255) NOT NULL,
    description      TEXT,
    price            DECIMAL(10, 2),
    is_sold          BOOLEAN   DEFAULT FALSE,
    item_condition   VARCHAR(100),
    brand            VARCHAR(100),
    model            VARCHAR(100),
    main_image_id    INT,
    category_id      INT,
    meeting_location VARCHAR(255),
    FOREIGN KEY (seller_id) REFERENCES users (user_id),
    FOREIGN KEY (category_id) REFERENCES tertiary_categories (tertiary_category_id)
);


CREATE TABLE images
(
    image_id   INT AUTO_INCREMENT PRIMARY KEY,
    listing_id INT,
    url        VARCHAR(255) NOT NULL,
    FOREIGN KEY (listing_id) REFERENCES listings (listing_id)
);


CREATE TABLE tags
(
    tag_id INT AUTO_INCREMENT PRIMARY KEY,
    name   VARCHAR(100) UNIQUE NOT NULL
);


CREATE TABLE listing_tags
(
    listing_tag_id INT AUTO_INCREMENT PRIMARY KEY,
    listing_id     INT,
    tag_id         INT,
    FOREIGN KEY (listing_id) REFERENCES listings (listing_id),
    FOREIGN KEY (tag_id) REFERENCES tags (tag_id)
);

CREATE TABLE favorite_listings (
    favorite_listing_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    listing_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (user_id),
    FOREIGN KEY (listing_id) REFERENCES listings (listing_id)
);