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
# the component sheet: people, props, and the stops together
drawing = head[head.index('/* ---- the drawing ---- */'):head.index('</style>')]
sheet = rd('components-shell.html').replace('__DRAWING__', drawing).replace('__KIT__', rd('kit.js')).replace('__SCENES__', rd('scenes.js')).replace('__COMPONENTS__', rd('components.js'))
open(os.path.join(R, 'journey-components.html'), 'w', encoding='utf-8').write(sheet)
print('wrote journey-components.html', len(sheet))
# the contrast test board: seven ways to separate people from props, on one room
board = rd('contrast-tests.html').replace('__DRAWING__', drawing).replace('__KIT__', rd('kit.js')).replace('__SCENES__', rd('scenes.js'))
open(os.path.join(R, 'journey-contrast.html'), 'w', encoding='utf-8').write(board)
print('wrote journey-contrast.html', len(board))
