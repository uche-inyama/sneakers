import React, { useContext } from 'react'
import { useFileFormContext, FileFormContext } from '../../context/RegistrationContext'
import { ProductListContext } from '../../context/ProductListState'

const ProductForm = () => {
  const { createProduct } = useContext(ProductListContext)


  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(e.target)
    const data = new FormData();
    data.append("product[name]", e.target.name.value)
    data.append("product[marketing_statement]", e.target.marketing_statement.value)
    data.append("product[product_price]", e.target.product_price.value)
    data.append("product[product_discount]", e.target.product_discount.value)
    data.append("product[images]", e.target.images.files[0])
    data.append("product[images]", e.target.images.files[1])
    submitToApi(data)
  }

  const submitToApi = (data: any) => {
    createProduct(data)
  }

  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label htmlFor='name'>name</label>
          <input type="text" name="name" id="name"/>
        </div>
        <div>
          <label htmlFor='marketing_statement'>marketing statement</label>
          <input type="textarea" name="marketing_statement" id="marketing_statement"/>
        </div>
        <div>
          <label htmlFor='product_price'>product price</label>
          <input type="number" name="product_price" id="product_price"/>
        </div>
        <div>
          <label htmlFor='product_discount'>product discount</label>
          <input type="product_discount" name="product_discount" id="product_discount"/>
        </div>
        <div>
          <label htmlFor='image'>image</label>
          <input type="file" name="images" id="images" multiple/>
        </div>
        <input type="submit" />
      </form>
    </div>
  )
}

export default ProductForm;