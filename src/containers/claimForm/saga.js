import registry from 'app-registry';
import { store } from '../../store';

function formSubmit(action) {
    const request = registry.get('request');

    const agentID = parseInt(action.formData.agent_ID);
    const policy_ID = action.formData.policy_ID;
    const date = action.formData.date;
    const nature = action.formData.nature;
    const emotion = action.formData.emotion;
    const passengers = action.formData.passengers;
    const injury = action.formData.injury;
    const reported_to_police = action.formData.reported_to_police;
    const cctv = action.formData.cctv;
    const visibility_challenge = action.formData.visibility_challenge;
    const caller_driver = action.formData.caller_driver;
    const escalate_status = action.formData.escalate_status;
    const probability_score_number = action.formData.probability_score;

    const probability_score = probability_score_number.toString();

    //const probability_score = action.formData.probability_score;


    const requestOptions = {
      crossDomain: true,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        emotional_state: emotion,
        visibility_challenges: visibility_challenge,
        cctv: cctv,
        actual_driver: caller_driver,
        reported_to_police: reported_to_police,
        no_of_passengers: passengers,
        serious_injury: injury,
        nature_of_accident: nature,
        date_of_accident: date,
        insurance_policy_id: policy_ID,
        agent_id: agentID,
        is_escalated: escalate_status,
        probability_score: probability_score
      })
    };
    // const response = {
    //   name : "test"
    // }
    
    request.postMethod('http://suyatidev.suyatitech.com:8000/api/v1/policy/form/', requestOptions)
      .then(function(response){
          if(response === null)
              debugger;
          else{     
              store.dispatch({ type: "CLAIMS:CLAIMS_FORM:FETCH:SUCCESS", data: response});
          }
    });
  }

  function fetchFraudProbability(action) {

    const request = registry.get('request');

    const agentID = action.probabilityData.agent_ID;
    const date = action.probabilityData.date;
    const nature = action.probabilityData.nature;
    const emotion = action.probabilityData.emotion;
    const passengers = action.probabilityData.passengers;
    const injury = action.probabilityData.injury;
    const reported_to_police = action.probabilityData.reported_to_police;
    const cctv = action.probabilityData.cctv;
    const visibility_challenge = action.probabilityData.visibility_challenge;
    const caller_driver = action.probabilityData.caller_driver;

    const race = action.customerData.race;
    const customerID = action.customerData.customer_id;
    const age = action.customerData.age;
    const name = action.customerData.name;
    const address = action.customerData.address;
    const eyeSight = action.customerData.eye_sight_issue;
    const claimsNo = action.customerData.no_of_claims_filed;
    const prevClaim = action.customerData.no_of_days_from_last_claim;

    const requestOptions = {
      crossDomain: true,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        customer_id: customerID,
        name: name,
        age: age,
        race: race,
        address: "test",
        eye_sight_issue: eyeSight,
        no_of_claims_filed: claimsNo,
        no_of_days_from_last_claim: prevClaim,
        claim_form: [
            {
                emotional_state: emotion,
                visibility_challenges: visibility_challenge,
                cctv: cctv,
                actual_driver: caller_driver,
                reported_to_police: reported_to_police,
                no_of_passengers: passengers,
                serious_injury: injury,
                nature_of_accident: nature,
                date_of_accident: date,
                is_escalated: true
          }
        ]
      })
    };
    
    // const response = {
    //   probability : "0.02"
    // }

    request.postMethod('http://suyatidev.suyatitech.com:8000/api/v1/policy/form/probability/', requestOptions)
      .then(function(response){
          if(response === null)
              debugger;
          else{     
              store.dispatch({ type: "CLAIMS:FRAUD_PROBABILITY:FETCH:SUCCESS",probability: response});
          }
    });
  }
  
  export {
    formSubmit,
    fetchFraudProbability
  };
