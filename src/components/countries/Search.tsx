import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { gql, useQuery } from "@apollo/client";

interface Props {
  onSearchHandle: any;
  searchLoading: any;
}

interface Currency {
  code: string;
  name: string;
}

interface Language {
  name: string;
  iso639_1: string;
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
      iso639_1
    }
    Currency {
      name
      code
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
    const inputCapitalized = capitalize(event.target.value);
    setInput(inputCapitalized);
  };

  const capitalize = (input: string) =>
    input.charAt(0).toUpperCase() + input.slice(1);

  return (
    <Container>
      <div className="search">
        <input
          type="text"
          className="input"
          placeholder="Ingrese nombre o codigo de pais"
          onChange={onChangeHandle}
        />
        <button
          className="button"
          disabled={loading || searchLoading}
          onClick={() => onSearchHandle(input)}
        >
          Buscar
        </button>
      </div>
      <div className="filters">
        <div className={"filter-item"}>
          <label>Idioma:</label>
          <select name="language" id="cars">
            {languages &&
              languages.map((language, index) => (
                <option key={index} value={language.iso639_1}>
                  {language.name}
                </option>
              ))}
          </select>
        </div>
        <div className={"filter-item"}>
          <label>Moneda:</label>
          <select name="language" id="cars">
            {currencies &&
              currencies.map((currency, index) => (
                <option key={index} value={currency.code}>
                  {currency.name}
                </option>
              ))}
          </select>
        </div>
        <div className={"filter-item"}>
          <label>Region:</label>
          <select name="language" id="cars">
            {regions &&
              regions.map((region, index) => (
                <option key={index} value={region._id}>
                  {region.name}
                </option>
              ))}
          </select>
        </div>
      </div>
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-rows: 50px 50px;
  row-gap: 1rem;
  justify-content: center;

  .search {
    display: flex;
    justify-content: center;

    .input {
      margin-right: 0.5rem;
      width: 300px;
    }

    .button {
      width: 100px;
    }
  }

  .filters {
    display: flex;
    align-items: center;

    .filter-item {
      display: flex;
      flex-direction: column;
      margin: 0.5rem;

      label {
        padding: 0 0 0.5rem 0;
        color: white;
      }
    }
  }
`;
