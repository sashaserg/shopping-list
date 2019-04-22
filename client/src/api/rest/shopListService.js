import { restURL } from '../baseURL'
import axios from 'axios'


export const getShopListById = (id) => axios.get(restURL + '/shoplist/' + id);
export const createShopList = (details) => axios.post(restURL + '/shoplist', details);
export const getShopListBySessionId = (sessionId) => axios.get(restURL + '/shoplist/session/' + sessionId);
export const updateShopListById = (id, details) => axios.put(restURL + '/shoplist/' + id, details);
export const updateShopListBySessionId = (sessionId, details) => axios.put(restURL + '/shoplist/session/' + sessionId, details);


