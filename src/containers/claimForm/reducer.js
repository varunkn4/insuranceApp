const defaultState = {
    response : {},
    probability: {}
};

export default (state = {}, action) => {
    switch (action.type) {

        case 'CLAIMS:CLAIMS_FORM:FETCH:SUCCESS':
            return { ...state, response:action.data  }

        case 'CLAIMS:FRAUD_PROBABILITY:FETCH:SUCCESS':
            return { ...state, probability:action.probability  }         

        default:
            return state;
    }
  };
