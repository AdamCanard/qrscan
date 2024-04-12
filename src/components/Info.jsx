export default function Info(props) {
  let info;

  if (props.alreadyEntered === true) {
    info = 
    <>
      <h2>Ticket has already entered the event</h2>
    </>
  } else if (props.raffleNum) {
    info = 
    <>
      <h2>Number of raffle tickets:</h2>
      <p>{props.raffleNum}</p>
    </>
  }

  return (
    <>
    <div id="info">
      {info}
    </div>
    </>
  );
}