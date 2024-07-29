import os
from pydantic_settings import BaseSettings, SettingsConfigDict


class Config(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8")
    
    DEBUG: bool = True

    SECURE_URL: bool = False
    HOST: str = "0.0.0.0"
    PORT: int = 3000
    ALLOWED_ORIGINS: str = "*"
    
    LOG_LEVEL: str = "DEBUG"
    LOG_RETENTION: str = "1 week"
    LOG_PATH: str = "logs.log"
    SAVE_PATH: str = "./data/fisiere"

    DATABASE_URI: str = "sqlite:///./data/database.sqlite"


cfg = Config()
