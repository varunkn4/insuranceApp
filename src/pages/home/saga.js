import registry from 'app-registry';
import { store } from '../../store';

function fetchAgentInformation(action) {
    const request = registry.get('request');
    request.getMethod(`http://suyatidev.suyatitech.com:8000/api/v1/user/${action.agentID}/profile/`)
        .then(function(response){
            if(response === null)
                debugger;
            else{     
                store.dispatch({ type: "CLAIMS:AGENT_DATA:FETCH:SUCCESS",data: response});
            }
            debugger
        });
}

function fetchAgentClaimsHistory(action) {
    const request = registry.get('request');
    request.getMethod(`http://suyatidev.suyatitech.com:8000/api/v1/agent/${action.agentID}/policies/`)
        .then(function(response){
            if(response === null)
                debugger;
            else{     
                store.dispatch({ type: "CLAIMS:AGENT_HISTORY:FETCH:SUCCESS",data: response});
            }
        });
}

function fetchAgentStats(action) {
    const request = registry.get('request');
    request.getMethod(`http://suyatidev.suyatitech.com:8000/api/v1/policy/agent/${action.agentID}/widgets`)
        .then(function(response){
            if(response === null)
                debugger
            else{     
                store.dispatch({ type: "CLAIMS:AGENT_STATS:FETCH:SUCCESS",data: response});
            }
        });
}

function fetchCustomerDetails(action) {
    const request = registry.get('request');    
    request.getMethod(`http://suyatidev.suyatitech.com:8000/api/v1/policy/${action.policyID}/profile/`)
        .then(function(response){
            if(response === null)
                debugger;
            else{     
                store.dispatch({ type: "CLAIMS:CUSTOMER_DATA:FETCH:SUCCESS",data: response});
                fetchClaimsHistoryVehicle(response.policy_details.vehicle_registration);
            }
        });
}

function fetchClaimsHistoryVehicle(action){
    const request = registry.get('request');
    request.getMethod(`http://suyatidev.suyatitech.com:8000/api/v1/policy/claim/histories/vehicle/registration/?registration_no=${action}`)
        .then(function(response){
            if(response === null)
                debugger;
            else{     
                store.dispatch({ type: "CLAIMS:VEHICLE_HISTORY:FETCH:SUCCESS",data: response});
            }
        });
}

function fetchClaimsHistoryPolicy(action) {
    const request = registry.get('request');    
    request.getMethod(`http://suyatidev.suyatitech.com:8000/api/v1/policy/history/${action.policyID}/`)
        .then(function(response){
            if(response === null)
                debugger;
            else{     
                store.dispatch({ type: "CLAIMS:POLICY_HISTORY:FETCH:SUCCESS",data: response});
            }
        });
}

function fetchClaimsQuestions(action) {
    const request = registry.get('request');
    request.getMethod(`http://suyatidev.suyatitech.com:8000/api/v1/policy/questions`)
        .then(function(response){
            if(response === null)
                debugger;
            else{     
                store.dispatch({ type: "CLAIMS:FORM_QUESTIONS:FETCH:SUCCESS",data: response});
                debugger
            }
        });
}

export {
    fetchAgentInformation,
    fetchAgentClaimsHistory,
    fetchAgentStats,
    fetchCustomerDetails,
    fetchClaimsQuestions,
    fetchClaimsHistoryVehicle,
    fetchClaimsHistoryPolicy
};
