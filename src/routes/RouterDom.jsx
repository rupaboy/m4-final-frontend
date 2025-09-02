import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router'
import PageNotFound from '../pages/PageNotFound'
// Country Entity
import CountryFinder from '../pages/CountryFinder' // GET /finder
import CollectionCountries from '../pages/CollectionCountries'
import CountryHub from '../pages/CountryHub' // GET /country/:name
// User Entity
import Dashboard from '../pages/Dashboard' // GET /..
import SignInForm from '../pages/SignInForm' // GET user/login
import UserPanel from '../pages/UserPanel' // GET user/id/:id
import SignUpForm from '../pages/SignUpForm' // POST user/register
import UserEditPanel from '../pages/UserEditPanel' // PUT user/edit
import Layout from '../layouts/Layout'
import CollectionUsers from '../pages/CollectionUsers'
import CollectionUsersCreate from '../pages/CollectionUsersCreate'
import CollectionUsersUserData from '../pages/CollectionUsersUserData'
import CollectionUsersEdit from '../pages/CollectionUsersEdit'
// Radio Entity
import CollectionRadioMarkers from '../pages/CollectionRadioMarkers'

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

        {/* Collections Administration */}
        <Route path='/collection/countries' element={<CollectionCountries />} />
        <Route path='/collection/users' element={<CollectionUsers />} />
        <Route path='/collection/radios' element={<CollectionRadioMarkers />} />
        <Route path='/collection/users/create' element={<CollectionUsersCreate />} />
        <Route path='/collection/users/id/:id' element={<CollectionUsersUserData />} />
        <Route path='/collection/users/edit/id/:id' element={<CollectionUsersEdit />} />

        {/* Catch-all 404 */}
        <Route path='*' element={<PageNotFound />} />
        
      </Route>
    </Routes>
  )
}

export default RouterDom