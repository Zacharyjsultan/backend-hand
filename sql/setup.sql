-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS dogs;

DROP TABLE IF EXISTS cats;

DROP TABLE IF EXISTS basketballers;

DROP TABLE IF EXISTS movies;

DROP TABLE IF EXISTS cities;

CREATE TABLE cities (
    id bigint generated always AS identity PRIMARY KEY,
    name varchar,
    skateparks int NOT NULL,
    state varchar
);

INSERT INTO
    cities (name, skateparks, state)
VALUES
    ('Portland', 17, 'Oregon'),
    ('nyc', 8, 'ny'),
    ('la', 43, 'California'),
    ('las vegas', 12, 'nevada'),
    ('boston', 3, 'massachusettes'),
    ('austin', 8, 'texas');

CREATE TABLE dogs (
    id bigint generated always AS IDENTITY PRIMARY KEY,
    name varchar,
    breed varchar
);

INSERT INTO
    dogs (name, breed)
VALUES
    ('kim chi', 'mastiffe'),
    ('doug', 'pug'),
    ('miffy', 'lab'),
    ('juanes', 'chupacabra'),
    ('marth', 'yorkie');

CREATE TABLE cats (
    id bigint generated always AS IDENTITY PRIMARY KEY,
    name varchar,
    breed varchar,
    age int NOT NULL
);

INSERT INTO
    cats (name, breed, age)
VALUES
    ('johann', 'mancoon', 3),
    ('lumen', 'hairless', 1),
    ('april', 'sphinx', 1),
    ('taco', 'tabby', 2),
    ('alf', 'tiger', 4),
    ('miguel', 'smol', 9);

CREATE TABLE basketballers (
    id bigint generated always AS identity PRIMARY KEY,
    name varchar,
    rating int NOT NULL,
    strength varchar
);

INSERT INTO
    basketballers (name, rating, strength)
VALUES
    ('lebron', 9, 'stats'),
    ('mettaworldpeace', 10, 'genius'),
    ('jordan', 9, 'winning'),
    ('kobe', 8, 'scoring'),
    ('dikembe', 7, 'waving his finger');

CREATE TABLE movies (
    id bigint generated always AS identity PRIMARY KEY,
    title varchar,
    year int NOT NULL,
    rating int NOT NULL
);

INSERT INTO
    movies (title, year, rating)
VALUES
    ('No Country for Old Men', 2007, 8),
    ('There Will Be Blood', 2009, 11),
    ('Robocop', 1928, 3),
    ('Moon', 2003, 8),
    ('Home Alone', 1993, 6),
    ('Virunga', 2002, 10);