import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Progress } from 'react-sweet-progress';
import "react-sweet-progress/lib/style.css";

var monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

class StatBar extends Component{
    constructor(props) {
        super(props);
        this.state = {
        };
        this.setStatValues = this.setStatValues.bind(this);
        this.processedToAssigned = 0;
        this.ytdToAssigned = 0;
        this.recommendedToProcessed = 0;
        this.fourthNumber = 0;
        this.claimsTarget = null;
        this.claimsProcessed = null;
        this.claimsEscalated = null;
        this.ytdCurrent = null;
        this.ytdTarget = null;
        this.fourthStat = null;
        this.fourthStatTotal = null;
        this.currentMonth = null;
        this.currentYear = null;
    }
    componentWillMount(){
        var currentMonth = new Date;
        this.currentMonth = monthNames[currentMonth.getMonth()];
        this.currentYear = new Date().getFullYear();
    
    }
    setStatValues(noData, claimsTarget, claimsProcessed, claimsEscalated, ytdCurrent, ytdTarget, fourthStat, fourthStatTotal){
        if(noData){
            this.processedToAssigned = 0;
            this.ytdToAssigned = 0;
            this.recommendedToProcessed = 0;
            this.fourthNumber = 0;
            this.claimsTarget = '-';
            this.claimsProcessed = '-';
            this.claimsEscalated = '-';
            this.ytdCurrent = '-';
            this.ytdTarget = '-';
            this.fourthStat = '-';
            this.fourthStatTotal = '-';
        }
        else{
            this.claimsTarget = claimsTarget;
            this.claimsProcessed = claimsProcessed;
            this.claimsEscalated = claimsEscalated;
            this.ytdCurrent = ytdCurrent;
            this.ytdTarget = ytdTarget;
            this.fourthStat = fourthStat;
            this.fourthStatTotal = fourthStatTotal;
            this.processedToAssigned = (claimsProcessed/claimsTarget)*100;
            this.ytdToAssigned = (ytdCurrent/ytdTarget)*100;
            this.recommendedToProcessed = (claimsEscalated/claimsProcessed)*100;
            this.fourthNumber = (fourthStat/fourthStatTotal)*100;
        }        
    }
    render(){  
        const stats = this.props.agentStats;
        const noData = stats && this.props.agentStats.status;
        const claimsTarget = stats && this.props.agentStats.claims_target;
        const claimsProcessed = stats && this.props.agentStats.total_claim_processed;
        const claimsEscalated = stats && this.props.agentStats.claim_sent_for_investigation;
        const ytdCurrent = stats && this.props.agentStats.YTD_current;
        const ytdTarget = stats && this.props.agentStats.YTD_target;
        const fourthStat = 45;
        const fourthStatTotal = 100;
        this.setStatValues(noData, claimsTarget, claimsProcessed, claimsEscalated, ytdCurrent, ytdTarget, fourthStat, fourthStatTotal);
        return(
            <div className="statBar cardContainer">
                <div className="row m-0 height-100">  
                    {/* <div className="col-md-12">
                        <div className="avatar height-100">                                        
                            <img src="../../../src/images/avatar.png" alt=""/>
                        </div>
                    </div>                     */}
                    <div className="col-md-12 p-0">
                        <div className="statParams">
                            <div className="row m-0">
                                <div className="col-md-11 p-0">
                                    <div className="row m-0">                                
                                        <div className="col-md-4 pl-1 pr-1">
                                            <div className="statSection">
                                                <p className="statTitle">Claims Addressed (<span className="statNumber">{this.claimsProcessed}</span>) <span className="statSeperator">vs.</span> Target (<span className="statNumber">{this.claimsTarget}</span>)</p>
                                                <Progress 
                                                    type="line" 
                                                    percent={this.processedToAssigned} 
                                                    width={40}
                                                    strokeWidth={10}
                                                    status="default"
                                                    theme={{
                                                        default: {
                                                        symbol: '',
                                                        color: '#3aafa9',
                                                        trailColor: '#EDEAE5'
                                                        }
                                                    }}
                                                />
                                                <p className="statsTimeframe">{this.currentMonth} {this.currentYear}</p>
                                            </div>                                    
                                        </div>
                                        <div className="col-md-4 pl-1 pr-1">
                                            <div className="statSection">
                                                <p className="statTitle">Claims Addressed YTD (<span className="statNumber">{this.ytdCurrent}</span>) <span className="statSeperator">vs.</span> Target (<span className="statNumber">{this.ytdTarget}</span>)</p>
                                                <Progress 
                                                    type="line" 
                                                    percent={this.ytdToAssigned} 
                                                    width={40}
                                                    strokeWidth={10}
                                                    status="default"
                                                    theme={{
                                                        default: {
                                                        symbol: '',
                                                        color: '#3aafa9',
                                                        trailColor: '#EDEAE5'
                                                        }
                                                    }}
                                                />
                                                <p className="statsTimeframe">{this.currentYear-1} - {this.currentYear}</p>
                                            </div>       
                                        </div>
                                        <div className="col-md-4 pl-1 pr-1">
                                            <div className="statSection">
                                                <p className="statTitle">Recommended for Investigation (<span className="statNumber">{this.claimsEscalated}</span>) <span className="statSeperator">vs.</span> Processed (<span className="statNumber">{this.claimsProcessed}</span>)</p>
                                                <Progress 
                                                    type="line" 
                                                    percent={this.recommendedToProcessed} 
                                                    width={40}
                                                    strokeWidth={10}
                                                    status="default"
                                                    theme={{
                                                        default: {
                                                        symbol: '',
                                                        color: '#3aafa9',
                                                        trailColor: '#EDEAE5'
                                                        }
                                                    }}
                                                />
                                                <p className="statsTimeframe">{this.currentMonth} {this.currentYear}</p>
                                            </div>       
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-1 p-0">
                                    <div className="row m-0">
                                        <div className="col-md-12 p-0">
                                            <div className="statSection centered">
                                                <p className="statTitle mb-0">Value saved</p>
                                                <p className="statNumberValue">$5,100</p>
                                            </div>       
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


StatBar.contextTypes = {
    router: PropTypes.object.isRequired
  }
  
export default StatBar;
