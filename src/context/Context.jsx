import React from "react";
import { createContext, useReducer } from "react";
import { collection, orderBy, query } from "firebase/firestore";
import { db } from "../firebase/config";


const ThemeContexttt = createContext();

const initialData = {
  myCategorieQuery: query(
    collection(db, "Products"),
    orderBy("img_id", "desc")
  ),
  arrayItem: "itemData2"
};
const reducer = (firstState, action) => {
  switch (action.type) {
    case "CHANGE_QUERY":
      return { ...firstState, myCategorieQuery: action.newValue };
    case "CHANGE_ARRAY":
      return { ...firstState, arrayItem: action.newValue };
    default:
      return firstState;
  }
};

export function ThemeProviderContext({ children }) {
  const [firstState, dispatch] = useReducer(reducer, initialData);

  const Query = (newName) => {
    dispatch({ type: "CHANGE_QUERY", newValue: newName });
  };
  const changeArray = (newName) => {
    dispatch({ type: "CHANGE_ARRAY", newValue: newName });
  };

  return (
    <ThemeContexttt.Provider value={{ ...firstState, Query,changeArray }}>
      {children}
    </ThemeContexttt.Provider>
  );
}

export default ThemeContexttt;
