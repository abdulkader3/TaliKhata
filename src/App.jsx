import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import './App.css'
import Home from './Page/Home/Home.jsx'
import Layout from './Layout/Layout.jsx'
import AddCustomer from './Page/AddCustomer/AddCustomer.jsx'

function App() {


  const shifaIslam = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path='/' element={<Layout/>}>


        <Route index element={<Home/>}/>
        <Route path='/add-customer' element={<AddCustomer/>}/>


        
        </Route>
      </Route>
    )
  )


  return (
    <>


    <RouterProvider router={shifaIslam}/>
     
    </>
  )
}

export default App
