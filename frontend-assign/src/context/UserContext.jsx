import { createContext, useEffect, useReducer } from "react";
import { getUsers } from "../api/userApi";

 const UserContext = createContext(null);
 
 const initialState = {
  users: [],
  loading: false,
  error: "",
  searchTerm: ""
};

function userReducer(state, action) {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload, loading: false };
    case "SET_USERS":
      return { ...state, users: action.payload, loading: false, error: "" };
    case "ADD_USER":
      return { ...state, users: [action.payload, ...state.users] };
    case "SET_SEARCH_TERM":
      return { ...state, searchTerm: action.payload };
    default:
      return state;
  }
}

export function UserProvider({ children }) {
  const [state, dispatch] = useReducer(userReducer, initialState);

    useEffect(() => {
    async function loadUsers() {
      dispatch({ type: "SET_LOADING", payload: true });

      try {
        const apiUsers = await getUsers();
        const createdUsers = readCreatedUsers();
        dispatch({ type: "SET_USERS", payload: [...createdUsers, ...apiUsers] });
      } catch {
        dispatch({
          type: "SET_ERROR",
          payload: "Unable to load users. Please try again."
        });
      }
    }

    loadUsers();
  }, []);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContext;
