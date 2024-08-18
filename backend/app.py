from fastapi import FastAPI

app = FastAPI()

@app.get("/hi")
def greet():
    return "hello!"

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app:app", reload=True)