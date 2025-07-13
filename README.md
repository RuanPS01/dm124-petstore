# DM124 Petstore

A microservices-based pet store application with authentication and pet management capabilities.

## Services

- **Auth Service** (Port 3001): JWT-based authentication
- **Petstore Service** (Port 3000): Pet management with authentication

### Prerequisites
- Node.js
- MongoDB (for petstore service)
- Docker & Docker Compose (optional)

### Running with Docker Compose
```bash
docker-compose up -d
```