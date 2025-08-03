# Indotek Demo Project

This is a demo project for an application to Indotek Group for the Full-Stack developer role.

The project is built using Laravel for the backend and Next.js for the frontend.

## Prerequisites

- Docker
- Docker Compose

## Setup

1. Clone the repository
2. In both the frontend and the backend repository, copy the `.env.example` file to `.env` and fill in the required values
3. Build and start the project using `docker compose up -d --build`
4. Run the migrations and seeders using `docker compose exec backend-php-fpm composer install`
5. Run the migrations and seeders using `docker compose exec backend-php-fpm php artisan migrate:fresh --seed`

To start the project, run:

```bash
docker compose up -d
```

To stop the project, run:

```bash
docker compose down
```

The project is now available at:

- backend: [http://localhost:8080](http://localhost:8080)
- frontend: [http://localhost:3001](http://localhost:3001)

Happy coding!
