import React, { Component } from 'react';
import DatePicker from "react-datepicker";
import PropTypes from 'prop-types';
import "react-datepicker/dist/react-datepicker.css";

class DateTimeQuestion extends Component{
    constructor(props) {
        super(props);
        this.state = {
            startTime: null,
        };  
        this.handleTimeChange = this.handleTimeChange.bind(this);
    }
    
    componentDidMount(){
        this.setState({startTime:null}, function(){});
    }

    handleTimeChange(time) {
        this.setState({
          startTime: time
        });
        this.props.setData(time, this.props.id);
    } 
    
    componentWillReceiveProps(nextProps) {
        if(nextProps.reset === true){
            this.setState({
                startTime: null
            })
        }       
    }

    render(){
        return(
            <div className="questionnaireBox">
                <p className="questionnaire">{this.props.question}</p>
                <div className="row m-0">
                    <div className="col-md-12 p-0">
                        <DatePicker
                            selected={this.state.startTime}
                            onChange={this.handleTimeChange}
                            showTimeSelect
                            //showTimeSelectOnly
                            timeIntervals={30}
                            dateFormat="YYY-MM-dd HH:mm aa"
                            timeCaption="Time"
                            className="timePicker"
                        />
                    </div>
                </div>
            </div> 
        )
    }
}


DateTimeQuestion.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
export default DateTimeQuestion;