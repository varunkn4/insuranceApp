import React, { Component } from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import moment from 'moment';

var otherClaimsVehicle = [{
    ref_id: "QW54",
    policy_id: "489",
    claim_amount: "$4500",
    date: "12/4/2016"

}, {
    ref_id: "GT02",
    policy_id: "632",
    claim_amount: "$300",
    date: "5/11/2017"
}]


var otherClaimsPolicy = [{
    ref_id: "A54D",
    claim_amount: "$300",
    date: "18/12/2018"
}, {
    ref_id: "B65T",
    claim_amount: "$1200",
    date: "6/3/2019"
}];

class CustomerProfile extends Component{
    constructor(props) {
        super(props);
        this.state = {
            
        };  
        this.dateFormatter = this.dateFormatter.bind(this);      
    }
    dateFormatter(cell) {
        if (!cell) {
              return "";
        }
        return `${moment(cell).format("DD-MM-YYYY")? moment(cell).format("DD-MM-YYYY"):moment(cell).format("DD-MM-YYYY") }`;
    }
    render(){
        const customerData = this.props.customerData;
        const policyID = customerData && customerData.id;
        const customerName = customerData && customerData.name;
        const customerAge = customerData && customerData.age;
        const customerID = customerData && customerData.customer_id;
        const customerAddress = customerData && customerData.address;
        const vehicleMake = customerData && customerData.policy_details.vehicle_make;
        const vehicleModel = customerData && customerData.policy_details.vehicle_model;
        const vehicleRegistration = customerData && customerData.policy_details.vehicle_registration;
        const policyIssue = customerData && customerData.policy_details.issue_date;
        const policyValidity = customerData && customerData.policy_details.expiry_date;

        const vehicleHistory = this.props.vehicleHistory;
        const policyHistory = this.props.policyHistory;

        const options = {
            page: 1,
            sizePerPageList: [ {
              text: '1', value: 1
            }],
            sizePerPage: 1,
            pageStartIndex: 1,
            paginationSize: 3,
            paginationPosition: 'bottom'
          };
        return(
            <div className="customerInfo cardContainer h-100">
                <div className="row m-0">
                    <div className="basicInfo">
                        <div className="row m-0 profile">
                            <div className="col-md-3">
                                <div className="profilePicture">
                                    <img src={require('../../images/avatar.jpg')} alt="" className="" />      
                                </div>                                
                                
                            </div>
                            <div className="col-md-9 pt-1">
                                <div className="infoHeader">
                                    <label className="infoValue">{customerName}</label>                                    
                                </div>                                
                                <div className="infoDialog">
                                    <label className="infoValue">#{customerID}</label>
                                    <label className="infoTitle">&nbsp;&nbsp;|&nbsp;&nbsp;</label>
                                    <label className="infoValue">{customerAge} years</label>
                                </div>                             
                            </div>
                        </div>
                        <div className="row m-0">
                            <div className="claimHistory">
                                <h5 className="historyTitle">Policy Details</h5>
                                <div className="claimSummary">
                                    <div className="claimBox">
                                        <div className="claimBoxTitle">
                                            <label className="claimBoxTitleLabel">Policy Number&nbsp;&nbsp;</label>
                                            <label className="claimBoxTitleValue">{policyID}</label>
                                        </div>
                                        <div className="row m-0">
                                            <div className="col-md-6 p-0">
                                                <div className="claimBoxContent">
                                                    <label className="claimBoxContentLabel">Issue Date&nbsp;&nbsp;</label>
                                                    <label className="claimBoxContentValue">{this.dateFormatter(policyIssue)}</label>
                                                </div>
                                            </div>
                                            <div className="col-md-6 p-0">
                                                <div className="claimBoxContent">
                                                    <label className="claimBoxContentLabel">Valid Through&nbsp;&nbsp;</label>                                                        
                                                    <label className="claimBoxContentValue">{this.dateFormatter(policyValidity)}</label>
                                                </div>
                                            </div>
                                        </div>       
                                        <div className="row m-0">
                                            <div className="col-md-12 p-0">
                                                <div className="claimBoxContent">
                                                    <label className="claimBoxContentLabel">Vehicle Details&nbsp;&nbsp;</label>
                                                    <label className="claimBoxContentValue">{vehicleMake}</label>
                                                    <label className="claimBoxContentLabel">&nbsp;&nbsp;|&nbsp;&nbsp;</label>
                                                    <label className="claimBoxContentValue">{vehicleModel}</label>
                                                    <label className="claimBoxContentLabel">&nbsp;&nbsp;|&nbsp;&nbsp;</label>
                                                    <label className="claimBoxContentValue">{vehicleRegistration}</label>
                                                </div>
                                            </div>
                                        </div>                                            
                                    </div>
                                </div>                        
                            </div>                            
                        </div> 
                        <div className="row m-0">
                            <div className="claimHistory">
                                <h5 className="historyTitle">Previous Claims for Policy</h5>
                                <div className="">
                                    <BootstrapTable data={ policyHistory } trClassName='otherVehicleTable' pagination={ true } options={ options }>
                                        <TableHeaderColumn dataField='id' className='otherVehicleTable_header' isKey>Ref. ID</TableHeaderColumn>
                                        <TableHeaderColumn dataField='claim_amount' className='otherVehicleTable_header'>Amount (in $)</TableHeaderColumn>
                                        <TableHeaderColumn dataField='claim_date' className='otherVehicleTable_header' dataFormat={this.dateFormatter}>Date</TableHeaderColumn>
                                    </BootstrapTable>
                                </div>                        
                            </div>                            
                        </div>         
                        <div className="row m-0">
                            <div className="claimHistory">
                                <h5 className="historyTitle">Previous Claims for Vehicle</h5>
                                <div className="">
                                    <BootstrapTable data={ vehicleHistory } trClassName='otherVehicleTable' pagination={ true } options={ options }>
                                        <TableHeaderColumn dataField='id' className='otherVehicleTable_header' isKey>Ref. ID</TableHeaderColumn>
                                        <TableHeaderColumn dataField='insurance_policy_id_id' className='otherVehicleTable_header'>Policy</TableHeaderColumn>
                                        <TableHeaderColumn dataField='claim_amount' className='otherVehicleTable_header'>Amount (in $)</TableHeaderColumn>
                                        <TableHeaderColumn dataField='claim_date' className='otherVehicleTable_header' dataFormat={this.dateFormatter}>Date</TableHeaderColumn>
                                    </BootstrapTable>
                                </div>                        
                            </div>                            
                        </div>                  
                    </div>
                </div>                
            </div>                
        )
    }
}
  
export default CustomerProfile;