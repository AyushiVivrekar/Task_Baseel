import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Col, Container, Row, Modal, Button } from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';
import NavSection from './NavSection';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faSort, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';

function EmployeeList() {
    const [employees, setEmployees] = useState([]);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortConfig, setSortConfig] = useState({ key: 'employee_name', direction: 'asc' });

    const [showModal, setShowModal] = useState(false); 
    const [editName, setEditName] = useState("");    
    const [editAge, setEditAge] = useState("");      
    const [editSalary, setEditSalary] = useState(""); 
    const [currentIndex, setCurrentIndex] = useState(null); 

    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        try {
            const response = await axios.get('https://dummy.restapiexample.com/api/v1/employees');
            setEmployees(response.data.data);
        } catch (err) {
            setError('Error fetching employees. Please try again later.');
        }
    };

    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const sortedEmployees = [...employees].sort((a, b) => {
        if (sortConfig.direction === 'asc') {
            return a[sortConfig.key] > b[sortConfig.key] ? 1 : -1;
        } else {
            return a[sortConfig.key] < b[sortConfig.key] ? 1 : -1;
        }
    });

    const getSortIcon = (key) => {
        if (sortConfig.key === key) {
            return sortConfig.direction === 'asc' ? faSortUp : faSortDown;
        }
        return faSort;
    };

  
    const handleRemove = (index) => {
        const updatedEmployees = employees.filter((_, ind) => ind !== index);
        setEmployees(updatedEmployees);  
    };

   
    const handleEdit = (employee, index) => {
        setEditName(employee.employee_name); 
        setEditAge(employee.employee_age);  
        setEditSalary(employee.employee_salary); 
        setCurrentIndex(index);              
        setShowModal(true);                  
    };

   
    const handleNameChange = (e) => {
        setEditName(e.target.value);
    };


    const handleAgeChange = (e) => {
        setEditAge(e.target.value);
    };


    const handleSalaryChange = (e) => {
        setEditSalary(e.target.value);
    };

   
    const editSubmit = () => {
        const updatedEmployees = [...employees];
        updatedEmployees[currentIndex].employee_name = editName;   
        updatedEmployees[currentIndex].employee_age = editAge;   
        updatedEmployees[currentIndex].employee_salary = editSalary; 
        setEmployees(updatedEmployees);                           
        setShowModal(false);                                     
    };

    return (
        <>
            <NavSection />

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title className='text-center'>Edit Employee</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className='form-group groupform'>
                            <input
                                className='form-control'
                                type="text"
                                placeholder='Enter Edit Name'
                                value={editName} 
                                onChange={handleNameChange} 
                            />
                            <input
                                className='form-control mt-3'
                                type="text"
                                placeholder='Enter Edit Age'
                                value={editAge} 
                                onChange={handleAgeChange}
                            />
                            <input
                                className='form-control mt-3'
                                type="text"
                                placeholder='Enter Edit Salary'
                                value={editSalary}
                                onChange={handleSalaryChange} 
                            />
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={() => setShowModal(false)}>
                        Close
                    </Button>
                    <Button variant="success" onClick={editSubmit}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>

            <div className='background-container'>
                <div className='container d-flex justify-content-end align-items-center'>
                    <div>
                        <Dropdown>
                            <Dropdown.Toggle variant="" id="dropdown-basic" style={{ background: "linear-gradient(to right, rgba(161, 187, 243, 0.334), rgba(118, 190, 244, 0.604))", color: "#ffff" }}>
                                Action Button
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item href="#/action-1">Update</Dropdown.Item>
                                <Dropdown.Item href="#/action-2">View</Dropdown.Item>
                                <Dropdown.Item href="#/action-3">Delete</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                    <div className='form-group ml-3'>
                        <input
                            placeholder='Search..'
                            type='search'
                            className='form-control searchField'
                            onChange={(e) => setSearchTerm(e.target.value)}
                            width="20%"
                        />
                    </div>
                </div>

                <Container>
                    <Row>
                        <Col md={3}></Col>
                        <Col md={8}>
                            <table className='table table-responsive'>
                                <thead>
                                    <tr className="table-primary">
                                        <th>S.No</th>
                                        <th onClick={() => handleSort('employee_name')} style={{ cursor: 'pointer' }}>
                                            Employee Name <FontAwesomeIcon icon={getSortIcon('employee_name')} />
                                        </th>
                                        <th className='text-center' onClick={() => handleSort('employee_age')} style={{ cursor: 'pointer' }}>
                                            Employee Age <FontAwesomeIcon icon={getSortIcon('employee_age')} />
                                        </th>
                                        <th className='text-center' onClick={() => handleSort('employee_salary')} style={{ cursor: 'pointer' }}>
                                            Employee Salary <FontAwesomeIcon icon={getSortIcon('employee_salary')} />
                                        </th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        sortedEmployees.filter((value) => {
                                            if (searchTerm === "") {
                                                return value;
                                            } else if (value.employee_name.toLowerCase().includes(searchTerm.toLowerCase())) {
                                                return value;
                                            }
                                        }).map((empData, index) => (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{empData.employee_name}</td>
                                                <td className='text-center'>{empData.employee_age}</td>
                                                <td className='text-center'>{empData.employee_salary}</td>
                                                <td>
                                                    <span className='text-danger me-3 ms-3' onClick={() => handleRemove(index)} style={{ cursor: 'pointer' }}>
                                                        <FontAwesomeIcon icon={faTrash}/>
                                                    </span>
                                                    <span className='text-success' onClick={() => handleEdit(empData, index)} style={{ cursor: 'pointer' }}>
                                                        <FontAwesomeIcon icon={faEdit} />
                                                    </span>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </Col>
                        <Col md={1}></Col>
                    </Row>
                </Container>
            </div>
        </>
    );
}

export default EmployeeList;
