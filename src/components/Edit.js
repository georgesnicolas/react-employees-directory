import React, { Fragment, useState, useEffect } from 'react';

import { useParams } from "react-router-dom";

import { useHistory } from "react-router-dom";



function Edit() {
    const history = useHistory();
    const [employees, setEmployees] = useState(JSON.parse(localStorage.getItem('employees')))

    const uuid = useParams().id

    const employee = employees.find( emp => emp.login.uuid == uuid)
    const [title, setTitle] = useState(employee.name.title);
    const [first, setFirst] = useState(employee.name.first);
    const [last, setLast] = useState(employee.name.last);
    const [email, setEmail] = useState(employee.email);
    const [country, setCountry] = useState(employee.location.country);
    const [city, setCity] = useState(employee.location.city);

    const updatedEmployee = {
        "gender":employee.gender,
        "name": {
          "title": title,
          "first": first,
          "last": last
        },
        "location": {
          "street": {
            "number": 6594,
            "name": "Depaul Dr"
          },
          "city": city,
          "state": "Queensland",
          "country": country,
          "postcode": 775,
          "coordinates": {
            "latitude": "-82.3947",
            "longitude": "-126.9027"
          },
          "timezone": {
            "offset": "+8:00",
            "description": "Beijing, Perth, Singapore, Hong Kong"
          }
        },
        "email": email,
        "login": {
          "uuid": uuid,
          "username": "crazyfish621",
          "password": "zhong",
          "salt": "rda8AClO",
          "md5": "fed43c1e0410e1a1f0635ed3dc13fb21",
          "sha1": "ff95c52b73767d5c22670fb5a2f684acd982d09e",
          "sha256": "1a9ff443d95666d26eedd9bae7e6c56879f0970077c76bae89b66f47d4908a66"
        },
        "picture": {
          "large": employee.picture.large,
          "medium": "https://randomuser.me/api/portraits/med/men/20.jpg",
          "thumbnail": "https://randomuser.me/api/portraits/thumb/men/20.jpg"
        }
      }
    const submit = (e) => {
        e.preventDefault();
        setEmployees(employees.map((employee) => employee.login.uuid == uuid ? updatedEmployee : employee))
        // localStorage.setItem('employees',JSON.stringify(employees))
    }
    useEffect(() => {
      localStorage.setItem('employees',JSON.stringify(employees))
    }, [employees])

    return (
        <>

            <div className="row  justify-content-center">
            <div className="col-10 col-sm-6">
                <form onSubmit={submit}>
                    <div className="form-group">
                        <label htmlFor="formGroupExampleInput">title</label>
                        <input type="text" className="form-control" id="formGroupExampleInput" placeholder="title" name="title" value={title} onChange = { (e) => setTitle(e.target.value)}/>
                    </div>
                    <div className="form-group mt-3">
                        <label htmlFor="formGroupExampleInput">first name</label>
                        <input type="text" className="form-control" id="formGroupExampleInput" placeholder="first name" name="first" value={first} onChange = { (e) => setFirst(e.target.value)} />
                    </div>
                    <div className="form-group mt-3">
                        <label htmlFor="formGroupExampleInput">last name</label>
                        <input type="text" className="form-control" id="formGroupExampleInput" placeholder="last name" name="last" value={last} onChange = { (e) => setLast(e.target.value)} />
                    </div>
                    <div className="form-group mt-3">
                        <label htmlFor="formGroupExampleInput2">email</label>
                        <input type="text" className="form-control" id="formGroupExampleInput2" placeholder="email" name="email" value={email} onChange = { (e) => setEmail(e.target.value)} />
                    </div>
                    <div className="form-group mt-3">
                        <label htmlFor="formGroupExampleInput3">country</label>
                        <input type="text" className="form-control" id="formGroupExampleInput3" placeholder="country" name="country" value={country} onChange = { (e) => setCountry(e.target.value)} />
                    </div>
                    <div className="form-group mt-3">
                        <label htmlFor="formGroupExampleInput4">city</label>
                        <input type="text" className="form-control" id="formGroupExampleInput4" placeholder="city" name="city" value={city} onChange = { (e) => setCity(e.target.value)} />
                    </div>
                    <div className="col-auto mt-3 d-flex justify-content-center">
                        <button type="submit" className="btn btn-primary mb-2">Edit employee</button>
                    </div>
                </form>
            </div>
        </div>
        </>
    )
}

export default Edit