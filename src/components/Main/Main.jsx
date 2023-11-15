import Heading from "./Heading";
import InputBar from "./InputBar";
import Messages from "./Messages";

function Main() {
  return (
    <div className="flex-column h-screen">
      <Heading />

      <Messages />
      <InputBar />
    </div>
  );
}
export default Main;
