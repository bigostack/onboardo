import { useContext, useState } from 'react';
import WorldMapView from './components/WorldMap';
import ngData from './assets/data/nigeria.json';
import { WorldMapContext } from './contexts/WorldMapProvider';

function processAvailability(countryName) {
  // takes in a country name / ios , returns all the coun `try where it can travel 
  // visa free 
  // data format : ['za', 'uk', 'in', us]
  const resultAvailable = ngData.hasOwnProperty(countryName)
  console.log('result available ? ', resultAvailable)

  // is result not available , return sentiel value for error 
  //
  // throw new Error('result not available . ')

  const qIsos = ngData[countryName].map((cnt: { iso: string }) => cnt.iso.toLowerCase())
  return qIsos
}

function App() {
  const [countryInput, setCountryInput] = useState<string>('')

  const { highlightCountries, selectedCountries } = useContext(WorldMapContext);

  console.log('nigeria data: ', ngData);

  function _handleCountryProcessing() {
    console.log('processing country ', countryInput);
    const availableCountries = processAvailability(countryInput)
    console.log('availableCountries -- ', availableCountries)
    highlightCountries(availableCountries);
  }

  return (
    <div className="flex justify-center h-screen border border-black p-16 m-16">
      <WorldMapView validCountries={selectedCountries} />
      <div className="control-center">
        <input
          type="text"
          placeholder="Enter country name"
          className="border border-slate-700 p-2"
          onChange={e => setCountryInput(e.target.value)}
          value={countryInput}
        />
        <button
          className="bg-slate-800 p-2 text-white"
          onClick={_handleCountryProcessing}>Check</button>
        <p>You are searching for {countryInput}</p>
      </div>
    </div>
  )
}

export default App
