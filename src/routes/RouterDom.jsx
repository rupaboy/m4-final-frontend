import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router'

// Country Entity
import CountryFinder from '../pages/CountryFinder' // GET /finder
// GET /finder/continents /finder/countries /finder/languages /finder/continents-languages
import CountryHub from '../pages/CountryHub' // GET /country/:name

// User Entity
import Dashboard from '../pages/Dashboard' // GET /..
import SignInForm from '../pages/SignInForm' // GET user/login
import UserPanel from '../pages/UserPanel' // GET user/id/:id

import SignUpForm from '../pages/SignUpForm' // POST user/register
import UserEditPanel from '../pages/UserEditPanel' // PUT user/edit
import Layout from '../layouts/Layout'

const RouterDom = () => {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        {/* Country */}
        <Route path='/finder' element={<CountryFinder />} />
        {/*
        <Route path='/finder/continents' element={<CountryFinder />} />
        <Route path='/finder/countries' element={<CountryFinder />} />
        <Route path='/finder/languages' element={<CountryFinder />} />
        <Route path='/finder/continents-languages' element={<CountryFinder />} />
        */}
        <Route path='/country/:code' element={<CountryHub />} />

        {/* User */}
        <Route path='/' element={<Dashboard />} />
        <Route path='/user/login' element={<SignInForm />} />
        <Route path='/user/register' element={<SignUpForm />} />
        <Route path='/user/id/:id' element={<UserPanel />} />
        <Route path='/user/edit/:id' element={<UserEditPanel />} />

        {/* Radio */}
        <Route path='/country/radio/:code' element={<CountryHub openRadio={true} />} />
      </Route>
    </Routes>
  )
}

export default RouterDom