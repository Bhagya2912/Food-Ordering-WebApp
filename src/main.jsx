import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Home from './components/Home/Home.jsx'
import About from './components/About/About.jsx'
import Layout from './Layout.jsx'
import Contact from './components/Contact/Contact.jsx'
import Menu from './components/Menu/menu.jsx'
import Login from './components/Login/Login.jsx'
import SignUp from './components/SignUp/SignUp.jsx'
import { CartProvider } from './context/CartContext.jsx'
import Cart from './components/Cart/Cart.jsx'
import Wishlist from './components/Wishlist/Wishlist.jsx'
import Productdetails from './components/Productdetails/Productdetails.jsx'
import CheckOut from './components/CheckOut/CheckOut.jsx'
import OrderHistory from './components/OrderHistory/OrderHistory.jsx'
import Offer from './components/Offer/Offer.jsx'






// const router = createBrowserRouter([{
//        path: '/',
//        element: <Layout/>,
//        children:[
//        {
//         path:"",
//         element: <Home/>
//        },
//        {
//         path:"about",
//         element: <About/>
//        },
//        {
//         path:"contact",
//         element: <Contact/>
//        }
//       ]
// }
// ])

const router =createBrowserRouter(
  createRoutesFromElements(
      
    <Route path='/' element={<Layout/>}>
      
      <Route index element={<Home />} />
      <Route path='about' element={<About/>}></Route>
      <Route path='contact' element={<Contact/>}></Route>
      
       
      <Route 
      
      path='menu' 
      element={<Menu />}
       />
       <Route path='SignUp' element={<SignUp/>}/>
        <Route path='login' element={<Login/>}></Route>
        <Route path="/Cart" element={<Cart />} />
       <Route path="/wishlist" element={<Wishlist />} />
       <Route path="/order-history" element={<OrderHistory />} />
       <Route path='product-detail' element={<Productdetails />} />
       <Route path='Offer' element={<Offer />} />
      <Route path='checkout' element={<CheckOut/>} />
        
    </Route>
    
  )
)
 

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CartProvider>
      <RouterProvider router={router}/>
    </CartProvider>
     
 
   
  </StrictMode>,
)
