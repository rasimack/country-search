import React, { useEffect } from "react";
import { gql, useQuery } from "@apollo/client";
import styled from "styled-components";

const ALL_COUNTRIES = gql`
  query {
    Country {
      name
      alpha2Code
      flag {
        emoji
      }
    }
  }
`;

interface Country {
  name: string;
  alpha2Code: string;
  flag: {
    emoji: string;
  };
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
  const { loading, error, data } = useQuery<CountryQuery>(ALL_COUNTRIES);

  if (loading) return <StyledLoading>Cargando ...</StyledLoading>;

  const renderList = (countries: any) =>
    countries &&
    countries.Country.map((country: any) => (
      <StyledItem
        key={country.alpha2Code}
        onClick={() => setSelectedCountry(country)}
      >
        {`${country.flag.emoji}  ${country.name}`}
      </StyledItem>
    ));

  return <ul>{renderList(countrySearched || data)}</ul>;
};

const StyledItem = styled.li`
  margin: 7px 0;
  color: #ffffff;
  font-weight: bold;

  :hover {
    cursor: pointer;
  }
`;

const StyledLoading = styled.p`
  color: white;
`;
