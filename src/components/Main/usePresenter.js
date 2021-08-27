import {useSelector} from "react-redux";
import {getState} from "../../store/appReducer/selectors";

function usePresenter (props) {
    return{
        state:useSelector(getState)
    }
}
export default usePresenter;
