import WorldMap from "./WorldMap";
import USMap from "./maps/USA";
import NigeriaMap from "./maps/Nigeria";
import CanadaMap from "./maps/Canada";
import ZA from "./maps/ZA";
const SvgComponent = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={784.077}
    height={458.627}
    viewBox="30.767 241.591 784.077 458.627"
  >
    <WorldMap>
      <ZA />
      <USMap />
      <NigeriaMap />
      <CanadaMap />
    </WorldMap>
  </svg>
)
export default SvgComponent;
