import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useReducer
} from "react";
import { getUsers } from "../api/userApi.js";

const UserContext = createContext(null);
const STORAGE_KEY = "created_users";

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

function readCreatedUsers() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

function saveCreatedUsers(users) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
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

  const addUser = useCallback((formData) => {
    const newUser = {
      id: Date.now(),
      name: formData.name.trim(),
      username: formData.name.trim().replace(/\s+/g, "").toLowerCase(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      website: formData.website.trim() || "not-added.com",
      company: {
        name: formData.company.trim(),
        catchPhrase: "Created from the dashboard",
        bs: "client side user"
      },
      address: {
        street: formData.street.trim() || "Not provided",
        suite: formData.suite.trim() || "Not provided",
        city: formData.city.trim() || "Not provided",
        zipcode: formData.zipcode.trim() || "Not provided",
        geo: {
          lat: formData.latitude.trim() || "0.0000",
          lng: formData.longitude.trim() || "0.0000"
        }
      }
    };

    const createdUsers = [newUser, ...readCreatedUsers()];
    saveCreatedUsers(createdUsers);
    dispatch({ type: "ADD_USER", payload: newUser });
  }, []);

  const setSearchTerm = useCallback((value) => {
    dispatch({ type: "SET_SEARCH_TERM", payload: value });
  }, []);

  const filteredUsers = useMemo(() => {
    const query = state.searchTerm.trim().toLowerCase();

    if (!query) {
      return state.users;
    }

    return state.users.filter((user) =>
      user.name.toLowerCase().includes(query)
    );
  }, [state.users, state.searchTerm]);

  const value = useMemo(
    () => ({
      ...state,
      filteredUsers,
      addUser,
      setSearchTerm
    }),
    [state, filteredUsers, addUser, setSearchTerm]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export default UserContext;
