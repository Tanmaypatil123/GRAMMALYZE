import google.generativeai as palm
from fastapi import FastAPI
import dotenv
import os
from .constants import DEFAULTS , origins
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

dotenv.load_dotenv()
palm.configure(api_key=os.getenv("PALM_API_KEY"))

class CorItem(BaseModel):
  inputs :str

class WriItem(BaseModel):
  subject : str

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/generate/write")
def write_result(data : WriItem):
  prompt = f"""
  Write an email for Subject : {data.subject}
  """
  response = palm.generate_text(
    **DEFAULTS,
    prompt=prompt
  )
  # print(response.result)
  return {
    "data" : response.result
  }


@app.post("/generate/correction")
def generate_result(data:CorItem):
  prompt = f"""input: Yu are mi hero
  output: You are my hero
  input: The cat chaesed the mouse around th coner.
  output: The cat chased the mouse around the corner.
  input: I lov the smell of freshely bakad bread in the mornings
  output: I love the smell of freshly baked bread in the morning
  input: The sun seat behind the mountains, paintin the ski in shads of pink and orange.
  output: The sun set behind the mountains, painting the sky in shades of pink and orange.
  input: {data.inputs}
  output:"""

  response = palm.generate_text(
    **DEFAULTS,
    prompt=prompt
  )
  # print(response.result)
  return {
    "data" : response.result
  }


