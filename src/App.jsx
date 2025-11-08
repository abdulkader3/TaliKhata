import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import './App.css'
import Home from './Page/Home/Home.jsx'
import Layout from './Layout/Layout.jsx'
import AddCustomer from './Page/AddCustomer/AddCustomer.jsx'
import NotFound from './Components/NotFound/NotFound.jsx'
import Inbox from './Page/Inbox/Inbox.jsx'
import NotificationWelcome from './Components/Notification/NotificationWelcome.jsx'

function App() {


  const shifaIslam = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path='/' element={<Layout/>}>


        <Route index element={<Home/>}/>
        <Route path='/add-customer' element={<AddCustomer/>}/>
        <Route path='/inbox' element={<Inbox/>}/>
        <Route path='*' element={<NotFound/>}/>


        
        </Route>
      </Route>
    )
  )


  return (
    <>
      <NotificationWelcome />
      <RouterProvider router={shifaIslam}/>
    </>
  )
}

export default App
