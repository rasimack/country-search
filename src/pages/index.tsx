import React, { useEffect, useState } from "react";
import { Search } from "../components/countries/Search";
import { CountriesList } from "../components/countries/CountriesList";
import { CountryDetails } from "../components/countries/CountryDetails";
import { gql, useLazyQuery } from "@apollo/client";
import styled from "styled-components";

interface Country {
  name: string;
  alpha2Code: string;
}

const GET_COUNTRY_BY_NAME = gql`
  query GetCountryByName($name: String!) {
    Country(filter: { name_contains: $name }) {
      name
      alpha2Code
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
    console.log("Input", input);
    getCountry({variables: { name:  input }});
  };

  useEffect(() => {
    console.log("data", data);
    if (data) setCountrySearched(data);
  }, [data]);

  return (
    <Container>
      <Search onSearchHandle={onSearchHandle} searchLoading={loading} />
      <CountriesList
        setSelectedCountry={setSelectedCountry}
        countrySearched={countrySearched}
      />
      {selectedCountry && <CountryDetails selectedCountry={selectedCountry} />}
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-rows: auto auto auto;
  row-gap: 1rem;
  padding: 1rem;
`;
