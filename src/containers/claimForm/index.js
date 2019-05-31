import { connect } from 'react-redux';

import ClaimForm from './ClaimForm';

const mapStateToProps = state => ({
    response: state.ClaimForm.response,
    probability: state.ClaimForm.probability
});

const mapDispatchToProps = {
    formSubmit: (formData) => ({ type: 'CLAIMS:CLAIMS_FORM:FETCH',formData }),
    fetchFraudProbability: (probabilityData,customerData) => ({ type: 'CLAIMS:FRAUD_PROBABILITY:FETCH',probabilityData,customerData })
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ClaimForm);
