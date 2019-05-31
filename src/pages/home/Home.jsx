import React, { Component } from 'react';
import PropTypes from 'prop-types';
import registry from 'app-registry';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import moment from 'moment';
import $ from "jquery";

import StatBar from '../../containers/statBar/StatBar';
import CustomerProfile from '../../containers/customerProfile/CustomerProfile';
import ClaimForm from '../../containers/claimForm';

import Fab from '@material-ui/core/Fab';
import TextField from '@material-ui/core/TextField';

import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    fab: {
        backgroundColor: '#3aafa9'
      }
  });

var agentID;

class Home extends Component{
    constructor(props) {
        super(props);
        this.state = {
            userbar: 'barExpanded',
            policyNumber: '',            
            showPopUp: 'hidden',
            assistantValue: 'activeNo',
            showPolicy: 'hidden',
            showPreviousClaims: 'hidden',
            addNewPolicy: 'hidden',
            showLogoutConfirmation: 'hidden',
            showSubmitConfirmation: 'hidden'
        };
        this.closePopUp = this.closePopUp.bind(this);
        this.invokePopUp = this.invokePopUp.bind(this);
        this.getProcessID = this.getProcessID.bind(this);
        this.showAgentClaims = this.showAgentClaims.bind(this);
        this.addNewClaim = this.addNewClaim.bind(this);
        this.dateFormatter = this.dateFormatter.bind(this);
        this.hideForm = this.hideForm.bind(this);
        this.key = 0;
    }

    componentWillMount(){
        agentID = registry.get('storage').getItem('user-id');
        debugger
        //agentID = 1;
        this.props.fetchAgentInformation(agentID);
        this.props.fetchAgentClaimsHistory(agentID);
        this.props.fetchAgentStats(agentID);
        this.props.fetchClaimsQuestions();
    }

    componentWillReceiveProps(nextProps) {
        this.dataSet = nextProps.customerInfo;        
    }
    
    handleChange = policyNumber => event => {
        this.setState({ 
            [policyNumber]: event.target.value
        });
    };

    invokePopUp(){        
        this.setState({
            showPopUp:''
        });
    }

    closePopUp(){
        this.setState({
            showPopUp:'hidden',
            showPreviousClaims: 'hidden',
            addNewPolicy: 'hidden',
            showLogoutConfirmation: 'hidden',
            showSubmitConfirmation: 'hidden'
        });
    }

