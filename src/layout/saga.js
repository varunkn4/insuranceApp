import { put } from 'redux-saga/effects';
import registry from 'app-registry';

//#region User Details
function* fetchUserDetails(action) {
//   const request = registry.get('request');
//   const userId = registry.get('storage').getItem('user-id');
//   const response = yield request.getMethod(`http://192.168.69.33:5000/api/v1/user/${userId}/profile/`);
//   if (response[0] !== null) {
//     yield put({ type: "SIDENAV:USER_DETAILS:SUCCESS", data: response[0] });
//   }
//   else {
//     yield put({ type: "SIDENAV:USER_DETAILS:FAIL", error: 'User details not found' });
//   }
}

export default fetchUserDetails;
//#endregion
