import { createContext, useState } from "react";

interface WorldMapContextProps {
  highlightCountries: (countriesName: string[]) => void;
  selectedCountries: string[];
  isCountryHighlighted: (countryName: string) => boolean;
  toggleCountry: (countryName: string) => void;
  highlightCountry: (countryName: string) => void;
  countriesVisaStatus: object;
}

export const WorldMapContext = createContext<WorldMapContextProps | null>(null)

function WorldMapProvider({ children }: { children: React.ReactNode }) {
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [countriesVisaStatus, setCountriesVisaStatus] = useState<object>({
    visaFree: [],
    visaOnArrival: [],
    visaOnline: [],
    visaRequired: [],
    eta: []
  })

  const isCountryHighlighted = (countryName: string) => {
    return selectedCountries.includes(countryName)
  }

  const toggleCountry = (countryName: string) => {
    setSelectedCountries(prevCountries => (
      prevCountries.includes(countryName) ?
        prevCountries.filter(p => p !== countryName) :
        [...prevCountries, countryName]
    ))
  }

  const highlightCountry = (countryName: string) => {
    setSelectedCountries(prevCountries =>
      prevCountries.includes(countryName) ?
        prevCountries : [...prevCountries, countryName]
    )
  }

  const highlightCountries = (countryObject: any) => {
    const countriesName = Object.values<string[]>(countryObject).flat();

    setCountriesVisaStatus({
      ...countriesVisaStatus,
      visaFree: countryObject.visaFree,
      visaOnArrival: countryObject.visaOnArrival,
      visaOnline: countryObject.visaOnline,
      visaRequired: countryObject.visaRequired,
      eta: countryObject.eta
    })

    setSelectedCountries(prevCountries => (
      prevCountries.concat(countriesName.filter(i => !prevCountries.includes(i))))
    )
  }



  return (
    <WorldMapContext.Provider value={{
      isCountryHighlighted,
      toggleCountry,
      highlightCountries,
      highlightCountry,
      selectedCountries,
      countriesVisaStatus
    }}>
      {children}
    </WorldMapContext.Provider>
  )
}

export default WorldMapProvider;
