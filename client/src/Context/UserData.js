import { createContext, useState } from "react";

export const userContext = createContext(null)

export default function Data ({children}) {
    const [userDetails, setUserDetails] = useState('')
    return(
        <userContext.Provider value={{userDetails, setUserDetails}}>
            {children}
        </userContext.Provider>
    )
}