import React, { useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ProductListContext } from '../context/ProductListState'
import DetailCard from './DetailCard';

const ShoppingItemDetail = () => {
  let { id } = useParams()
  let id_param = Number(id)
  const { getProduct, product, loading } = useContext(ProductListContext)

  useEffect(() => {
    getProduct(id_param)
  }, [id_param])
  
  if(loading || product === null) return <div>loading...</div>

  return (
    <DetailCard product={product} id={id_param}/>
  )
};

export default ShoppingItemDetail