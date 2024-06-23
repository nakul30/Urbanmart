import React from 'react'
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import Announcement from '../components/Announcement';
import Products from '../components/Products';
import Newsletter from '../components/Newsletter';
import Footer from '../components/Footer';
import { mobile } from '../responsive';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';

const Container = styled.div``;
const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Title = styled.h1`
  margin: 20px;
`;
const Filter = styled.div`
  margin: 20px;
  ${mobile({
    margin: '0 20px',
    display: 'flex',
    flexDirection: 'column',
  })}
`;
const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
  ${mobile({
    marginRight: '0',
  })}
`;

const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
  ${mobile({
    margin: '10px 0',
  })}
`;
const Option = styled.option``;
function ProductList() {
  const location = useLocation();
  const cat = location.pathname.split('/').at(-1);
  const [filters, setFilters] = useState({});
  const [sorts, setSorts] = useState('newest');
  const handleFilters = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };
  const handleSorts = (e) => {
    setSorts(e.target.value);
  };
  return (
    <>
    {/* <div>ProductList</div> */}
    <Container>
      <Navbar />  
      <Announcement />
      <Title>{cat}</Title>
      <FilterContainer>
        <Filter>
        <FilterText>Filter Products</FilterText>
          <Select name="color" onChange={handleFilters}>
            <Option value="">Color</Option>
            <Option>White</Option>
            <Option>Black</Option>
            <Option>Red</Option>
            <Option>Blue</Option>
            <Option>Yellow</Option>
            <Option>Green</Option>
          </Select>
          <Select name="size" onChange={handleFilters}>
            <Option value="">Size</Option>
            <Option>XS</Option>
            <Option>S</Option>
            <Option>M</Option>
            <Option>L</Option>
            <Option>XL</Option>
          </Select>
        </Filter>
        <Filter>
          <FilterText>Sort Products</FilterText>
          <Select onChange={handleSorts}>
            <Option value="newest">Newest</Option>
            <Option value="asc">Price (asc.)</Option>
            <Option value="desc">Price (desc.)</Option>
          </Select>
        </Filter>
      </FilterContainer>
      <Products cat={cat} filters={filters} sorts={sorts} />
      <Newsletter/>
      <Footer />
    </Container>
    </>
   
  )
}

export default ProductList