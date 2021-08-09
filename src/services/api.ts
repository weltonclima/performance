import axios from "axios";

export const api = axios.create({
  baseURL:'https://ticket.epharma.com.br'
})