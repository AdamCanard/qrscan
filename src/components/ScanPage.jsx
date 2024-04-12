import { useState, useContext } from "react";
import QrScan from "../components/QrScan";
import Header from "../components/Header";
import Login from "../components/Login";
import { UserContext } from "../App";

export default function ScanPage() {
  const { user, setUser } = useContext(UserContext);
  const [scanSuccess, setScanSuccess] = useState(null);
  const [info, setInfo] = useState(null);

  // if (user === null) {
  //   const output = document.cookie
  //     .split("; ")
  //     .find((row) => row.startsWith("auth="))
  //     ?.split("=")[1];
  //   setUser(output);
  // }
  return (
    // this logic uses a scanSuccess state to determine when to show a red or green screen
    // setScanSuccess is passed into the children, which set scanSuccess based on the response from the API
    // It conditionally renders based on user (bartender or bouncer) and scanSuccess
    // if scanSuccess != true/false or user != bartender/bouncer, then return to Login page
    <>
      {scanSuccess === true ? (
        <div className="w-[100vw] fixed h-[100vh] bg-green-600 flex flex-col justify-center items-center z-10">
          <div className="w-[50%] h-[50%] flex flex-col justify-center items-center">
            <p>{info}</p>
          </div>
        </div>
      ) : scanSuccess === false ? (
        <div className="w-[100vw] fixed h-[100vh] bg-red-600 flex flex-col justify-center items-center z-10">
          <div className="w-[50%] h-[50%] flex flex-col justify-center items-center">
            <p>{info}</p>
          </div>
        </div>
      ) : null}
      <>
        <QrScan 
          user={user} 
          setScanSuccess={setScanSuccess} 
          setInfo={setInfo} 
        />
      </>
    </>
  );
}
