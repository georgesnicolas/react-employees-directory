import { useEffect, useState,React, Fragment } from 'react';
import { BrowserRouter as Router, Route,Switch } from 'react-router-dom'
import Create from './components/Create'
import List from './components/List'
import Navbar from './components/Navbar'
import Loading from './components/Loading'
import {useSelector, useDispatch} from 'react-redux'
import Edit from './components/Edit';
// import EmployeeContextProvider from './context/EmployeeContext'

function App() {
  //const counter = useSelector((state) => state.counter)
  // const dispatch = useDispatch()

  return (
    <>
    {/* <EmployeeContextProvider>
      <List/>
    </EmployeeContextProvider> */}
      <Router>
        <div>
          <Navbar />
          <div className="container mt-5">
            <Switch>
              <Route exact path="/">
                  <List/>
              </Route>
              <Route path="/create">
                  <Create/>
              </Route>
              <Route path="/edit/:id">
                  <Edit/>
              </Route>
            </Switch>
          </div>
        </div>
      </Router>
    </>
  )
}

export default App;



// Suggested Features
// • Setup instructions and notes on how you build the application.
// • Use of React JS as a front-end development framework.
// • Use of a client-side router.
// • Ability to display employees by department, title, location, etc.
// • Include names, pictures, job titles in the employee listing.
// • Forms for creating, updating, and deleting employees.
// • Ability to search for employees. 