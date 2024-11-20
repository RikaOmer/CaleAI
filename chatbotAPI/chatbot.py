import pathlib
import textwrap
import os

import google.generativeai as genai

from IPython.display import display
from IPython.display import Markdown

def to_markdown(text):
  text = text.replace('•', '  *')
  return Markdown(textwrap.indent(text, '> ', predicate=lambda _: True))

os.environ['GOOGLE_API_KEY'] = 'AIzaSyCgf69wsIKd2-vZP7Mnkqzj34AzSdNicOw'
GOOGLE_API_KEY= os.getenv('GOOGLE_API_KEY')

genai.configure(api_key=GOOGLE_API_KEY)


model = genai.GenerativeModel('gemini-1.5-flash')

def ask_chatbot(text):
  response = model.generate_content(text)
  return response.text
