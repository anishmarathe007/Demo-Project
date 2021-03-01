import React, { Component } from 'react'
import './LeaveTracker.css';
import Axios from 'axios';

class LeaveTracker extends Component {

    constructor(props) {
        super(props);
        this.state = ({
            employeeNames: [],
            setEmployeeNames: false,
            employeeData: [],
            setEmployeeData: false,
            countLeaves: 0,
            departmentNames: [],
            setDeparmentNames: false,
            setCountLeaves: false,
            setDisplayEmpName: false,
            EmpName: '',
        })
    }

    componentDidMount() {
        this.getEmployeeNames();
    }

    async getEmployeeNames() {
        var res;
        await Axios.get('http://localhost:3001/getEmployeeName')
            .then(response => {
                res = response.data;
                this.setState({
                    employeeNames: res,
                    setEmployeeNames: true,
                })
            })
    }

    async getTeamNames(e) {
        var id = e.target.value;
        var res;
        this.getTotalLeaves(id);
        await Axios.post('http://localhost:3001/getTeam', {
            eid: id,
        }).then(response => {
            res = response.data;
            this.setState({
                departmentNames: res,
                setDeparmentNames: true,
            })
        })
    }

    async getTotalLeaves(id) {
        var res;
        this.getNameDisplay(id)
        await Axios.post('http://localhost:3001/getTotalLeaves', {
            eid: id,
        }).then(response => {
            res = response.data.result;
            this.setState({
                countLeaves: res,
                setCountLeaves: true,
            })
        })
    }

    async getNameDisplay(id) {
        var res;
        await Axios.post('http://localhost:3001/getNameDisplay', {
            eid: id,
        }).then(response => {
            //console.log(response.data)
            res = response.data;
            this.setState({
                EmpName: res,
                setDisplayEmpName: true,
            })
        })
    }

    render() {
        return (
            <div className="container-leave-tracker">
                <div className="leave-tracker-title">
                    Leave tracker
                </div>
                <div className="select">
                    <div className="select-emp">
                        <select className="select-font">
                            <option defaultChecked>--SELECT--</option>
                            {this.state.setEmployeeNames && this.state.employeeNames.map((value, index) => {
                                return (
                                    <option key={index} value={value.emp_id} onClick={(e) => this.getTeamNames(e)}>{value.emp_name}</option>
                                )
                            })}
                        </select>
                    </div>
                    <div className="emp-name">
                        {this.state.setDisplayEmpName && this.state.EmpName.map((value, index) => {
                            return (
                                <div key={index}>
                                    Employee Name : {value.emp_name}
                                </div>
                            )
                        })}
                    </div>
                    <div className="table-one">
                        <table>
                            <thead>
                                {this.state.setDeparmentNames &&
                                    <tr>
                                        <th>Team Names</th>
                                    </tr>
                                }
                            </thead>
                            <tbody>
                                {this.state.setDeparmentNames && this.state.departmentNames.map((value, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{value.dept_name}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                    <div className="table-two">
                        <table>
                            <thead>
                                {this.state.setCountLeaves &&
                                    <tr>
                                        <th>Total Annual Leaves</th>
                                    </tr>
                                }
                            </thead>
                            <tbody>
                                {this.state.setCountLeaves &&
                                    <tr>
                                        <td>{this.state.countLeaves}</td>
                                    </tr>
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}

export default LeaveTracker
