import { useState } from "react"
import { AppContext } from "./AppContext";

const MyContextProvider = ({children}) => {
    const [count,setCount] = useState(0);
    const [user, setUser] = useState({});
    
    const valueObj = {count,setCount,user, setUser};

    return (
        <AppContext.Provider value={valueObj}>
            {children}
        </AppContext.Provider>
    );
}

export {MyContextProvider};