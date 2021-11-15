import {createContext, useEffect, useState} from 'react';
import axios from 'axios';

export const EmployeeContext = createContext()

const EmployeeContextProvider = (props) => {

    const [employees, setEmployees] = useState(null);

    useEffect(() => {
        axios
        .get("https://randomuser.me/api/?results=1&inc=picture,gender,name,location,login")
        .then((result) => {
            if(employees == null){
                setEmployees(result)
            }
        })
    }, [])//[] because we need to fire this one time when the component loads only 

    useEffect(() => {
        setEmployees(JSON.parse(localStorage.getItem('employees')))
    }, [])
    
    useEffect(() => {
        localStorage.setItem('employees',JSON.stringify(employees))
    })

    
    return (
        <EmployeeContext.Provider value={{employees}}>
            { props.children }
        </EmployeeContext.Provider>
    )
}

export default EmployeeContextProvider