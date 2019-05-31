import { connect } from 'react-redux';

import Main from './Main'

const mapStateToProps = state => ({
    // userDetails: state.sidenavlayout.userDetails,
    // fetchError: state.sidenavlayout.fetchError
});

const mapDispatchToProps = {
    //fetchUserDetails: () => ({ type: 'SIDENAV:USER_DETAILS:FETCH' })
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Main);
