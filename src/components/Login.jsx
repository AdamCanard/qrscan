// takes in setLoggedIn from props to set logged in to true on request succecss
// Login will send request to backend with id and pass
// if request is validated, parent (app.jsx) will return ScanPage once setLoggedIn === true
import { UserContext } from "../App";
import { useContext } from "react";

export default function Login(props) {
  const { setLoggedIn, setUser } = useContext(UserContext);
  const submitLogin = () => {
    const auth = document.getElementById("auth").value;
    document.cookie = "auth=" + auth + "; SameSite=None; Secure";
    setLoggedIn(true);
    setUser(auth);
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center w-[100vw] h-[100vh] border-2">
        <div className="flex w-full h-[10vh] items-center justify-center -mt-[25vh]">
          <h1 className="text-4xl text-white">LOG IN</h1>
        </div>
        <form
          onSubmit={submitLogin}
          className="flex flex-col items-center gap-4 w-[50vw]"
        >
          <input type="text" id="auth" placeholder="Enter your role"></input>
          <input type="submit" className="text-white"></input>
        </form>
      </div>
    </>
  );
}
