import json
import re

def slugify(text):
    text = text.lower()
    text = re.sub(r'[^a-z0-9]+', '-', text)
    return text.strip('-')

filename = 'india_map.json'
with open(filename, 'r', encoding='utf-8') as f:
    content = f.read()

# Strip 'export default '
content = content.replace('export default ', '').strip()
if content.endswith(';'):
    content = content[:-1]

data = json.loads(content)

paths = []
for loc in data['locations']:
    name = loc['name']
    id_code = loc['id']
    path_d = loc['path']
    slug = slugify(name)
    
    # Special cases for existing slugs
    if slug == 'andaman-and-nicobar-islands': slug = 'andaman-nicobar'
    if slug == 'dadra-and-nagar-haveli': slug = 'dadra-nagar-haveli'
    if slug == 'daman-and-diu': slug = 'daman-diu'
    if slug == 'jammu-and-kashmir': slug = 'jammu-kashmir'
    
    paths.append(f'<path data-state="{slug}" id="{id_code}" d="{path_d}" />')

print('\n'.join(paths))
