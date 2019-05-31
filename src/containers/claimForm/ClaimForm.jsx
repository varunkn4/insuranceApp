import React, { Component } from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';

import DateTimeQuestion from '../../components/dateTimeQuestion/DateTimeQuestion';
import DropdownQuestion from '../../components/dropdownQuestion/DropdownQuestion';
import RadioQuestion from '../../components/radioQuestion/RadioQuestion';
import TextfieldQuestion from '../../components/textfieldQuestion/TextfieldQuestion';

import Switch from '@material-ui/core/Switch';
import Snackbar from '@material-ui/core/Snackbar';
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    colorSwitchBase: {
      color: '#3aafa9',
      '&$colorChecked': {
        color: '#2b7a78',
        '& + $colorBar': {
          backgroundColor: '#838383',
        },
      },
    },
    colorBar: {},
    colorChecked: {}
});

const assistText = `Make AI-augmented decisions between 'Recommend Investigation' and 'Process Claim'.`;

const learnText = `Decide without AI assistance, let the AI learn from your decision making process.`;

class ClaimForm extends Component{
    constructor(props) {
        super(props);
        this.state = {            
            open: false
        };  

        this.getData = this.getData.bind(this);
        this.submitClaim = this.submitClaim.bind(this);
        this.submitInvestigation = this.submitInvestigation.bind(this);
        this.checkQuestion = this.checkQuestion.bind(this);
        this.showSuccess = this.showSuccess.bind(this);
        this.showAssistantHelper = this.showAssistantHelper.bind(this);
        this.test = this.test.bind(this);
        
        this.reset= false;
        this.checkedA= false;
        this.showSnackBar = 'hidden';
        this.snackType = null;
        this.snackIcon = null;

        this.timeVal = null;
        this.reason = null;
        this.injury = null;
        this.passengers = null;
        this.police = null;
        this.driver = null;
        this.cctv = null;
        this.visibility = null;
        this.emotion = null;
        this.showSnackbarMessage = null;
        this.probabilityValue = null;
    }
        
    componentWillReceiveProps(nextProps) {
        var reservedHeight = $('.formTitle').height() + $('.submissionButtons').height() + 50;
        var setHeight = $('.mainForm').height() - reservedHeight;
        $('.newForm').height(setHeight);

        if(this.props.response != nextProps.response){
            const response = nextProps.response;            
            if(response){
                this.checkedA = false;
                this.showSuccess(response.name);
            }
        }  
        
        if(this.props.probability != nextProps.probability){
            const probability = nextProps.probability;            
            if(probability){
                this.probabilityValue = probability;
                this.showAssistantHelper(probability.probability);
            }
        }  
    }

    getData(val,id){
        if(id === 1)
            this.timeVal = val;
        if(id === 2){
            var getReasonValue = val.value;
            var newReasonValue ="";
            if(getReasonValue === "Head-on collision")
                newReasonValue = "HEAD-ON COLLISIONS"
            if(getReasonValue === "Rear-end collision")
                newReasonValue = "REAR-END COLLISIONS"
            if(getReasonValue === "Side-impact collision")
                newReasonValue = "SIDE-IMPACT COLLISIONS"
            if(getReasonValue === "Sideswipe collision")
                newReasonValue = "SIDESWIPE COLLISIONS"
            if(getReasonValue === "Rollover")
                newReasonValue = "ROLLOVER"
            if(getReasonValue === "Single car accident")
                newReasonValue = "SINGLE CAR ACCIDENTS"
            if(getReasonValue === "Multi-vehicle pile-up")
                newReasonValue = "MULTI-VEHICLE PILE-UPS"

            this.reason = newReasonValue;
        }            
        if(id === 3)
            this.passengers = val;            
        if(id === 4)
            this.injury = val;
        if(id === 5)
            this.police = val;
        if(id === 6)
            this.driver = val;
        if(id === 7)
            this.cctv = val;
        if(id === 8)
            this.visibility = val;
        if(id === 9){
            var emotionValue = val.value;
            var newEmotion = "";
            if(emotionValue === "Uncertain")
                newEmotion = "Sadness"
            else
                newEmotion = emotionValue
            this.emotion = newEmotion;
        }

        this.checkQuestion();
    }

    submitClaim(){        
        var formData ={
            "agent_ID" : this.props.agentID,
            "policy_ID" : this.props.policyNumber,
            "date" : this.timeVal,
            "nature" : this.reason,
            "emotion" : this.emotion,
            "passengers" : this.passengers,
            "injury" : this.injury,
            "reported_to_police" :  this.police,
            "cctv" : this.cctv,
            "visibility_challenge" : this.visibility,
            "caller_driver" : this.driver,
            "escalate_status" : 0,
            "probability_score" : "0.02"
        }; 
        this.props.formSubmit(formData);
    }

    test(e){
        alert(e.target.value)
    }

    submitInvestigation(){        
        var formData ={
            "agent_ID" : this.props.agentID,
            "policy_ID" : this.props.policyNumber,
            "date" : this.timeVal,
            "nature" : this.reason,
            "emotion" : this.emotion,
            "passengers" : this.passengers,
            "injury" : this.injury,
            "reported_to_police" :  this.police,
            "cctv" : this.cctv,
            "visibility_challenge" : this.visibility,
            "caller_driver" : this.driver,
            "escalate_status" : 1,
            "probability_score" : this.probabilityValue.probability
            // "probability_score" : "0.02"
        }; 

        this.props.formSubmit(formData);
    }