    showAgentClaims(){
        this.invokePopUp();
        this.setState({
            showPreviousClaims:''
        });
        this.props.fetchAgentInformation(agentID);
    }
    addNewClaim(){
        this.invokePopUp();
        this.setState({
            addNewPolicy:'',
            policyNumber: ''
        });
    }
    getProcessID(){
        //var policyID = document.getElementById("processSearch").value;
        //alert(policyID)
        this.recalculateHeight();
        var policyID = this.state.policyNumber;
        this.props.fetchCustomerDetails(policyID);
        this.props.fetchClaimsHistoryPolicy(policyID);
        this.setState({
            showPolicy: '',
            userbar: 'barMinimised'
        });
        this.closePopUp();        
    }
    dateFormatter(cell) {
        if (!cell) {
              return "";
        }
        return `${moment(cell).format("DD-MM-YYYY")? moment(cell).format("DD-MM-YYYY"):moment(cell).format("DD-MM-YYYY") }`;
    }
    hideForm(){     
        this.props.fetchAgentClaimsHistory(agentID);
        this.props.fetchAgentStats(agentID);        
        this.setState({
            showPolicy: 'hidden',
            userbar: 'barExpanded',
            showPopUp: '',
            showSubmitConfirmation: ''
        });
        this.key = this.key + 1;
    }
    recalculateHeight(){
        var miscContainer = $('.mainArea').height() -  ($('.statsRow').height() + $('.searchRow').height() + $('.agentRow').height());
        $('.viewRow').height(miscContainer);
    }
    confirmLogout = () =>{
        this.setState({
            showLogoutConfirmation: ''
        })
        this.invokePopUp();
    }
    logout = (event) =>{
        event.preventDefault();
        this.context.router.history.push('/login');
    }
    render(){  
        const { classes, customerData, questionList, agentHistory, agentStats, vehicleHistory, policyHistory} = this.props;
        const agent = this.props.agentData;
        const agentName = agent && this.props.agentData.first_name;
        return(
            <div className="viewableArea">
                <div className="mainArea"> 
                    <div className="row m-0 agentRow">
                        <div className="col-md-12 pt-2">
                            <div className={"userBar cardContainer " + this.state.userbar}>
                                <div className="row m-0">
                                    <div className="col-md-6 p-0">
                                        <div className="avatar pull-left">                 
                                            <img src={require('../../images/avatar.jpg')} alt="" className="" />                                         
                                        </div>
                                        <div className="userLogin pull-left">
                                            <label className="userName">Welcome <span className="name">{agentName}</span></label>
                                            <h5 className="mb-0">
                                                <label for="" className="lastLogin">Last Login: &nbsp;&nbsp;
                                                    <span className="loginDetails">Tuesday</span> | &nbsp;&nbsp;
                                                    <span className="loginDetails">April 23, 2019</span> | &nbsp;&nbsp;
                                                    <span className="loginDetails">16:18:15 IST</span>
                                                </label>
                                            </h5>
                                        </div>
                                    </div>
                                    <div className="col-md-6 right p-0">
                                        <button className="btn homeButons" onClick={this.showAgentClaims}>View Processed Claims</button>
                                        <button className="btn logoutButton" onClick={this.confirmLogout}>
                                            <i class="fas fa-power-off"></i>
                                        </button>
                                    </div>
                                </div> 
                            </div>
                        </div>                        
                    </div>
                    <div className="row m-0 statsRow">
                        <div className="col-md-12">
                            <StatBar agentStats={agentStats} />
                        </div>                        
                    </div>
                    <div className="row m-0 searchRow hidden">
                        <div className="searchPolicy">
                            <div className="row m-0">
                                <div className="col-md-5 pr-0">
                                    <div className="searchBox">
                                       <input type="text" className="searchInput" name="" id="processSearch" autoComplete="off" placeholder="Enter Policy Number" />
                                    </div>                                        
                                </div>
                                <div className="col-md-2 pl-0">                                   
                                    <button className="btn homeButons processClaim" onClick={this.getProcessID}>Process New Claim</button>
                                </div>
                                <div className="col-md-2">
                                    <button className="btn homeButons" onClick={this.invokePopUp}>View Processed Claims</button>
                                </div>
                                <div className="col-md-3">
                                   
                                </div>
                            </div>                            
                        </div>
                    </div>
                    <div className={"row m-0 viewRow height-100 " + this.state.showPolicy}>
                        <div className="col-md-4 pr-1 height-100">
                            <CustomerProfile customerData={customerData} vehicleHistory={vehicleHistory} policyHistory={policyHistory} />
                        </div>
                        <div className="col-md-8 pl-1 height-100">
                            <ClaimForm key ={this.key} customerData={customerData} questionList={questionList} agentID={agentID} policyNumber={this.state.policyNumber} processComplete={this.hideForm}/>
                        </div>
                    </div>  
                    <div className="addNew" onClick={this.addNewClaim}>
                        <Fab aria-label="Add" className={classes.fab}>
                            <i className="fas fa-plus addIcon"></i>
                        </Fab>  
                    </div>                                   
                </div>   
                <div className={"underlay " + this.state.showPopUp}>
                    <div className={"viewClaims " + this.state.showPreviousClaims} >
                        <div className="viewClaimsHistory">
                            <div className="row m-0">
                                <div className="claimHistory">
                                    <h5 className="popUpHeader">Claim History</h5>
                                    <span onClick={this.closePopUp} className="closePopUpIcon">X</span>
                                    <div className="claimTable">
                                        <BootstrapTable data={ agentHistory }>
                                            <TableHeaderColumn dataField='id' isKey>Claim No.</TableHeaderColumn>
                                            <TableHeaderColumn dataField='submitted_date' dataFormat={this.dateFormatter}>Date</TableHeaderColumn>
                                            <TableHeaderColumn dataField='probability_score'>Prob. of Fraud</TableHeaderColumn>
                                            <TableHeaderColumn dataField='is_escalated'>Investigation Recommended?</TableHeaderColumn>
                                            <TableHeaderColumn dataField='Is_fraud'>Fraud Detected?</TableHeaderColumn>
                                            {/* <TableHeaderColumn dataField=''>Status</TableHeaderColumn> */}
                                        </BootstrapTable>
                                    </div>  
                                </div>                            
                            </div>  
                        </div>                            
                    </div>
                    <div className={"searchPolicyID " + this.state.addNewPolicy} >
                        <div className="requestPolicy">
                            <h5 className="popUpHeader">Add New Claim</h5>
                            <span onClick={this.closePopUp} className="closePopUpIcon">X</span>
                            <div className="popUpBody">
                                <p className="subHeader mb-0">Please enter the policy number</p>
                                <TextField
                                    id="outlined-name"
                                    //label="Policy Number"
                                    classes="policyField popUpField"
                                    value={this.state.policyNumber}
                                    onChange={this.handleChange('policyNumber')}
                                    margin="normal"
                                    variant="outlined"
                                    autoComplete="off"
                                    fullWidth
                                    InputLabelProps={{ shrink: true }}
                                />
                                <div className="row m-0">
                                    <div className="col-md-12 p-0 centered">
                                        <button onClick={this.getProcessID} className="popUpSubmit btn">Proceed</button>
                                    </div>
                                </div>                                
                            </div>                            
                        </div>                        
                    </div>
                    <div className={"viewLogoutConfirmation " + this.state.showLogoutConfirmation} >
                        <div className="row m-0">
                            <div className="logoutPopup">
                                <h5 className="popUpHeader">Confirmation</h5>
                                <span onClick={this.closePopUp} className="closePopUpIcon">X</span>
                                <div className="popUpBody">
                                    <p className="subHeader mb-0">Are you sure you want to logout now?</p>
                                    <div className="row m-0 mt-2">
                                        <div className="col-md-12 p-0 centered">
                                            <button onClick={this.logout} className="popUpSubmit btn mr-1">Confirm</button>
                                            <button onClick={this.closePopUp} className="popUpSubmit cancel btn ml-1">Cancel</button>
                                        </div>
                                    </div>                                
                                </div>                   
                            </div>                            
                        </div>  
                    </div>
                    <div className={"viewSubmitConfirmation " + this.state.showSubmitConfirmation} >
                        <div className="row m-0">
                            <div className="logoutPopup">
                                <h5 className="popUpHeader">Confirmation</h5>
                                <div className="popUpBody">
                                    <div className="showSuccess">
                                        <i class="far fa-check-circle"></i>
                                        <p className="subHeader mb-0">New Claim added Successfully.</p>
                                    </div>                                    
                                    <div className="row m-0 mt-3">
                                        <div className="col-md-12 p-0 centered">
                                            <button onClick={this.closePopUp} className="popUpSubmit cancel btn ml-1">Close</button>
                                        </div>
                                    </div>                                
                                </div>                   
                            </div>                            
                        </div>  
                    </div>
                </div>               
            </div>          
        )
    }
}


Home.contextTypes = {
    router: PropTypes.object.isRequired
  }
  
export default withStyles(styles)(Home);
