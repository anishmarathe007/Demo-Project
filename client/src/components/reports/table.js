import React, { Component } from 'react';
import * as ReactBootStrap from 'react-bootstrap';
import "./table.css"
import Axios from 'axios';

class ResourceTable extends Component {
    constructor(props) {
        super(props);

        this.state = ({
            rawdata: [],
            department: [],
            isDataSet: false,
            setDepartment: false,
            setEmployee: false,
            employee: [],
            singleDept: [],
            setSingleDept: false,
        })
    }

    async showRecords() {
        var res;
        await Axios.get('http://localhost:3001/getRecords').then(response => {
            res = response.data;
            this.setState({
                rawdata: res,
                isDataSet: true,
            })
        });
    }

    async getDepartments() {
        var res;
        await Axios.get('http://localhost:3001/getDepartments').then(response => {
            res = response.data;
            this.setState({
                department: res,
                setDepartment: true,
            })
        })

    }

    async getSingleDepartment(value) {
        const departmentID = value;
        var res;
        await Axios.post('http://localhost:3001/getSingleDepartment', {
            deptId: departmentID,
        }).then(response => {
            res = response.data;
            this.setState({
                singleDept: res,
                setSingleDept: true,
            }, () => console.log("Deparment : ", this.state.singleDept))
        })
    }

    async getEmployeeData(e) {
        var res;
        const value = e.target.value;
        this.getSingleDepartment(value);
        await Axios.post('http://localhost:3001/getEmployeeData', {
            deptId: value,
        }).then(response => {
            res = response.data;
            this.setState({
                employee: res,
                setEmployee: true,
            })
        })
    }

    componentDidMount() {
        this.showRecords()
        this.getDepartments()
    }

    render() {
        return (
            <div className="container" >
                <div className="header">
                    <h3>Resource-Wise Table</h3>
                </div>
                <div className="reactTable" >
                    <ReactBootStrap.Table>
                        <thead>
                            <tr>
                                <th rowSpan="2">Employee ID</th>
                                <th rowSpan="2">Employee Name</th>
                                <th colSpan="2">Leaves</th>
                            </tr>
                            <tr>
                                <th>From</th>
                                <th>To</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.isDataSet && this.state.rawdata.map((value, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{value.emp_id}</td>
                                        <td>{value.emp_name}</td>
                                        <td>{value.start_date}</td>
                                        <td>{value.end_date}</td>
                                    </tr>
                                )
                            })
                            }
                        </tbody>
                    </ReactBootStrap.Table>
                </div >
                <div className="risk-chart-title">
                    <h3>Risk Chart</h3>
                </div>
                <div className="risk-chart">

                </div>
                <div className="drop-down-title">
                    Select the Team
                </div>
                <div className="drop-down">
                    <select>
                        <option selected>--select--</option>
                        {this.state.setDepartment && this.state.department.map((value, index) => {
                            return (
                                <option key={index} value={value.dept_id} onClick={(e) => this.getEmployeeData(e)}>{value.dept_name}</option>
                            )
                        })}
                    </select>
                </div>
                <div className="risk-chart-department">
                    Team Details
                </div>
                <div className="singleDept">
                    <ReactBootStrap.Table>
                        {this.state.setSingleDept &&
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Threshold</th>
                                </tr>
                            </thead>
                        }
                        <tbody>
                            {this.state.setSingleDept && this.state.singleDept.map((value, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{value.dept_name}</td>
                                        <td>{value.threshold * 100}%</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </ReactBootStrap.Table>
                </div>
                <div className="team-wise-employee">
                    Team Wise Employees
                    <ReactBootStrap.Table>
                        {this.state.setEmployee &&
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                </tr>
                            </thead>}
                        <tbody>
                            {this.state.setEmployee && this.state.employee.map((value, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{value.emp_id}</td>
                                        <td>{value.emp_name}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </ReactBootStrap.Table>
                </div>
            </div >
        );
    }

}

export default ResourceTable;