import axios from "axios";
import { asyncKeys, clearAsync, getAsyncToken } from "./asyncStorage";
import { errorToast } from "./commonFunction";
import { dispatchAction } from "../redux/hooks";
import { IS_LOADING } from "../redux/actionTypes";
import { navigationRef } from "../navigation/mainNavigator";
import { SCREENS } from "../navigation/screenNames";
import { API } from "./apiConstant";


interface makeAPIRequestProps {
    method?: any;
    url?: any;
    data?: any;
    headers?: any;
    params?: any;
}

export const makeAPIRequest = ({ method, url, data, params, headers }: makeAPIRequestProps) => new Promise((resolve, reject) => {
    const option = {
        method,
        baseURL: API.BASE_URL,
        url,
        data: data,
        headers: {
            Accept: "application/json",
            ...headers,
            "Content-Type": "application/json",
        },
        params: params
    };
    axios(option)
        .then((response) => {
            console.log("res--->", API.BASE_URL + url, data, params, response?.data);
            if (response.status === 200 || response.status === 201) {
                resolve(response);
            } else {
                reject(response);
            }
        })
        .catch((error) => {
            console.log("err--->", API.BASE_URL + url, data, params, error, error?.response?.status);
            reject(error);
        });
});


export const setAuthorization = async (authToken: any) => {
    const token = await getAsyncToken();
    if (authToken == '') {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        axios.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
    }
};

export const removeAuthorization = async () => {
    await clearAsync()
    delete axios.defaults.headers.common.Authorization;
};


export const formDataApiCall = (data: any, url: any, onSuccess: any, onFailure: any) => {
    let formData = new FormData()
    if (data) {
        Object.keys(data).map((element) => {
            if (data[element] !== undefined) {
                formData.append(element, data[element]);
            }
        });
    }

    console.log(data)
    return fetch(API.BASE_URL + url, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
            Authorization: axios.defaults.headers.common['Authorization'],
        },
        body: formData,
    })
        .then((response) => {
            console.log('response--------', response, data)
            return response.json().then((responseJson) => {
                if (responseJson.status == true) {
                    onSuccess(responseJson)
                } else {
                    if (onFailure) onFailure()
                    if (responseJson?.message) {
                        errorToast(responseJson?.message)
                    } else errorToast('Please try again')
                }
            });
        })
        .catch((err) => {
            console.log(err)
            if (onFailure) onFailure()
            errorToast('Please try again')
        });
}


export const handleSuccessRes = (res: any, onSuccess: any, onFailure: any, dispatch: any, fun?: () => void) => {
    if (res?.status === 200 || res?.status === 201) {
        dispatchAction(dispatch, IS_LOADING, false)
        if (res?.data.status) {
            if (fun) fun()
            if (onSuccess) onSuccess(res?.data);
        } else {
            if (onFailure) onFailure(res?.data);
            errorToast(res?.data?.message)
        }
    }
}

export const handleErrorRes = (err: any, onFailure: any, dispatch: any, fun?: () => void) => {
    if (err?.response?.status == 401) {
        dispatchAction(dispatch, IS_LOADING, false)
        removeAuthorization()
        navigationRef.reset({
            index: 0,
            routes: [{ name: SCREENS.LoginScreen }]
        })
        errorToast('Please login again')
    } else {
        dispatchAction(dispatch, IS_LOADING, false)
        if (err?.response?.data?.errors) {
            errorToast(err?.response?.data?.message);
        } else if (err?.response?.data?.message) {
            errorToast(err?.response?.data?.message);
        } else if (err?.response?.data?.error) {
            errorToast(err?.response?.data?.error?.message);
        } else if (err?.message) {
            errorToast(err?.message)
        } else {
            errorToast('Something went wrong! Please try again')
        }
        if (fun) fun()
        if (onFailure) onFailure(err?.response);
    }

}
