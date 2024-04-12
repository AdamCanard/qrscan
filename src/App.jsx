import "./App.css";
import ScanPage from "./components/ScanPage";
import Login from "./components/Login";
import Header from "./components/Header";
import "./index.css";
import { useState, createContext } from "react";

export const UserContext = createContext(null);

const cookieCheck = () => {
  const output = document.cookie
    .split("; ")
    .find((row) => row.startsWith("auth="))
    ?.split("=")[1];
  if (output === undefined) {
    return false;
  } else {
    return true;
  }
};

function App() {
  //check for cookie, if no cookie, login false, else login true
  const [loggedIn, setLoggedIn] = useState(cookieCheck);
  //if login is true, grab cookie data, else set null
  const [user, setUser] = useState(
    document.cookie
      .split("; ")
      .find((row) => row.startsWith("auth="))
      ?.split("=")[1]
  );

  return (
    // logged in ? display scanpage : Login.jsx
    <UserContext.Provider value={{ loggedIn, user, setLoggedIn, setUser }}>
      <div className="bg-stone-800">
        {loggedIn ? (
          <>
            <div className="w-[100vw] h-[100vh] flex flex-col justify-start items-center">
              <Header user={user} />
              <div className="w-full h-full flex justify-center items-center">
                <div className="w-[80vw] h-full flex justify-center items-center contain-content">
                  <ScanPage />
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <Login />
          </>
        )}
      </div>
    </UserContext.Provider>
  );
}

export default App;
