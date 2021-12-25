import { useReducer, createContext } from "react";
import { AppReducer } from "./reducers/AppReducer";

const lightsData = [
    { id: "light1", on: false },
    { id: "light2", on: false },
    { id: "light3", on: false },
    { id: "light4", on: false },
    { id: "light5", on: false },
];

const initialState = {
    lights: lightsData,
    currIndex: 4,
    lapse: 0, 
    running: false,
    lighting: false,
}
export const AppContext = createContext(initialState);

const AppState = ({children}) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    const start = () => {
        dispatch({
            type:"START",
            payload: true
        })
    }
    const offLights = () => {
        dispatch({
            type:"LIGHTS_OFF",
            payload: {
                lights:lightsData,
                running:true,
                lighting:false
            }
        })
    }
    const stop = () => {
        dispatch({
            type:"STOP",
            payload: false
        })
    }
    return <AppContext.Provider value={{
        lapse: state.lapse, 
        running: state.running,
        lighting: state.lighting,
        start,
        stop,
        offLights,
    }}>
        {children}
    </AppContext.Provider>
}

export default AppState
