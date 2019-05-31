const defaultState = {
    agentData: {},
    agentHistory: {},
    agentStats: {},
    customerData: {},
    questionList: {},
    vehicleHistory: {},
    policyHistory: {}
};

export default (state = {}, action) => {
    switch (action.type) {
        case 'CLAIMS:AGENT_DATA:FETCH:SUCCESS':
            return { ...state, agentData:action.data  }

        case 'CLAIMS:AGENT_HISTORY:FETCH:SUCCESS':
            return { ...state, agentHistory:action.data  }

        case 'CLAIMS:AGENT_STATS:FETCH:SUCCESS':
            return { ...state, agentStats:action.data  }

        case 'CLAIMS:CUSTOMER_DATA:FETCH:SUCCESS':
            return { ...state, customerData:action.data  }

        case 'CLAIMS:FORM_QUESTIONS:FETCH:SUCCESS':
            return { ...state, questionList:action.data  }

        case 'CLAIMS:VEHICLE_HISTORY:FETCH:SUCCESS':
            return { ...state, vehicleHistory:action.data  }

        case 'CLAIMS:POLICY_HISTORY:FETCH:SUCCESS':
            return { ...state, policyHistory:action.data  }

        default:
            return state;
    }
  };
  