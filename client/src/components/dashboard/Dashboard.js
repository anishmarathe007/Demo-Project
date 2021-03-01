import React, { Component } from 'react'
import Navbar from "./navbar/Navbar"
import Sidebar from './sidebar/Sidebar';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Today from '../today/Today';
import LeaveTracker from '../leave-tracker/LeaveTracker';
class Dashboard extends Component {

    render() {
        return (
            <BrowserRouter>
                <div className="container">
                    <Navbar />
                    <Sidebar />
                    <Switch>
                        <Route path="/today" exact component={Today} />
                        <Route path="/LeaveTracker" exact component={LeaveTracker} />
                    </Switch>
                </div>
            </BrowserRouter>
        )
    }
}

export default Dashboard
