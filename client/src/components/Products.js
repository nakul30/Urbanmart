import { useEffect, useState } from "react";
import styled from "styled-components";
import Product from "./Product";
import { publicRequest } from "../requestMethods";
import { popularProducts } from "../data";
import { ContentPasteSearchOutlined, LocalConvenienceStoreOutlined } from "@mui/icons-material";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 20px;
  justify-content: center;
`;

function Products({ cat, filters, sorts }) {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
  
    useEffect(() => {
      console.log("Cat ", cat)
      const getProducts = async () => {
        console.log("HERE")
        try {
          const url = cat ? `/product/all?cat=${cat}` : `/product/all`;
          console.log("URL ", url)
          const resp = await publicRequest.get(url);
          console.log("Response ", resp)
          setProducts(resp.data);
        } catch (err) {
          console.log(err);
        }
      };
      getProducts();
    }, [cat]);
  
    useEffect(() => {
      cat &&
        setFilteredProducts(
          products.filter((item) =>
            Object.entries(filters).every(([key, val]) => (val ? item[key].includes(val) : true))
          )
        );
    }, [products, cat, filters]);
  
    useEffect(() => {
      if (sorts === 'newest') {
        setFilteredProducts((prev) => [...prev].sort((a, b) => a.createdAt - b.createdAt));
      } else if (sorts === 'asc') {
        setFilteredProducts((prev) => [...prev].sort((a, b) => a.price - b.price));
      }
      if (sorts === 'desc') {
        setFilteredProducts((prev) => [...prev].sort((a, b) => b.price - a.price));
      }
    }, [sorts]);
    // console.log("Popular producs " , popularProducts)
    console.log("Products ", products)
    return (
      
      <Container>
        {cat
        ? filteredProducts.map((item) => <Product item={item} key={item.id} />)
        : products.slice(0, 8).map((item) => <Product item={item} key={item.id} />)}
        {/* {
          popularProducts.map((item,i) => <Product item={item} key={i} />)
        } */}
      </Container>
    );
  }
  
  export default Products;