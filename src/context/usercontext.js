import { createContext } from "react"

const UserContext = createContext(null);
const apiUrl = 'https://sri-uploader.herokuapp.com';

export { UserContext, apiUrl };