import React, { useState, useEffect } from 'react';
import API from '../../shared/api/api';
import styled from 'styled-components';
import Table from './table';
import DataFilters from '../actions/dataFilters';
import colors from '../../shared/helpers/colors';
import Paginator from './paginatior';

const MainWrapper = styled.div`
  display: ${props => props.show  ? 'flex' : 'none'}
  justify-content: center;
  flex-direction: column;
  width: 100%;
`;
const TableWrapper = styled.div`
  display: flex;
  background-color: ${colors.white};
  border: 1px solid ${colors.lightGrey};
  border-radius: 3px;
  height: 470px;
  overflow-y: scroll;
  width: 100%;
`;
const PaginatorWrapper = styled.div`
  margin: 20px 0px;
  display: flex;
  justify-content: center;
`;

const DataView = (props) => {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [city, setCity] = useState();
    const [phone, setPhone] = useState(null)
    const [email, setEmail] = useState(null)
    const filterData = async (city, currentPage, phone, email) =>{
      var response = await API.post('allRestaurants', {city, currentPage, phone, email})
      setData(response.data.resData);
      setTotalPages(response.data.resDataLength / 100)
    }

    useEffect(() => {
      filterData(city, currentPage, phone, email)
    },[currentPage, city, phone, email]);

    const getTableData = (values = []) => ({
      header: [
          {
            label: 'NAME',
            key: 'name',
            renderer: ({ name }) => name,
          },
          {
            label: 'EMAIL',
            key: 'email',
            renderer: ({ email }) => email,
          },
          {
            label: 'PHONE',
            key: 'phone',
            renderer: ({ phone }) => phone,
          }
      ],
      values: values,
    });
    
    const updatePaginatorPage = currentPage => {
      setCurrentPage(currentPage);
    };

    return(
      <MainWrapper show={props.show}>
          <DataFilters
            filterData={filterData} 
            toggle={props.toggle} 
            data={data} 
            setCity={setCity}
            setPhone={setPhone}
            setEmail={setEmail}
          />
          <TableWrapper>
            <Table data={getTableData(data)} style={{width: '100%'}} />
          </TableWrapper>
          <PaginatorWrapper>
            <Paginator 
                changePage={updatePaginatorPage}
                numberOfPages={totalPages}
                page={currentPage}
            />
          </PaginatorWrapper>
      </MainWrapper>
    )
}

export default DataView;