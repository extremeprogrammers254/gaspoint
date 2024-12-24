import logo from "./logo.svg"
import Home from "./pages/Home"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import ProductDetails from "./pages/ProductDetails"
import Cart from "./pages/Cart"
import Checkout from "./pages/Checkout"

const App = () => {
  return (
    <BrowserRouter
      future={{
        v7_relativeSplatPath: true,
      }}
    >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="product/:id" element={<ProductDetails />} />
        <Route path="cart/" element={<Cart />} />
        <Route path="checkout/" element={<Checkout />} />
      </Routes>
    </BrowserRouter>

  )
}

export default App
