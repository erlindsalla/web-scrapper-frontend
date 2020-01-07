import React from 'react';
import API from '../../shared/api/api';
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
    justify-content: space-between;
`;


const Button = styled.button`
    background-color: ${colors.white};
    font-size: 16px;
    text-align: center;
    border-radius: 5px;
    color: ${colors.textColor}; 
    font-size: 16px;
    min-width: 120px;
    height: 40px; 
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
            
            onSubmit={(values) => {
                console.log('here', API)
                const scrapeData = async () =>{
                  const response = await API.post('fetchRestaurantData', {
                        url: values.url,
                        cityName: values.name,
                        pageNumber: values.totalNumberOfPages
                    })
                    console.log('scrape dat response ===>', response);
                    if(response.data === 'ok'){
                        alert('Data is being scraped!')
                    }
                }
                scrapeData()
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
                    <Button type='submit'>
                        submit
                    </Button>
                <Button onClick={ (e) => {props.toggle(); e.preventDefault()}}  >
                        See All Data
                </Button>
            </FooterWrapper>
            </form>
        )}
        </Formik>
    </FormWrapper>
    );
}

export default Scraper;