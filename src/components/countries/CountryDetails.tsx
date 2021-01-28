import React, { useEffect, useState } from "react";
import { gql, useLazyQuery } from "@apollo/client";
import styled from "styled-components";

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
  currencies: Currency[];
  officialLanguages: Language[];
}
interface Currency {
  name: string;
}

interface Language {
  name: string;
}
interface CountryProp {
  name: string;
}
interface Props {
  selectedCountry: CountryProp | null;
  setSelectedCountry: any;
}

export const CountryDetails: React.FC<Props> = ({
  selectedCountry,
  setSelectedCountry,
}) => {
  const [getCountry, { loading, data }] = useLazyQuery(GET_COUNTRY_BY_NAME);

  const [countryDetails, setCountryDetails] = useState<Country | null>(null);

  useEffect(() => {
    if (selectedCountry)
      getCountry({ variables: { name: selectedCountry.name } });
  }, [selectedCountry]);

  useEffect(() => {
    if (data) setCountryDetails(data.Country[0]);
  }, [data]);

  return (
    <Container isVisible={!!selectedCountry}>
      <div className="modal-content">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <span className="close" onClick={() => setSelectedCountry(null)}>
              &times;
            </span>
            <div>
              <h3>{`${countryDetails?.flag.emoji} ${countryDetails?.name}`}</h3>
              <div>
                <label>{`Area: ${countryDetails?.area}`}</label>
              </div>
              <div>
                <label>{`Poblacion: ${countryDetails?.population}`}</label>
              </div>
              <div>
                <label>{`Capital: ${countryDetails?.capital}`}</label>
              </div>
              <div>
                <label>Currencies:</label>
                <ul>
                  {countryDetails?.currencies.map((currency) => (
                    <li>{currency.name}</li>
                  ))}
                </ul>
              </div>
              <div>
                <label>Languagues:</label>
                <ul>
                  {countryDetails?.officialLanguages.map((language) => (
                    <li>{language.name}</li>
                  ))}
                </ul>
              </div>
            </div>
          </>
        )}
      </div>
      )
    </Container>
  );
};

const Container = styled.div<{ isVisible: boolean }>`
  display: ${(props) => (props.isVisible ? "block" : "none")};
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);

  .modal-content {
    background-color: #fefefe;
    margin: 15% auto;
    padding: 20px;
    border: 1px solid #888;
    width: 80%;
  }

  .close {
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
  }

  .close:hover,
  .close:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
  }
`;
