import React, { useState } from 'react'
import styled from 'styled-components';
import DataScraper from './actions/dataScraper';
import DataView from './views/dataView';

const MainWrapper = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
`;
const MainView = () => {
    const [display, setDisplay] = useState(true);

    const toggle = () => {
        setDisplay(!display)
    }

    return (
        <MainWrapper>
            <DataScraper show={display} toggle={toggle} />
            <DataView show={!display} toggle={toggle} />
        </MainWrapper>
    )
}

export default MainView