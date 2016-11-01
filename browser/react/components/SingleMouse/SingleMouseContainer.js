import { connect } from 'react-redux';
import SingleMouse from './SingleMouse';
import { fetchMouseFromServer } from '../../ducks/singleMouse';


const mapStateToProps = function (state) {
  return {
    mouse: state.currentMouse
  };
};

const mapDispatchToProps = function (dispatch, ownProps) {
  return {
    onLoadSingleMouse: function () {
      const mouseId = ownProps.params.mouseId;
      const thunk = fetchMouseFromServer(mouseId);
      dispatch(thunk);
    }
  };
};

const SingleMouseContainer = connect(mapStateToProps, mapDispatchToProps)(SingleMouse);
export default SingleMouseContainer;
