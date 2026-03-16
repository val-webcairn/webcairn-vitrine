# WebCairn Vitrine

Project structure:

- frontend: React app powered by Vite
- backend: FastAPI service
- tests: Python tests for backend configuration and security guards

## Frontend

From the frontend folder:

- npm install
- npm start
- npm run test:ci
- npm run build

Vite outputs production files to dist.
If your host was pointing to build, switch it to dist.

## Backend

From the repository root:

- py -m pip install -r backend/requirements.txt
- py -m pytest -q tests/test_backend_config.py

Required backend environment variables:

- MONGO_URL
- DB_NAME
- CORS_ORIGINS

Notes:

- In production, CORS_ORIGINS must contain explicit origins.
- Wildcard CORS origin is rejected by design.
