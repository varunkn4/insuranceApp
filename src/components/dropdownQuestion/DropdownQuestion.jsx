import React, { Component } from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';

var optionValues = [];

const customStyles = {
    control: (base, state) => ({
      ...base,
      height: '34px',
      'min-height': '34px',
    }),
};

class DropdownQuestion extends Component{
    constructor(props) {
        super(props);
        this.state = {
            selectedReason: null,
        };
    } 
    componentWillMount(){
        optionValues = [];
    }   

    handleReasonChange = (selectedReason) => {
        this.setState({ selectedReason });
        var test = this.props.id;
        this.props.setData(selectedReason, this.props.id);
    }

    getOptions(options){
        optionValues = [];
        var i, j =0;
        for(i=0; i < options.length; ++i){
            optionValues[j] = { value: options[i].answer, label: options[i].answer};
            j++;
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.reset === true){
            optionValues = [];
            this.setState({
                selectedReason: null
            })
        }       
    }

    render(){
        const { selectedReason } = this.state;    
        this.getOptions(this.props.options);
        return(
            <div className="questionnaireBox">
                <p className="questionnaire">{this.props.question}</p>
                <div className="row m-0">
                    <div className="col-md-12 pr-1 pl-1">
                        <Select
                            value={selectedReason}
                            onChange={this.handleReasonChange}
                            options={optionValues}
                            className="dropdown"
                            classNamePrefix="dropdownControl"
                            styles={customStyles}
                        />
                    </div>
                </div>  
            </div>              
        )
    }
}


DropdownQuestion.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
export default DropdownQuestion;