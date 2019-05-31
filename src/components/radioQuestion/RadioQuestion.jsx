import React, { Component } from 'react';
import PropTypes from 'prop-types';

class RadioQuestion extends Component{
    constructor(props) {
        super(props);
        this.state = {
            radioStatus: ''
        };
        this.getRadioStatus = this.getRadioStatus.bind(this);
    }
    
    getRadioStatus(value){
        var radiovalue;
        if(value === 'activeYes')
            radiovalue = 1;
        else radiovalue = 0;
        this.props.setData(radiovalue, this.props.id);
        this.setState({radioStatus:value});
    }
    callRadioStatus(value) {
        if (value === this.state.radioStatus) {
          return 'activeYes';
        }
        else return 'activeNo';
    }
    
    componentWillReceiveProps(nextProps) {
        if(nextProps.reset === true){
            this.setState({
                radioStatus: ''
            });
        }       
    }

    render(){
        return(
            <div className="questionnaireBox">
                <p className="questionnaire">{this.props.question}</p>
                <div className="row m-0">
                    <div className="col-md-12 pr-1 pl-1">
                        <div className="btn-group">
                            <button name="radioSelection" type="button" className={"btn " + this.callRadioStatus("activeYes")} onClick={() => this.getRadioStatus("activeYes")}>Yes</button>
                            <button name="radioSelection" type="button" className={"btn "+ this.callRadioStatus("activeNo")} onClick={() => this.getRadioStatus("activeNo")}>No</button>
                        </div>
                    </div>
                </div>                        
            </div>      
        )
    }
}


RadioQuestion.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
export default RadioQuestion;