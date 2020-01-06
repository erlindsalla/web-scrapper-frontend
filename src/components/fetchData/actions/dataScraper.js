import React from 'react'
import styled from 'styled-components';
import { Formik } from 'formik';
import colors from '../../shared/helpers/colors';

const FormWrapper = styled.div`
    display: ${props => props.show ? 'flex' : 'none'}
    flex-direction: column;
    justify-content: center;
    max-width: 500px;
    margin-top: 100px;
    padding: 30px;
    box-shadow: 0px 4px 7px rgba(121, 121, 121, 0.2);
    border-radius: 3px;
    background: white;
`;
const Header = styled.h1`

`;

const InputWrapper = styled.div`
    margin-bottom: 20px;
`;
const Label = styled.div`
    margin:0px 0px 10px 5px;
    color: ${colors.textColor};
`;
const Input = styled.input`
    width: 100%;
    height: 25px;
    height: 43px;
    border-width: 1px;
    border-style: solid;
    border-color: rgb(225, 230, 236);
    border-radius: 3px;
    background: rgb(255, 255, 255);
`;
const FooterWrapper = styled.div`
    margin-top: 20px;
    display: flex;
    justify-content: space-around;
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
export const Scraper = (props) => {

    return(
        <FormWrapper show={props.show}>
        <Header>
            Trip Advisor Scrapper
        </Header>
            <Formik
            initialValues={{
                 url: '', 
                 name: '',
                 totalNumberOfPages: ''
            }}
            
            onSubmit={(values, { setSubmitting }) => {
                fetch('http://localhost:3000/fetchRestaurantData', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        url: values.url,
                        cityName: values.name,
                        pageNumber: values.totalNumberOfPages
                    }),
                })
                .then(response => {console.log(response)})
                .catch((error) => {
                    console.error(error);
                });
            }}
        >
        {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
        }) => (
            <form onSubmit={handleSubmit}>
            
            <InputWrapper>
                <Label>Url</Label>
                <Input  
                    name={'url'} 
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.url}
                />
            </InputWrapper>
            {errors.name && touched.name && errors.name}
            <InputWrapper>
                <Label>Name</Label>
                <Input  
                    name={'name'} 
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name}
                />
            </InputWrapper>
            <InputWrapper>
                <Label>Page number</Label>
                <Input  
                    name={'totalNumberOfPages'} 
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.totalNumberOfPages}
                />
            </InputWrapper>
            {errors.password && touched.password && errors.password}
            <FooterWrapper>
                <ButtonWrapper type="submit" >
                    <ButtonText>
                        Submit
                    </ButtonText>
                </ButtonWrapper>
                <ButtonWrapper onClick={ () => {props.toggle()}}>
                    <ButtonText>
                        See All Data
                    </ButtonText>
                </ButtonWrapper>
            </FooterWrapper>
            </form>
        )}
        </Formik>
    </FormWrapper>
    );
}

export default Scraper;