import { useContext, useState } from 'react';
import WorldMapView from './components/WorldMap';
import ngData from './assets/data/nigeria.json';
import { WorldMapContext } from './contexts/WorldMapProvider';

function processAvailability(countryName : string) {
  // takes in a country name / ios , returns all the country where it can travel 
  // visa free 
  // data format : ['za', 'uk', 'in', us]
  const resultAvailable = ngData.hasOwnProperty(countryName)
  console.log('result available ? ', resultAvailable)

  // is result not available , return sentiel value for error 
  //
  // throw new Error('result not available . ')

  // const qIsos = ngData[countryName].map((cnt: { iso: string }) => cnt.iso.toLowerCase())

  // Go into the ng property, then for each attribute (obj), get the iso of each category.

  const visaFree = ngData.ng['visa-free'].map((cnt: {iso: string}) => cnt.iso.toLowerCase());

  const visaOnArrival = ngData.ng['visa-on-arrival'].map((cnt: {iso: string}) => cnt.iso.toLowerCase());

  const visaOnline = ngData.ng['visa-online'].map((cnt : {iso: string}) => cnt.iso.toLowerCase());

  const eta = ngData.ng['electronic-travel-authorization'].map((cnt : {iso : string}) => cnt.iso.toLowerCase());

  const visaRequired = ngData.ng['visa-required'].map((cnt : {iso : string}) => cnt.iso.toLowerCase());

  return {visaFree : visaFree, visaOnArrival : visaOnArrival, visaOnline : visaOnline, eta : eta, visaRequired : visaRequired};
}

function App() {
  const [countryInput, setCountryInput] = useState<string>('')

  // @ts-ignore
  const { highlightCountries, selectedCountries, countriesVisaStatus } = useContext(WorldMapContext);

  //! console.log('nigeria data: ', ngData);

  function _handleCountryProcessing() {
    console.log('processing country ', countryInput);

    // Break down the array gotten from processAvailability into respective sections for different highlighting
    const availableCountries = processAvailability(countryInput)
    console.log('availableCountries -- ', availableCountries)
     return highlightCountries(availableCountries)
  }

  return (
    <div className="flex justify-center h-screen border border-black p-16 m-16">
      <WorldMapView
        visaFree={countriesVisaStatus.visaFree}
        visaOnArrival={countriesVisaStatus.visaOnArrival}
        visaOnline={countriesVisaStatus.visaOnline}
        visaRequired={countriesVisaStatus.visaRequired}
        eta={countriesVisaStatus.eta}
      />
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
