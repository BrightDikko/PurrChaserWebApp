-- Insert the Admin User
INSERT INTO users (email, password, first_name, last_name, school_id, is_verified)
VALUES ('devbydikko@gmail.com', '$2a$10$JdPHeAiDhfUtBgWumYSgYudYs4w3bwwmOMekEg4u/yWdJbcZYmMMi', 'Admin', '', NULL, TRUE);

-- Get the role_id for 'ADMIN'
SET @admin_role_id = (SELECT role_id FROM roles WHERE authority = 'ADMIN');

-- Associate the Admin user with the 'ADMIN' role
INSERT INTO user_role_junction (user_id, role_id)
VALUES (LAST_INSERT_ID(), @admin_role_id);

-- Insert the Student User
INSERT INTO users (email, password, first_name, last_name, school_id, is_verified)
VALUES ('hmachizel@nd.edu', '$2a$10$JdPHeAiDhfUtBgWumYSgYudYs4w3bwwmOMekEg4u/yWdJbcZYmMMi', 'Horizon', 'Machizel', 1, TRUE);

-- Get the role_id for 'USER'
SET @user_role_id = (SELECT role_id FROM roles WHERE authority = 'USER');

-- Associate the Student user with the 'USER' role
INSERT INTO user_role_junction (user_id, role_id)
VALUES (LAST_INSERT_ID(), @user_role_id);