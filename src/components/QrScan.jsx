import { useState, useContext } from "react";
import { Scanner } from "@yudiel/react-qr-scanner";
import { useDebouncedCallback } from "use-debounce";
const apiUrl = "http://localhost:3000/api/tic/";

// takes in setRaffleNum as props in order to update correct raffle info in <Info />
function QrScan(props) {
  const [camEnabled, setCamEnabled] = useState(true);
  // called by setTimeout to show scanner again
  const resetScanner = () => {
    //setCamEnabled(true);
    //props.setScanSuccess(null);z
  };

  const sendScan = useDebouncedCallback(async (decodedText) => {
    //setCamEnabled(false);
    const ticketId = decodedText.split("/")[decodedText.split("/").length - 1];
    console.log(decodedText);
    console.log(ticketId);
    try {
      // decodedText for production
      // apiUrl + ticketId for testing
      let formData = new FormData();
      formData.append("auth", props.user);
      // fetch 'https://raizapalooza.com/api/tic/' + ticketId in Prod
      // apiUrl + ticketID for testing
      let response = await fetch(decodedText, {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: formData,
      });
      const responseData = await response.json();
      console.log(responseData);
      console.log("Scanned a QR code");
      useResponseData(response, responseData);
    } catch (e) {
      console.error(`Ran into an error contacting the API: ${e}`);
      props.setScanSuccess(false);
      props.setInfo("Error with the API" + e);
      //setTimeout(resetScanner, 1000);
    }
  }, 1000);

  // called when QR is scanned by QrScanner object
  // const sendScan = async (decodedText) => {

  // };

  // called after sendScan() returns response data from DB
  // defines what to do with the returned data based on the response status code
  const useResponseData = async (response, data) => {
    console.log(response, data);
    switch (response.status) {
      case 200:
        console.log("Success! (200)");
        props.setInfo(data.data);
        if (data.data == "Ticket has already entered") {
          props.setScanSuccess(false);
        } else {
          props.setScanSuccess(true);
        }
        //setTimeout(resetScanner, 500);
        break;
      case 404:
        console.log("Error! (500)");
        props.setScanSuccess(false);
        props.setInfo(data.data);
        //setTimeout(resetScanner, 500);
        break;
      default:
        console.log("Something went wrong.");
        props.setInfo("Something went wrong");
        props.setScanSuccess(false);
        //setTimeout(resetScanner, 500);
        break;
    }
  };

  return (
    <>
      <Scanner
        styles={null}
        onResult={(text) => sendScan(text)}
        onError={(error) => console.log(error?.message)}
        enabled={camEnabled}
      />
    </>
  );
}

export default QrScan;
