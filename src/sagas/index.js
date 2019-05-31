import { takeLatest, all } from 'redux-saga/effects';
import verifyAuth from '../pages/login/saga';
import { formSubmit, fetchFraudProbability } from '../containers/claimForm/saga';
import { fetchCustomerDetails, fetchClaimsQuestions, fetchAgentInformation, fetchAgentClaimsHistory, fetchAgentStats, fetchClaimsHistoryVehicle, fetchClaimsHistoryPolicy } from '../pages/home/saga';

function* actionWatcher() {
  yield takeLatest('LOGIN:DO_LOGIN', verifyAuth);  
  yield takeLatest('CLAIMS:AGENT_DATA:FETCH', fetchAgentInformation);  
  yield takeLatest('CLAIMS:AGENT_HISTORY:FETCH', fetchAgentClaimsHistory);
  yield takeLatest('CLAIMS:AGENT_STATS:FETCH', fetchAgentStats);  
  yield takeLatest('CLAIMS:CUSTOMER_DATA:FETCH', fetchCustomerDetails); 
  yield takeLatest('CLAIMS:FORM_QUESTIONS:FETCH', fetchClaimsQuestions);
  yield takeLatest('CLAIMS:VEHICLE_HISTORY:FETCH', fetchClaimsHistoryVehicle);  
  yield takeLatest('CLAIMS:POLICY_HISTORY:FETCH', fetchClaimsHistoryPolicy);  
  yield takeLatest('CLAIMS:CLAIMS_FORM:FETCH', formSubmit);  
  yield takeLatest('CLAIMS:FRAUD_PROBABILITY:FETCH', fetchFraudProbability);  
}

export default function* rootSaga() {
   yield all([
     actionWatcher()
   ]);
}