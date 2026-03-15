# Strapi Backend (Cloud Ready)

This folder is now a full Strapi backend scaffold for your portfolio CMS.

## Import into Strapi Cloud

1. Push this repo to GitHub.
2. In Strapi Cloud, choose **Import from Git**.
3. Set **Root Directory** to `strapi`.
4. Deploy.

## Required env vars in Strapi Cloud

- `APP_KEYS`
- `API_TOKEN_SALT`
- `ADMIN_JWT_SECRET`
- `TRANSFER_TOKEN_SALT`
- `JWT_SECRET`

For DB:
- If using Strapi Cloud managed DB, use the values they provide.
- If external Postgres, set:
  - `DATABASE_CLIENT=postgres`
  - `DATABASE_HOST`
  - `DATABASE_PORT`
  - `DATABASE_NAME`
  - `DATABASE_USERNAME`
  - `DATABASE_PASSWORD`
  - `DATABASE_SSL=true`

## Content types included

- `projects`
- `experiences`

These match the frontend integration and seed script.

## Local run (optional)

```sh
cd strapi
npm install
npm run develop
```

The admin panel opens at `http://localhost:1337/admin`.
