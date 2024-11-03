import { apiRequest } from "./connect.js";

export const createCountryObject = function (data) {
  const result = data.map((country) => {
    const nativeNameObj = country.name.nativeName;
    const firstLangKey = nativeNameObj ? Object.keys(nativeNameObj)[0] : null;
    const nativeName = firstLangKey
      ? nativeNameObj[firstLangKey].official
      : "N/A";

    return {
      name: country.name.common,
      nativeName: nativeName,
      population: country.population,
      region: country.region,
      subRegion: country.subregion,
      capital: country.capital ? country.capital[0] : "N/A",
      flag: country.flags.png,
      tld: country.tld ? country.tld.join(", ") : "N/A",
      currencies: country.currencies
        ? Object.values(country.currencies)
            .map((currency) => `${currency.name} (${currency.symbol})`)
            .join(", ")
        : "N/A",
      languages: country.languages
        ? Object.values(country.languages).join(", ")
        : "N/A",
      borders: country.borders ? country.borders.join(", ") : "N/A",
      region: country.region,
    };
  });
  return result.sort((a, b) => a.name.localeCompare(b.name));
};

export const searchNeighbour = async function (codes) {
  try {
    const codeString = codes
      .split(",")
      .map((code) => code.trim())
      .join(",");

    const data = await apiRequest(`alpha?codes=${codeString}`);

    const countryNames = data.map((country) => country.name.common);

    return countryNames;
  } catch (err) {
    console.error(err.message);
    return [];
  }
};
