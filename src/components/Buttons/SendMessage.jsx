function SendMessage({ className }) {
  return (
    <button
      className={`${className} flex-row px-4 py-2 bg-green-500 text-white rounded-md`}
    >
      Send
    </button>
  );
}
export default SendMessage;
