import { BrowserRouter as Router, Route,Switch,NavLink } from 'react-router-dom'
import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';
import Loading from './Loading';
import Edit from './Edit';
import Pagination from './Pagination';
// import { useContext } from 'react'
// import {EmployeeContext} from '../context/EmployeeContext';

function List() {
  
  const [employees, setEmployees] = useState([])
  const [searchflag, setSearchFlag] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage, setPostsPerPage] = useState(4)
  
  useEffect(() => {
    const fetchPosts = async () => {
      if(localStorage.getItem('employees') == null) {
          const result = await axios.get('https://randomuser.me/api/?results=40')
          localStorage.setItem('employees',JSON.stringify(result.data.results))
          setEmployees(result.data.results)
      }else if(JSON.parse(localStorage.getItem('employees')).length == 0){
        const result = await axios.get('https://randomuser.me/api/?results=40')
        localStorage.setItem('employees',JSON.stringify(result.data.results))
        setEmployees(result.data.results)
      }
      else{
        setEmployees(JSON.parse(localStorage.getItem('employees')))
      }
    }

    fetchPosts()
  }, [])
 
  useEffect(() => {
    if(searchflag){
      localStorage.setItem('employees',JSON.stringify(employees))
    }
  }, [employees])
  

  const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage

  function groupArrayOfObjects(list, key) {
    return list.reduce(function(rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  }

  function sortedEmployees() {
      var groupedPeople = groupArrayOfObjects(JSON.parse(localStorage.getItem('employees')),"gender")
      var ret = [].concat(groupedPeople.male, groupedPeople.female)
      setEmployees(ret)
  }

  function search(str) {
    var elements = [];
    employees.forEach(element => {
      if(element.name.first.toLowerCase().includes(str))
      {
        elements.push(element) 
      }
    });
    if(str == ''){
      setEmployees(JSON.parse(localStorage.getItem('employees')))
      setSearchFlag(true)
    }else{
      setSearchFlag(false)
      setEmployees(elements)
    }
  }

  const currentEmployees = employees.slice(indexOfFirstPost,indexOfLastPost) 

  const deleteEmployee = (uuid) => {
    setEmployees(employees.filter(employee => employee.login.uuid !== uuid))
  }  

  const paginate = (pageNumber) => setCurrentPage(pageNumber)


  

  return (
        <>
          <div className="row">
          <div className="btn-group mb-3" role="group" aria-label="Basic example">
              <button onClick={() => sortedEmployees()} type="button" className="btn btn-secondary">sort by gender</button>

              <input type="text" className="form-control" id="formGroupExampleInput" placeholder="first name filter" onChange = { (e) => search(e.target.value)} />

          </div>
          <Pagination postsPerPage={postsPerPage} totalPosts={employees.length} paginate={paginate} />
            { employees ? <>
              {currentEmployees.map
                ((employee) =>(
                  <div className="col-lg-6 col-md-12 d-flex justify-content-center" key={employee.login.uuid}>
                      <div className="card mb-3 w-100" style={{"maxWidth": "540px"}}>
                          <div className="row g-0">
                              <div className="col-md-4">
                                  <img src={employee.picture.large} className="rounded-start w-100 h-100" alt="..." />
                              </div>
                              <div className="col-md-8">
                                  <div className="card-body">
                                      <h5 className="card-title">{ employee.name.title +'. '+ employee.name.first + ' ' + employee.name.last }</h5>
                                      <p className="card-text">{ employee.location.country + ' / ' + employee.location.city}</p>
                                      <p className="card-text"><small className="text-muted">{ employee.email }</small></p>
                                      <div className="row">
                                        <div className="col-4">
                                        <NavLink className="nav-link" to={ '/edit/' + employee.login.uuid } exact>
                                          Edit
                                        </NavLink>
                                        </div>
                                        <div className="col-4">
                                          <button onClick={() => deleteEmployee(employee.login.uuid)}  className="btn text-danger btn-act" data-toggle="modal"><i className="material-icons">delete</i></button>
                                        </div>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
                ))
            }
            </> : <Loading /> }
          </div>

      
        </>
    )
}

export default List