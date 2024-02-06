import worldmap from '../assets/worldmap.json';
import { GenericTemplate } from '../utils/generic';

import cn from 'classnames';

function WorldMapView({ validCountries }: { validCountries: string[] }) {
  // get the data from context 
  // console.log('world map : ', worldmap);
  return (
    <div className="world-map border border-yellow-500 inline-block m-auto">
      <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        width="784.077px"
        height="458.627px"
        viewBox="30.767 241.591 784.077 458.627"
        id="world-map"
      >
        {
          worldmap.map(mapData => (
            <GenericTemplate
              key={mapData.id}
              {...mapData}
              className={cn(`hover:fill-slate-500`, { 'fill-red-500': validCountries.includes(mapData.id) })}
            />
          ))
        }
      </svg>
    </div>
  )
}

export default WorldMapView;
