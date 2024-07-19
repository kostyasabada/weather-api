# Weather API

## Overview

The `weather-api` project is a NestJS-based application designed to fetch weather data from the OpenWeatherMap API and store it in a PostgreSQL database. The API provides endpoints to both save and retrieve weather data.

## Features

- **ENDPOINT**: http://localhost:3000/rest/api/weather
- **POST /weather**: Fetches weather data from OpenWeatherMap and saves it to the database.
- **GET /weather**: Retrieves weather data from the database based on provided latitude, longitude, and part.

## Installation

### Clone the Repository

```bash
git clone https://github.com/kostyasabada/weather-api.git
cd weather-api
docker-compose up --build
