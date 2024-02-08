import worldmap from '../assets/worldmap.json';
import { GenericTemplate } from '../utils/generic';

import cn from 'classnames';

function WorldMapView({ visaFree, visaOnArrival, eta, visaOnline, visaRequired }: { visaFree: string[], visaOnArrival: string[], eta: string[], visaOnline: string[], visaRequired: string[] }) {
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
              className={cn(`hover:fill-slate-500`,
              { 'fill-green-500': visaFree.includes(mapData.id) },
              { 'fill-green-300': visaOnArrival.includes(mapData.id) },
              { 'fill-blue-500': eta.includes(mapData.id) },
              { 'fill-red-300': visaOnline.includes(mapData.id) },
              { 'fill-red-500': visaRequired.includes(mapData.id) })}
            />
          ))
        }
      </svg>
    </div>
  )
}

export default WorldMapView;
