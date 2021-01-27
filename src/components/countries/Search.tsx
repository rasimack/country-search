import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { gql, useQuery } from "@apollo/client";

interface Props {
  onSearchHandle: any;
  searchLoading: any;
}

interface Currency {
  _id: string;
  name: string;
}

interface Language {
  _id: string;
  name: string;
}

interface Region {
  _id: string;
  name: string;
}

const GET_COUNTRY_FILTERS = gql`
  query {
    Region {
      name
      _id
    }
    Language {
      name
      _id
    }
    Currency {
      name
      _id
    }
  }
`;

export const Search: React.FC<Props> = ({ onSearchHandle, searchLoading }) => {
  const [input, setInput] = useState("");
  const [languages, setLanguages] = useState<Language[] | null>(null);
  const [currencies, setCurrencies] = useState<Currency[] | null>(null);
  const [regions, setRegions] = useState<Region[] | null>(null);

  const { loading, error, data } = useQuery(GET_COUNTRY_FILTERS);

  useEffect(() => {
    if (data) {
      setLanguages(data.Language);
      setCurrencies(data.Currency);
      setRegions(data.Region);
    }
  }, [data]);

  const onChangeHandle = (event: any) => {
    console.log(event.target.value);
    setInput(event.target.value);
  };

  console.log("data", data);

  return (
    <Container>
      <div className="search">
        <input
          type="text"
          placeholder="Ingrese pais a buscar"
          onChange={onChangeHandle}
        />
        <button
          disabled={loading || searchLoading}
          onClick={() => onSearchHandle(input)}
        >
          Buscar
        </button>
      </div>
      <div className="filters">
        <label>Idiomas</label>
        <select name="language" id="cars">
          {languages &&
            languages.map((language) => (
              <option value={language._id}>{language.name}</option>
            ))}
        </select>
        <label>Moneda</label>
        <select name="language" id="cars">
          {currencies &&
            currencies.map((currency) => (
              <option value={currency._id}>{currency.name}</option>
            ))}
        </select>
        <label>Region</label>
        <select name="language" id="cars">
          {regions &&
            regions.map((region) => (
              <option value={region._id}>{region.name}</option>
            ))}
        </select>
      </div>
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-rows: auto auto;
  row-gap: 1rem;

  .search {
    display: flex;
  }

  .filters {
    display: flex;
  }
`;
