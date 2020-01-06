import React, { useState, useEffect } from 'react';
import { CSVLink } from "react-csv";
import API from '../../shared/api/api';
import styled from 'styled-components';
import Select from 'react-select';
import colors from '../../shared/helpers/colors'
import Icons from '../../shared/helpers/icons'


const FiltersWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-around;
  height: 70px;
  box-shadow: 0px 4px 7px rgba(121, 121, 121, 0.2);
  border-radius: 3px;
  align-items: center;
`;
const SelectWrapper = styled.div`
  width: 300px;
`;
const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  background-color: ${colors.white};
  font-size: 16px;
  text-align: center;
  border-radius: 5px;
  transition: all 0.15s ease-in-out 0s;
  padding: 6px 20px;
  cursor: pointer;
  border-color: ${colors.black}
`;
const ButtonText = styled.span`
  color: ${colors.textColor}; 
  width: 100%; font-size: 16px;
`;

let options = [];
const Filters = props => {
    const [selectedOption, setSelectedOption] = useState(null);

    useEffect(() => {
      const fetchCities = async () => {
       var response = await API.get('allRestaurants');
        options = [];
        response.data.map(data =>{
          return options.push({
            value:data._id, 
            label: data.name
          })
        })
        
      }
      fetchCities()
    });

  const handleChange = selectedOption => {
        setSelectedOption(selectedOption)
        props.setCity(selectedOption.label)
        props.filterData(selectedOption.label)
      };

      return (
        <FiltersWrapper>
          <ButtonWrapper onClick={()=> {props.toggle()}}>
            <Icons.BackArrow />
          </ButtonWrapper>
          <ButtonWrapper>
            <CSVLink data={props.data} target="_blank" style={{textDecoration:'none', color:'#748AA1'}}>
              Export 
            </CSVLink>
          </ButtonWrapper>
          <SelectWrapper>
            <Select
              value={selectedOption}
              onChange={handleChange}
              options={options}
              style={{width: '300px'}}
            />
          </SelectWrapper>
            <ButtonWrapper onClick={()=>{ props.setEmail('no data')}}>
              <ButtonText>Email</ButtonText>
            </ButtonWrapper>
            <ButtonWrapper>
              <ButtonText onClick={()=>{ props.setPhone('no data')}}>Phone</ButtonText>
            </ButtonWrapper>
        </FiltersWrapper>
      );
}

export default Filters;