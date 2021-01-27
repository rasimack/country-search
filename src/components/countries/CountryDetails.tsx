import React from "react";
import styled from "styled-components";

interface Country {
  name: string;
  alpha2Code: string;
}

interface Props {
  selectedCountry: Country | null;
}

export const CountryDetails: React.FC<Props> = ({ selectedCountry }) => {
  return <Container>{selectedCountry?.name}</Container>;
};

const Container = styled.div`
  background: yellow;
`;
