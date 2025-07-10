import { createContext, useContext } from "react";

const AppContext = createContext();

const useMyContext = () => {
    return useContext(AppContext);
};

export {AppContext,useMyContext};