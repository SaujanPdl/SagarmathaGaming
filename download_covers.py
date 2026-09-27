import json
import re
import time
from pathlib import Path
import requests

API_KEY = "e8d35acb5ae61659d00f4f2da8487efe"
headers = {"Authorization": f"Bearer {API_KEY}"}

# Create public/covers folder if missing
out_dir = Path("public/covers")
out_dir.mkdir(parents=True, exist_ok=True)

# Note: Check both potential paths for products_clean.json
json_path = Path("src/data/products_clean.json")
if not json_path.exists():
    json_path = Path("src/products_clean.json")

with open(json_path, "r", encoding="utf-8") as f:
    products = json.load(f)

print(f"Loaded {len(products)} products from {json_path}")

for item in products:
    name = item.get("name")
    if not name:
        continue

    slug = re.sub(r"[^a-z0-9]+", "-", name.lower()).strip("-")
    target = out_dir / f"{slug}.jpg"

    if target.exists() and target.stat().st_size > 0:
        print(f"[SKIP] {name} already exists.")
        continue

    print(f"[FETCH] Querying cover for {name}...")
    try:
        search_res = requests.get(
            f"https://www.steamgriddb.com/api/v2/search/autocomplete/{requests.utils.quote(name)}",
            headers=headers,
            timeout=10,
        )
        if search_res.ok and search_res.json().get("data"):
            game_id = search_res.json()["data"][0]["id"]
            grid_res = requests.get(
                f"https://www.steamgriddb.com/api/v2/grids/game/{game_id}?dimensions=600x900",
                headers=headers,
                timeout=10,
            )
            if grid_res.ok and grid_res.json().get("data"):
                img_url = grid_res.json()["data"][0]["url"]
                img_data = requests.get(img_url, timeout=15).content
                target.write_bytes(img_data)
                print(f"[SUCCESS] Saved -> {target}")
            else:
                print(f"[WARN] No 600x900 grid found for {name}")
        else:
            print(f"[WARN] No search match for {name}")
    except Exception as e:
        print(f"[ERROR] Failed {name}: {e}")

    time.sleep(0.4)

print("\nFinished downloading covers!")