import React, {createContext, useContext, useState} from "react";

const UserContext = createContext();

export const UserProvider = ({children}) => {
    const [userData, setUserData] = useState(null);

    const newUser = {
        name, 
        id: '1'
    }
}