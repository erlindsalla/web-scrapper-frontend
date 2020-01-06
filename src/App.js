import React from 'react';
import MainView from "./components/fetchData/index"
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex; 
  width: 100%;
  justify-content: center;
`;
function App() {
  return (
    <Wrapper>
      <MainView />
    </Wrapper>
  );
}

export default App;