    handleSnackOpen = () => {
        this.setState({ open: true }, function(){});
    };

    handleSnackClose = () => {
        this.setState({ open: false }, function(){});
    };

    checkQuestion(){
        var customerData = this.props.customerData;
        if(
            this.timeVal != null &&
            this.reason != null &&
            this.injury != null &&
            this.passengers != null &&
            this.police != null &&
            this.driver != null &&
            this.cctv != null &&
            this.visibility != null &&
            this.emotion != null
        ){
            var probabilityData ={
                "agent_ID" : this.props.agentID,
                "policy_ID" : this.props.policyNumber,
                "date" : this.timeVal,
                "nature" : this.reason,
                "emotion" : this.emotion,
                "passengers" : this.passengers,
                "injury" : this.injury,
                "reported_to_police" :  this.police,
                "cctv" : this.cctv,
                "visibility_challenge" : this.visibility,
                "caller_driver" : this.driver
            }; 
            this.props.fetchFraudProbability(probabilityData,customerData);
        }
    }

    handleSwitchChange = name => event => { 
        // this.setState({ [name]: event.target.checked });
        this.checkedA = event.target.checked;
        if(this.checkedA === true){
            this.checkQuestion();
            this.handleSnackOpen();
        }
        else{
            this.handleSnackClose();
        }
    };
    
    showSuccess(claimID) {
        if(claimID){
            //alert("Validation Processed for " + claimID);  
            this.props.processComplete();
            this.setState({
                //reset: true
                open: false
            });
            this.reset = true;
            this.checkedA= false;
            this.showSnackBar = 'hidden';
            this.snackType = null;
            this.snackIcon = null;

            this.timeVal, this.reason, this.injury, this.passengers, this.police, this.driver, this.cctv, this.visibility, this.emotion = null;
        }
        
    }

    showAssistantHelper(probability){
        // /alert(probability)
        if(probability >= 0){
            if(probability <= 0.5){
                if(this.checkedA === true){
                    this.showSnackBar = '';
                    this.snackType = 'snackBarValid';
                    this.snackIcon = "fas fa-check-circle";
                    this.showSnackbarMessage = "This looks like a genuine claim.";
                }
            }
            else{
                if(this.checkedA === true){
                    this.showSnackBar = '';
                    this.snackType = 'snackBarFraud';
                    this.snackIcon = "fas fa-exclamation-triangle";
                    this.showSnackbarMessage = "This looks like a fraud claim.";
                }
            }
        }        
    }

    render(){
        const { classes , questionList = [] } = this.props;
        return(
            <div className="cardContainer p-0 height-100">
                <div className="mainForm">
                    <div className="formTitle">
                        <div className="row m-0">
                            <div className="col-md-6 p-0">
                                <h5>Claim Validation Form</h5>
                            </div>
                            <div className="col-md-6 p-0">
                                <div className="switch">
                                    <label className="switchLabel">Learn</label>
                                    <Tooltip title={learnText}>                                        
                                        <i className="fas fa-question-circle help"></i>
                                    </Tooltip>                                    
                                    <Switch 
                                        checked={this.checkedA}
                                        onChange={this.handleSwitchChange('checkedA')}
                                        value="checkedA"
                                        classes={{
                                            switchBase: classes.colorSwitchBase,
                                            checked: classes.colorChecked,
                                            bar: classes.colorBar,
                                            }}
                                    />
                                    <label className="switchLabel">Assist</label>
                                    <Tooltip title={assistText}>
                                        <i className="fas fa-question-circle help"></i>
                                    </Tooltip>                                    
                                </div>
                            </div>
                        </div>                        
                    </div>
                    <div className="newForm">
                        {
                            questionList.map(questionData => {
                                
                                switch(questionData.category) {
                                    case 'datetime': 
                                        return <DateTimeQuestion question={questionData.question} setData={this.getData} id={questionData.id} reset={this.reset} />
                                    case 'dropdown': 
                                        return <DropdownQuestion question={questionData.question} options={questionData.question_answer_details} id={questionData.id} setData={this.getData} reset={this.reset} />
                                    case 'radio': 
                                        return <RadioQuestion question={questionData.question} setData={this.getData} id={questionData.id} reset={this.reset} />
                                    case 'textbox': 
                                        return <TextfieldQuestion question={questionData.question} type="number" classVal="passengerNumber" idVal="passengerNum" setData={this.getData} id={questionData.id} reset={this.reset} />
                                    default: '';
                                        break;
                                }
                            })
                        }                 
                    </div>
                    <div className="submissionButtons pt-2">
                        <button className="btn processClaim mr-1" onClick={this.submitClaim}>Process Claim</button>
                        <button className="btn processClaim mr-1" onClick={this.submitInvestigation}>Recommend Investigation</button>
                    </div>
                </div>
                <div className={"snackBar " + this.showSnackBar}>
                    <Snackbar
                        variant="success"
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        open={this.state.open}
                        className={this.snackType}
                        // autoHideDuration={6000}
                        //onClose={this.handleSnackClose}
                        ContentProps={{
                            'aria-describedby': 'message-id',
                        }}
                        message={
                            <div>
                                <i className={this.snackIcon}></i>&nbsp;&nbsp;
                                <span id="message-id">{this.showSnackbarMessage}</span>
                                <i class="fas fa-times closeIcon" onClick={this.handleSnackClose}></i>
                            </div>                            
                        }
                    />
                </div>
            </div>              
        )
    }
}


ClaimForm.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(ClaimForm);