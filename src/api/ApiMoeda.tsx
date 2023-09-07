import axios from "axios";
import { baseURL } from "../config/config";
import { message } from "../utils/Toast";

axios.defaults.baseURL = baseURL

export const ApiMoeda = {
    getAll,
    getMoeda
}

async function getAll() {
    try {

        return await axios
            .get(`/all`)
            .then(response => {
                return response;
            })
            .catch(error => {
                if (error.response != undefined) {
                    return error.response.data;
                } else {
                    return error.message;
                }
            });

    } catch (error) {
        console.log('ERR_getBRL=>', error);
        message('Atenção', 'Erro ao buscar moeda BRL');
        return null;
    }
}

async function getMoeda(moeda: string) {
    try {

        return await axios
            .get(`/all/${moeda}-BRL`)
            .then(response => {
                return response;
            })
            .catch(error => {
                if (error.response != undefined) {
                    return error.response.data;
                } else {
                    return error.message;
                }
            });

    } catch (error) {
        console.log('ERR_getBRL=>', error);
        message('Atenção', 'Erro ao buscar moeda BRL');
        return null;
    }
}
