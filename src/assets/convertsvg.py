
import json
import bs4

file_handle = open ( 'world_map_svg.svg')
filecontent = file_handle.read()
soup = bs4.BeautifulSoup(filecontent, features='lxml')
children = soup.select('svg > g > *')

output = []
for child in children: 
    output.append( {
        'd': child.get('d'),
        'id': child.get('id'),
        'elem': child.name,
        'children': [{'d': _child.get('d'), 'elem': _child.name } for _child in child.select('*')]
    })

with open('svgjson.json', 'w') as w:
    json.dump(output , w)

