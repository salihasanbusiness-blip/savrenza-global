#!/usr/bin/env python3
"""Fail CI when local static assets referred to by HTML/CSS are absent."""
import re,sys
from pathlib import Path
from urllib.parse import urlsplit,unquote
root=Path(__file__).resolve().parents[1]
missing=set()
for f in list(root.glob('*.html'))+list((root/'assets').glob('*.css')):
    text=f.read_text(encoding='utf-8',errors='replace')
    if f.suffix=='.html':
        anchors=set(re.findall(r'\bid\s*=\s*["\']([^"\']+)',text,re.I))
        refs=re.findall(r'(?:src|href)\s*=\s*["\']([^"\']+)',text,re.I)
    else:
        anchors=set()
        refs=re.findall(r'url\(\s*["\']?([^"\')]+)',text,re.I)
    for ref in refs:
        ref=ref.strip()
        if not ref or ref.startswith(('//','data:','mailto:','tel:')): continue
        parsed=urlsplit(ref)
        if f.suffix=='.html' and not parsed.path and parsed.fragment:
            if unquote(parsed.fragment) not in anchors:
                missing.add((str(f.relative_to(root)),ref))
            continue
        if parsed.scheme or parsed.netloc:continue
        path=unquote(parsed.path)
        if not path or path=='/':continue
        target=(root/path.lstrip('/')) if path.startswith('/') else (f.parent/path)
        if not target.is_file(): missing.add((str(f.relative_to(root)),ref))
if missing:
    print('MISSING LOCAL FILES:')
    for src,dst in sorted(missing): print(f'{src}: {dst}')
    sys.exit(1)
print('PASS: HTML and CSS local resource references resolved')
