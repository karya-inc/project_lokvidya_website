import re

# Read the generated paths
with open('map_paths.txt', 'r', encoding='utf-16le') as f:
    map_paths = f.read()

# Clean up any potential empty lines or weird formatting
map_paths = '\n'.join([line.strip() for line in map_paths.split('\n') if line.strip()])

# Read index.html
with open('index.html', 'r', encoding='utf-8') as f:
    html_content = f.read()

# Update viewBox
html_content = re.sub(r'<svg class="india-map" viewBox="[^"]+" id="indiaMap">', 
                      '<svg class="india-map" viewBox="0 0 612 696" id="indiaMap">', 
                      html_content)

# Replace the content inside <svg ... id="indiaMap">...</svg>
# We'll use a pattern that matches from the start of the svg tag to its close tag
pattern = r'(<svg class="india-map" viewBox="0 0 612 696" id="indiaMap">)(.*?)(</svg>)'
replacement = r'\1\n' + map_paths + r'\n          \3'

# We use flags=re.DOTALL to match across multiple lines
html_content = re.sub(pattern, replacement, html_content, flags=re.DOTALL)

# Write back to index.html
with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html_content)

print("index.html updated successfully.")
