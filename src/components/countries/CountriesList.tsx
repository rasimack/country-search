import React, { useEffect } from "react";
import { gql, useQuery } from "@apollo/client";

const ALL_COUNTRIES = gql`
  query {
    Country {
      name
      nativeName
      alpha2Code
      alpha3Code
      area
      population
      populationDensity
      capital
      demonym
      gini
      location {
        latitude
        longitude
      }
      flag {
        emoji
        emojiUnicode
        svgFile
      }
    }
  }
`;

interface Country {
  name: string;
  alpha2Code: string;
}

interface CountryQuery {
  Country: Country[];
}

interface CountryData {
  setSelectedCountry: any;
  countrySearched: Country[] | null;
}

export const CountriesList: React.FC<CountryData> = ({
  setSelectedCountry,
  countrySearched,
}) => {
  const { loading, error, data } = useQuery<CountryQuery[]>(ALL_COUNTRIES);

  if (loading) return <p>Cargando ...</p>;

  const onClickHandler = (country: any) => {
    setSelectedCountry(country);
  };

  const renderList = (countries: any) =>
    countries &&
    countries.Country.map((country: any) => (
      <div key={country.alpha2Code} onClick={() => onClickHandler(country)}>
        {country.name}
      </div>
    ));

  return <div>{renderList(countrySearched || data)}</div>;
};
