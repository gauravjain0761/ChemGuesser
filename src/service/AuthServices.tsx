import { ThunkAction } from "redux-thunk";
import { dispatchAction, RootState } from "../redux/hooks";
import { AnyAction } from "redux";
import { IS_LOADING } from "../redux/actionTypes";
import { handleErrorRes, handleSuccessRes, makeAPIRequest } from "../utils/apiGlobal";
import { API, POST } from "../utils/apiConstant";

interface requestProps {
    data?: any;
    params?: any;
    onSuccess?: (res: any) => void;
    onFailure?: (res: any) => void;
}

export const onUserLogin = ({ data, params, onSuccess, onFailure }: requestProps): ThunkAction<void, RootState, unknown, AnyAction> =>
    async (dispatch) => {
        dispatchAction(dispatch, IS_LOADING, true)
        return makeAPIRequest({ method: POST, url: API.login, data: data })
            .then(async (response: any) => {
                handleSuccessRes(response, onSuccess, onFailure, dispatch, () => {
                    // successToast(response?.data?.message)
                    // dispatchAction(dispatch, SET_USER_INFO, response?.data?.data?.user)
                })
            })
            .catch((error) => {
                handleErrorRes(error, onFailure, dispatch)
            });
    };