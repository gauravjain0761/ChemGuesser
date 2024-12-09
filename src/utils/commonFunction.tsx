import Toast from "react-native-toast-message";


export const successToast = (message: string) => {
    Toast.show({ type: "success", text1: message });
};

export const errorToast = (message: string) => {
    Toast.show({ type: "error", text1: message });
};

export const emailCheck = (email: string) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(email) === false) {
        return false;
    } else {
        return true;
    }
};

export const nameCheck = (name: string) => {
    let reg = /^([a-zA-Z ]){2,30}$/;
    if (reg.test(name) === false) {
        return false;
    } else {
        return true;
    }
};

export const passwordCheck = (string: string) => {
    let reg = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{9,}$/;
    return reg.test(string);
};

export const mobileNumberCheck = (mobileNo: string) => {
    let reg = /^\d*$/
    return reg.test(mobileNo);
}