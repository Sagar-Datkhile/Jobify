create table users(
	user_id serial primary key,
	user_email varchar(100) unique not null,
	user_password varchar(100) not null,
	user_type varchar(10) not null check (user_type in ('employer', 'seeker'))
)


create table user_refresh_tokens (
    refresh_id serial primary key,
    refresh_user_email varchar(255) not null,
    refresh_token text not null,
	refresh_token_expires_at timestamptz not null,
	foreign key (refresh_user_email) references users(user_email) on delete cascade
);

create table user_details(
	details_id serial primary key,
	details_user_id int unique not null,
	details_user_full_name varchar(100) not null,
	details_company_name varchar(50),
	foreign key (details_user_id) references users(user_id) on delete cascade
)
