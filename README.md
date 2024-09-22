# TODO List Generator API

This project is a REST API for managing a to-do list system. The backend was developed using Node.js, Prisma as the ORM, and PostgreSQL as the database.


## Prerequisites

-   [Node.js](https://nodejs.org/) installed.
-   [Docker](https://www.docker.com/) installed.

## Project Setup

1. **Rename the `.env_example` file to `.env`.**

    - This file contains essential environment variables for the application, such as database credentials.

2. **Install dependencies:**

    ```bash
    npm install
    ```

    - This command installs all the dependencies listed in the `package.json` file.

3. **Start the database container:**

    ```bash
    docker-compose up -d
    ```

    - This command uses Docker Compose to create and run a PostgreSQL container in the background.

4. **Run Prisma migrations:**

    ```bash
    npx prisma migrate dev
    ```

    - This command applies the database migrations, creating the necessary tables and structures.

5. **Start the backend server:**

    ```bash
    npm start
    ```

    - This command starts the backend server in development mode, allowing you to test and develop the API.

## Usage

Once the server is set up and running, the API will be available to receive requests from the frontend. You can use tools like [Postman](https://www.postman.com/) or [Insomnia](https://insomnia.rest/) to test the endpoints.

## License

This project is licensed under the [MIT License](LICENSE).
