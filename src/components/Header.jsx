export default function Header(props) {
  let user = props.user;
  return (
    <>
      <div className="header">
        <h1 className="text-4xl text-center text-[#fffdcf] font-bold p-5">{user=='bouncer'?"entry scan":user=='bartender'?"scan to increment raffle tickets":null}</h1>
      </div>
    </>
  );
}