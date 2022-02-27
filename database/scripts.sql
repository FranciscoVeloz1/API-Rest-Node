create database template;
use template;

create table rol(
    id int primary key auto_increment,
    description varchar(50)
);

insert into rol values
(null, 'user'),
(null, 'admin'),
(null, 'supervisor');

create table users(
    id int primary key auto_increment,
    user varchar(50),
    fullname varchar(50),
    email varchar(50),
    password varchar(250),
    fk_rol int,
    foreign key(fk_rol) references rol(id)
);

create table tasks (
    id int primary key auto_increment,
    title varchar(50),
    description varchar(50)
);