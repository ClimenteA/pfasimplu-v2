from fastapi import FastAPI, Request, Response
from fastapi.middleware.cors import CORSMiddleware
from api import routers
from api.database import create_db_and_tables
from multiprocessing import cpu_count
from settings import cfg


app = FastAPI(
    title="PFASimplu v2",
    description="Aplicatie de contabilitate pentru PFA (partida simpla)",
)


[app.include_router(router, prefix="/v1") for router in routers]


app.add_middleware(
    CORSMiddleware,
    allow_origins=[url.strip() for url in cfg.ALLOWED_ORIGINS.split(" ") if url],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "OPTIONS", "DELETE"],
)


@app.middleware("http")
async def security_headers(request: Request, call_next):
    response: Response = await call_next(request)
    response.headers["strict-transport-security"] = (
        "max-age=63072000; includeSubdomains; preload"
    )
    response.headers["x-content-type-options"] = "nosniff"
    response.headers["x-xss-protection"] = "0"
    response.headers["referrer-policy"] = "no-referrer, strict-origin-when-cross-origin"
    return response


if __name__ == "__main__":
    import uvicorn

    create_db_and_tables()

    uvicorn.run(
        app="main:app",
        host=cfg.HOST,
        port=cfg.PORT,
        reload=cfg.DEBUG,
        proxy_headers=True,
        forwarded_allow_ips="*",
        workers=None if cfg.DEBUG else cpu_count(),
    )
