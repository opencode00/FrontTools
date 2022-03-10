import os

content = ''
for file in os.scandir('./'):
    if os.path.splitext(file)[1] == '.css':
        with open(file, 'r') as f:
            content += f.read()

with open('full.css', 'w') as f:
    f.write(content)
