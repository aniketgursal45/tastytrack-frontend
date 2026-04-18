import SignUp from "./SignUp"
import Login from "./Login";
import Admin from "./Admin";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ForgotPassword from "./ForgotPassword";
import UpdatePassword from "./UpdatePassword";
import AHome from "./AHome";
import UHome from "./UHome";
import AddProduct from "./AddProduct";
import ManageProducts from "./ManageProducts";
import UpdateProduct from "./UpdateProduct";
import DUsers from "./DUsers";
import Cart from "./Cart";
import Payment from "./Payment";
import OrderSuccess from "./OrderSuccess";
import MyOrders from "./MyOrders";
import AdminOrder from "./AdminOrder";

function App() {

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Admin/>}/> 
        <Route path="/forgetpass" element={<ForgotPassword/>}/>
        <Route path="/updatepassword" element={<UpdatePassword />} />
        <Route path="/AHome" element={<AHome/>} />
        <Route path="/UHome" element={<UHome/>}/>
        <Route path="/AProduct" element={<AddProduct/>}/>
        <Route path="/MProducts" element={<ManageProducts/>}/>
        <Route path="/UProducts/:id" element={<UpdateProduct/>}/>
        <Route path="/DUsers" element={<DUsers/>}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/payment" element={<Payment/>}/>
        <Route path="/oSuccess" element={<OrderSuccess/>}/>
        <Route path="/myorders" element={<MyOrders/>}/>
        <Route path="/aOrder" element={<AdminOrder/>}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
