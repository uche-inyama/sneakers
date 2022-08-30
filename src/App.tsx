import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Home from "./pages/Home"
import Store from './pages/Store'
import About from './pages/About'
import ShoppingItemDetail from './components/ShoppingItemDetail'
import Navbar from './components/Navbar'
import RegisterationForm from './pages/Registration'
import Login from './pages/Login'
import { ShoppingCartProvider } from './context/ShoppingCartContext'
import { RegistrationFormProvider } from './context/RegistrationContext'
import { SessionsProvider } from './context/SessionContext'
import ProductListState from './context/ProductListState'
import { useSessionsContext } from './context/SessionContext'

function App() {
 
  return ( 
    <ProductListState>
      <ShoppingCartProvider>
        <RegistrationFormProvider>
          <SessionsProvider>
            <Navbar />
            <div className="ff-Kumbh main-container">
              <Routes>
                <Route path="/product/:id/detail" element={<ShoppingItemDetail />} />
                <Route path="/" element={<Home />}/>
                <Route path="/register" element={<RegisterationForm />} />
                <Route path="/store" element={<Store />} />
                <Route path="/about" element={<About />} />
              </Routes>
            </div>
          </SessionsProvider>
          </RegistrationFormProvider>
      </ShoppingCartProvider>
    </ProductListState>

)};

export default App;
