# Marvel Backend

## Routes

- User
  - [Create user](./documentation/user_create.md)
  - [Login user](./documentation/user_signin.md)
  - [Create user favorite](./documentation/user_favorite_create.md)
  - [Read user favorite](./documentation/user_favorite_read.md)
- Characters
  - [Read by ID](./documentation/characters_read_by_id.md)
  - [Read by name](./documentation/characters_read_by_name.md)
- Comics
  - [Read by title](./documentation/comics_read_by_title.md)

## How to use

In the project directory :

1. Create a `.env` file :

```bash
touch .env
echo "PORT=4000" >> .env
echo "MARVEL_KEY_PUBLIC=your Marvel API public key" >> .env
echo "MARVEL_KEY_PRIVATE=your Marvel API private key" >> .env
echo "MONGODB_URI=mongodb://localhost/marvel" >> .env
```

2. Download and install project dependencies

```bash
yarn
```

3. Start the server

```bash
yarn start
```

## Online backend

[Marvel backend on Heroku](https://marvel-ced.herokuapp.com/)
