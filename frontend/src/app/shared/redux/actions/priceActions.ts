import axios from "axios";
import { AppDispatch } from "../store";

import { fetchPricesRequest, fetchPricesSuccess, fetchPricesFailure } from "../reducers/priceReducer";

const api_url = process.env.NEXT_PUBLIC_API_URL;

export const fetchPrices = (symbol : string) => async (dispatch: AppDispatch) => {
    dispatch(fetchPricesRequest());

    try {
        const response = await axios.get( `${api_url}/api/crypto/${symbol}`);
        dispatch(fetchPricesSuccess(response.data));
    } catch (error: any) {
        dispatch(fetchPricesFailure(error?.message))
    }
};