import requests
import os
import json

# SteamGridDB API key
API_KEY = 'e8d35acb5ae61659d00f4f2da8487efe'

# Path to the products file
PRODUCTS_FILE = 'src/products_clean.json'

# Path to the covers directory
COVERS_DIR = 'public/covers'

# Ensure the covers directory exists
os.makedirs(COVERS_DIR, exist_ok=True)

# Function to fetch the vertical poster from SteamGridDB
def fetch_vertical_poster(game_name):
    url = f'https://api.steamingriddb.com/v1/cover?game={game_name}&size=vertical&apikey={API_KEY}'
    response = requests.get(url)
    if response.status_code == 200:
        return response.json().get('url')
    return None

# Read the products file
with open(PRODUCTS_FILE, 'r') as file:
    products = json.load(file)

# Fetch and save the vertical posters
for product in products:
    game_name = product['name']
    vertical_poster_url = fetch_vertical_poster(game_name)
    if vertical_poster_url:
        poster_filename = os.path.join(COVERS_DIR, f'{product["sku"]}.jpg')
        with open(poster_filename, 'wb') as poster_file:
            poster_file.write(requests.get(vertical_poster_url).content)
        print(f'Saved {poster_filename}')
    else:
        print(f'No vertical poster found for {game_name}')
