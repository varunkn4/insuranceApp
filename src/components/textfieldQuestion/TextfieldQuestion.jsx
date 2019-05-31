import React, { Component } from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery'

class TextfieldQuestion extends Component{
    constructor(props) {
        super(props);
        this.state = {
        };
        this.captureValue = this.captureValue.bind(this);
    }
    
    captureValue(event){
        this.props.setData(event.target.value, this.props.id);
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.reset === true){
            $('.textQuestion').val('');
        }       
    }

    render(){ 
        return(            
            <div className="questionnaireBox">
                <p className="questionnaire">{this.props.question}</p>
                <div className="row m-0">
                    <div className="col-md-12 pr-1 pl-1">
                        <input type={this.props.type} name="" className={"textQuestion " + this.props.classVal} id={this.props.idVal} min="0" max="50" onChange={this.captureValue}/>
                    </div>
                </div>                        
            </div>                       
        )
    }
}


TextfieldQuestion.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
export default TextfieldQuestion;