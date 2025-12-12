import os
import re

def create_portable():
    # File paths
    index_file = 'index.html'
    css_file = 'styles.css'
    js_files = ['data.js', 'app.js']
    output_file = 'ancient_poems_portable.html'

    print(f"Reading {index_file}...")
    try:
        with open(index_file, 'r', encoding='utf-8') as f:
            content = f.read()
    except FileNotFoundError:
        print(f"Error: {index_file} not found.")
        return

    # Inline CSS
    print(f"Inlining {css_file}...")
    if os.path.exists(css_file):
        with open(css_file, 'r', encoding='utf-8') as f:
            css_content = f.read()
        # Replace <link rel="stylesheet" href="styles.css"> with <style>...</style>
        content = re.sub(r'<link rel="stylesheet" href="styles.css">', f'<style>\n{css_content}\n</style>', content)
    else:
        print(f"Warning: {css_file} not found.")

    # Inline JS
    for js_file in js_files:
        print(f"Inlining {js_file}...")
        if os.path.exists(js_file):
            with open(js_file, 'r', encoding='utf-8') as f:
                js_content = f.read()
            # Replace <script src="filename.js"></script> with <script>...</script>
            # Use strict replacement to avoid replacing unrelated things
            pattern = f'<script src="{js_file}"></script>'
            if pattern in content:
                content = content.replace(pattern, f'<script>\n{js_content}\n</script>')
            else:
                print(f"Warning: Script tag for {js_file} not found in {index_file}.")
        else:
            print(f"Warning: {js_file} not found.")

    # Optional: Comment out login check for portable version if desired
    # For now, we leave it as is, assuming the user might keep login.html alongside or doesn't mind.
    # But if it's truly "portable" single file, login check which redirects to another file is problematic.
    # Let's interactively ask or just provide the script. The user asked "Why?", so I explain and fix.
    
    # Write to output file
    print(f"Writing to {output_file}...")
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(content)

    print(f"Successfully created {output_file}")

if __name__ == '__main__':
    create_portable()
