#!/usr/bin/env python3
"""Assemble journey.html from the parts in this folder. Run from the repo root: python3 experiments/journey/build.py"""
import os
D = os.path.dirname(os.path.abspath(__file__)); R = os.path.dirname(os.path.dirname(D))
rd = lambda n: open(os.path.join(D, n), encoding='utf-8').read()
head = rd('part1.html')
if 'name="robots"' not in head: head = head.replace('<meta charset="utf-8">', '<meta charset="utf-8">\n<meta name="robots" content="noindex">\n<meta name="viewport" content="width=device-width, initial-scale=1">', 1)
html = head + "\n" + rd('part2.html') + "\n<script>\n(() => {\n'use strict';\n" + rd('kit.js') + "\n" + rd('scenes.js') + "\n" + rd('page.js') + "\n})();\n</script>\n"
open(os.path.join(R, 'journey.html'), 'w', encoding='utf-8').write(html)
print('wrote journey.html', len(html))
