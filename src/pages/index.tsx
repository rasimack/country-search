import React, { useEffect, useState } from "react";
import { Search } from "../components/countries/Search";
import { CountriesList } from "../components/countries/CountriesList";
import { CountryDetails } from "../components/countries/CountryDetails";
import { gql, useLazyQuery } from "@apollo/client";
import styled from "styled-components";

interface Country {
  name: string;
  alpha2Code: string;
  flag: {
    emoji: string;
  };
  area: number;
  population: number;
  populationDensity: number;
  capital: string;
}

const GET_COUNTRY_BY_NAME = gql`
  query GetCountryByName($name: String!) {
    Country(filter: { name_contains: $name }) {
      name
      nativeName
      alpha2Code
      area
      population
      populationDensity
      capital
      subregion {
        name
        region {
          name
        }
      }
      officialLanguages {
        iso639_1
        iso639_2
        name
        nativeName
      }
      currencies {
        name
        symbol
      }
      flag {
        emoji
      }
    }
  }
`;

export const Countries: React.FC = () => {
  const [searchInput, setSearchInput] = useState("");
  const [countrySearched, setCountrySearched] = useState<Country[] | null>(
    null
  );
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);

  const [getCountry, { loading, data }] = useLazyQuery(GET_COUNTRY_BY_NAME);

  const onSearchHandle = (input: string) => {
    getCountry({ variables: { name: input } });
  };

  useEffect(() => {
    if (data) setCountrySearched(data);
  }, [data]);

  return (
    <Container>
      <Search onSearchHandle={onSearchHandle} searchLoading={loading} />
      <CountriesList
        setSelectedCountry={setSelectedCountry}
        countrySearched={countrySearched}
      />
      <CountryDetails
        setSelectedCountry={setSelectedCountry}
        selectedCountry={selectedCountry}
      />
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-rows: auto auto auto;
  row-gap: 1rem;
  padding: 1rem;
`;
