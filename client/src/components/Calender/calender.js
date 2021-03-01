import React, { Component } from 'react'
import { Calendar } from 'react-date-range';

// import 'react-date-range/dist/styles.css'; // main style file
// import 'react-date-range/dist/theme/default.css';

class CalendarDisplay extends Component {
    constructor(props) {
        super(props)
        this.state = {
            date: new Date(),
        }
    }

    handleSelect(date) {
        console.log(date)
    }

    render() {
        return (
            <div>
                <Calendar
                    date={new Date()}
                    onChange={this.handleSelect}
                />
            </div>
        );
    }
}

export default CalendarDisplay