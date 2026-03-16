import pytest

from backend.config import get_required_env, parse_cors_origins


def test_parse_cors_origins_returns_dev_defaults_when_empty():
    origins = parse_cors_origins("", "development")
    assert "http://localhost:3000" in origins
    assert "http://127.0.0.1:3000" in origins


def test_parse_cors_origins_requires_explicit_values_in_production():
    with pytest.raises(RuntimeError, match="CORS_ORIGINS must be set"):
        parse_cors_origins("", "production")


def test_parse_cors_origins_rejects_wildcard():
    with pytest.raises(RuntimeError, match="Wildcard CORS origin"):
        parse_cors_origins("*", "development")


def test_get_required_env_returns_value_when_set(monkeypatch):
    monkeypatch.setenv("TEST_REQUIRED_ENV", "ok")
    assert get_required_env("TEST_REQUIRED_ENV") == "ok"


def test_get_required_env_raises_when_missing(monkeypatch):
    monkeypatch.delenv("TEST_REQUIRED_ENV", raising=False)
    with pytest.raises(RuntimeError, match="Missing required environment variable"):
        get_required_env("TEST_REQUIRED_ENV")
