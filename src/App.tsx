import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from "./pages/Home"
import Store from './pages/Store'
import About from './pages/About'
import ShoppingItemDetail from './components/ShoppingItemDetail'
import Navbar from './components/Navbar'
import Admin from './components/admin'
import ProductForm from './components/admin/ProductForm'
import { ShoppingCartProvider } from './context/ShoppingCartContext'
import { RegistrationFormProvider } from './context/RegistrationContext'
import { SessionsProvider } from './context/SessionContext'
import ProductListState from './context/ProductListState'

function App() {
  return ( 
    <ProductListState>
      <ShoppingCartProvider>
        <RegistrationFormProvider>
          <SessionsProvider>
            <Navbar />
            <Routes>
              <Route path="/product/:id/detail" element={<ShoppingItemDetail />} />
              <Route path="/home" element={<Home />}/>
              <Route path="/" element={<Store />} />
              <Route path="/about" element={<About />} />
              <Route path='/admin' element={<Admin />} />
              <Route path='admin/product/new' element={<ProductForm />} />
            </Routes>
          </SessionsProvider>
          </RegistrationFormProvider>
      </ShoppingCartProvider>
    </ProductListState>

)};

export default App;
