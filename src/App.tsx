import { default as chStateReducer, initialState as chInitialState } from "companyHierarchy";
import { useReducer } from "react";

import "./App.css";
import CompanyHierarchy from "./components/_screens/company_hierarchy/CompanyHierarchy";

export default function App() {
    const [chState, dispatchChState] = useReducer(chStateReducer, chInitialState);
    return <CompanyHierarchy state={chState} dispatch={dispatchChState} />;
}
