-- Insert Primary Categories
INSERT INTO primary_categories (name)
VALUES ('Tickets'),
       ('Books'),
       ('Electronics');


-- Insert Secondary Categories for each Primary Category
-- -- For "Tickets"
INSERT INTO secondary_categories (name, primary_category_id)
VALUES ('Sports Ticket Exchange', 1),
       ('Live Performances', 1),
       ('Entertainment', 1),
       ('Transportation Tickets', 1);

-- -- For "Books"
INSERT INTO secondary_categories (name, primary_category_id)
VALUES ('Academic Books', 2),
       ('Other Books', 2);

-- -- For "Electronics"
INSERT INTO secondary_categories (name, primary_category_id)
VALUES ('Computers & Accessories', 3),
       ('Mobile Phones & Accessories', 3),
       ('Audio & Video', 3),
       ('Photography & Videography', 3),
       ('Gaming Devices', 3);


-- Insert Tertiary Categories for each Secondary Category
INSERT INTO tertiary_categories (name, secondary_category_id) VALUES
-- -- For Sports "Ticket Exchange"
    ('Football Tickets', (SELECT secondary_category_id FROM secondary_categories WHERE name = 'Sports Ticket Exchange')),
    ('Basketball Tickets', (SELECT secondary_category_id FROM secondary_categories WHERE name = 'Sports Ticket Exchange')),
    ('Baseball Tickets', (SELECT secondary_category_id FROM secondary_categories WHERE name = 'Sports Ticket Exchange')),
    ('Soccer Tickets', (SELECT secondary_category_id FROM secondary_categories WHERE name = 'Sports Ticket Exchange')),
    ('Track and Field Tickets', (SELECT secondary_category_id FROM secondary_categories WHERE name = 'Sports Ticket Exchange')),
    ('Swimming and Diving Tickets', (SELECT secondary_category_id FROM secondary_categories WHERE name = 'Sports Ticket Exchange')),
    ('Volleyball Tickets', (SELECT secondary_category_id FROM secondary_categories WHERE name = 'Sports Ticket Exchange')),
    ('Tennis Tickets', (SELECT secondary_category_id FROM secondary_categories WHERE name = 'Sports Ticket Exchange')),

-- Tertiary categories for "Live Performances"
    ('Concert Tickets', (SELECT secondary_category_id FROM secondary_categories WHERE name = 'Live Performances')),
    ('Theatre Tickets', (SELECT secondary_category_id FROM secondary_categories WHERE name = 'Live Performances')),
    ('Dance Performances', (SELECT secondary_category_id FROM secondary_categories WHERE name = 'Live Performances')),
    ('Comedy Shows', (SELECT secondary_category_id FROM secondary_categories WHERE name = 'Live Performances')),

-- Tertiary categories for "Entertainment"
    ('Movie Tickets', (SELECT secondary_category_id FROM secondary_categories WHERE name = 'Entertainment')),

-- Tertiary categories for "Transportation Tickets"
    ('Bus and Shuttle Passes', (SELECT secondary_category_id FROM secondary_categories WHERE name = 'Transportation Tickets')),
    ('Train Tickets', (SELECT secondary_category_id FROM secondary_categories WHERE name = 'Transportation Tickets')),

-- Tertiary categories for "Academic Books"
    ('Science & Engineering', (SELECT secondary_category_id FROM secondary_categories WHERE name = 'Academic Books')),
    ('Humanities & Social Sciences', (SELECT secondary_category_id FROM secondary_categories WHERE name = 'Academic Books')),
    ('Business & Economics', (SELECT secondary_category_id FROM secondary_categories WHERE name = 'Academic Books')),
    ('Mathematics & Computer Science', (SELECT secondary_category_id FROM secondary_categories WHERE name = 'Academic Books')),

-- Tertiary categories for "Other Books"
    ('Fiction', (SELECT secondary_category_id FROM secondary_categories WHERE name = 'Other Books')),
    ('Non-fiction', (SELECT secondary_category_id FROM secondary_categories WHERE name = 'Other Books')),

-- Tertiary categories for "Computers & Accessories"
    ('Laptops', (SELECT secondary_category_id FROM secondary_categories WHERE name = 'Computers & Accessories')),
    ('Desktop Computers', (SELECT secondary_category_id FROM secondary_categories WHERE name = 'Computers & Accessories')),
    ('Tablets', (SELECT secondary_category_id FROM secondary_categories WHERE name = 'Computers & Accessories')),
    ('E-readers', (SELECT secondary_category_id FROM secondary_categories WHERE name = 'Computers & Accessories')),
    ('Computer Accessories', (SELECT secondary_category_id FROM secondary_categories WHERE name = 'Computers & Accessories')),

-- Tertiary categories for "Mobile Phones & Accessories"
    ('Smartphones', (SELECT secondary_category_id FROM secondary_categories WHERE name = 'Mobile Phones & Accessories')),
    ('Basic Cell Phones', (SELECT secondary_category_id FROM secondary_categories WHERE name = 'Mobile Phones & Accessories')),
    ('Phone Cases & Covers', (SELECT secondary_category_id FROM secondary_categories WHERE name = 'Mobile Phones & Accessories')),
    ('Chargers & Power Banks', (SELECT secondary_category_id FROM secondary_categories WHERE name = 'Mobile Phones & Accessories')),

-- Tertiary categories for "Audio & Video"
    ('Headphones & Earbuds', (SELECT secondary_category_id FROM secondary_categories WHERE name = 'Audio & Video')),
    ('Speakers & Sound Systems', (SELECT secondary_category_id FROM secondary_categories WHERE name = 'Audio & Video')),

-- Tertiary categories for "Photography & Videography"
    ('Cameras', (SELECT secondary_category_id FROM secondary_categories WHERE name = 'Photography & Videography')),
    ('Camera Lenses & Accessories', (SELECT secondary_category_id FROM secondary_categories WHERE name = 'Photography & Videography')),
    ('Tripods & Stabilizers', (SELECT secondary_category_id FROM secondary_categories WHERE name = 'Photography & Videography')),

-- Tertiary categories for "Gaming Devices"
    ('Gaming Consoles', (SELECT secondary_category_id FROM secondary_categories WHERE name = 'Gaming Devices')),
    ('Handheld Gaming Devices', (SELECT secondary_category_id FROM secondary_categories WHERE name = 'Gaming Devices')),
    ('VR Headsets', (SELECT secondary_category_id FROM secondary_categories WHERE name = 'Gaming Devices')),
    ('Gaming Accessories', (SELECT secondary_category_id FROM secondary_categories WHERE name = 'Gaming Devices'));