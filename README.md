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
4. Install composer dependencies using `docker compose exec backend-php-fpm composer install`
5. Generate application key using `docker compose exec backend-php-fpm php artisan key:generate`
6. Run the migrations and seeders using `docker compose exec backend-php-fpm php artisan migrate:fresh --seed`
7. For local development, install npm dependencies on your machine from the frontend directory using `npm install`

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
