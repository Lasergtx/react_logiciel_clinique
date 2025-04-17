import uvicorn
from fastapi import FastAPI
from contextlib import asynccontextmanager
from fastapi.middleware.cors import CORSMiddleware
from Config.Connection import prisma_connection

@asynccontextmanager
async def lifespan(app: FastAPI):
    print("Starting up...")
    await prisma_connection.connect()
    yield
    print("Shutting down...")
    await prisma_connection.disconnect()

def init_app():
    app = FastAPI(lifespan = lifespan)

    origins = [
        "http://localhost:3000",  # Next.js frontend
    ]

    app.add_middleware(
        CORSMiddleware,
        allow_origins=origins,
        allow_credentials=True,
        allow_methods=["GET", "POST"],  # Allow specific methods
        allow_headers=["*"],  # Allow all headers
    )

    @app.get("/")
    async def root():
        return "Hello World";

    from Controler import productTypes
    from Controler import products
    from Controler import users
    from Controler import clients
    from Controler import earnings

    app.include_router(productTypes.router)
    app.include_router(products.router)
    app.include_router(users.router)
    app.include_router(clients.router)
    app.include_router(earnings.router)

    return app

app = init_app()

if __name__ == '__main__':
    uvicorn.run('api:app', host="localhost", port=8000, reload=True)

