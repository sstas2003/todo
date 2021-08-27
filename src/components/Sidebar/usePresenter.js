import {useSelector} from "react-redux";
import {getState} from "../../store/appReducer/selectors";
import {useLocation} from "react-router";

function usePresenter (props) {
    return{
        state:useSelector(getState),
        location:useLocation()
    }
}
export default usePresenter;
