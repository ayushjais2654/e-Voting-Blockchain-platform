import {storeUser} from './action';
import {STORE_USER} from "./action";
import {produce} from "immer";

let initialState ={
    username: "",
    firstName: "",
    lastName: "",
    mobileNo: null,
    aadharCard: null,
    isEligible : false,
};

export default (state = initialState, action) => {
    produce(state, draft => {
        switch (action.type) {
            case STORE_USER:{
                draft.username = action.data.username;
                draft.firstName = action.data.firstName;
                draft.lastName = action.data.lastName;
                draft.mobileNo = action.data.mobileNo;
                draft.aadharCard = action.data.aadharCard;
                draft.isEligible = action.data.isEligible;
                break;
            }
            default:{

            }
        }
    });
}