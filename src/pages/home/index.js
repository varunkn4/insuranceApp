import { connect } from 'react-redux';

import Home from './Home';


const mapStateToProps = state => ({
    agentData: state.Home.agentData,
    agentHistory: state.Home.agentHistory,
    agentStats: state.Home.agentStats,
    customerData: state.Home.customerData,
    questionList: state.Home.questionList,
    vehicleHistory: state.Home.vehicleHistory,
    policyHistory: state.Home.policyHistory
});

const mapDispatchToProps = {
    fetchAgentInformation: (agentID) => ({ type: 'CLAIMS:AGENT_DATA:FETCH',agentID }),
    fetchAgentClaimsHistory: (agentID) => ({ type: 'CLAIMS:AGENT_HISTORY:FETCH',agentID }),
    fetchAgentStats: (agentID) => ({ type: 'CLAIMS:AGENT_STATS:FETCH',agentID }),
    fetchCustomerDetails: (policyID) => ({ type: 'CLAIMS:CUSTOMER_DATA:FETCH',policyID }),
    fetchClaimsQuestions: () => ({ type: 'CLAIMS:FORM_QUESTIONS:FETCH' }),
    fetchClaimsHistoryVehicle: () => ({ type: 'CLAIMS:VEHICLE_HISTORY:FETCH' }),
    fetchClaimsHistoryPolicy: (policyID) => ({ type: 'CLAIMS:POLICY_HISTORY:FETCH',policyID })
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Home);