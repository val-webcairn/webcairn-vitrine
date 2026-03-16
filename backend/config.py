import os
from typing import List


DEV_DEFAULT_CORS_ORIGINS = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]


def get_required_env(name: str) -> str:
    value = os.getenv(name)
    if not value:
        raise RuntimeError(f"Missing required environment variable: {name}")
    return value


def get_environment() -> str:
    return os.getenv("APP_ENV", os.getenv("ENV", "development")).strip().lower()


def parse_cors_origins(raw_origins: str, environment: str) -> List[str]:
    origins = [origin.strip() for origin in raw_origins.split(",") if origin.strip()] if raw_origins else []

    if not origins:
        if environment == "production":
            raise RuntimeError("CORS_ORIGINS must be set in production with explicit allowed origins")
        return DEV_DEFAULT_CORS_ORIGINS.copy()

    if "*" in origins:
        raise RuntimeError("Wildcard CORS origin '*' is not allowed. Use explicit origins.")

    return origins
