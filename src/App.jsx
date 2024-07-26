import { useCallback, useState, useEffect, useRef } from "react";
// import "./App.css";

function App() {
  const [length, setlength] = useState(8);
  const [numAllow, setNumAllow] = useState(false);
  const [symAllow, setSymAllow] = useState(false);
  const [password, setPassword] = useState("");

  let passwordRef = useRef(null);

  const copyToClipboard = useCallback(() => {
    passwordRef.current?.select();
    // passwordRef.current.setSelectionRange(0, 3); // for range selection
    // window.navigator.clipboard.writeText(password.substring(0,4)); //for range selection
    passwordRef.current.setSelectionRange(0, length);
    window.navigator.clipboard.writeText(password);

  }, [password])

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numAllow) str += "1234567890";
    if (symAllow) str += "#@$%^&*(){}[]<>.,:;'!~`|";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numAllow, symAllow, setPassword]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numAllow, symAllow, passwordGenerator]);

  return (
    <>
    <div className="App px-5 md:px-0">
      <div className="text-white border  rounded-[12px] container mx-auto  mt-[10vh]  max-w-md md:max-w-xl text-center text-3xl py-4 bg-gray-600">
        Password Generator
        <div className="flex flex-col md:flex md:flex-row gap-6 px-9  mt-2">
          <input
            type="text"
            value={password}
            placeholder="password"
            readOnly
            ref={passwordRef}
            className="text-lg  text-[16px] px-2 w-full rounded text-black
      "
          />
          <button
            className="border rounded bg-green-800 text-base p-1"
            onClick={copyToClipboard}
          >
            Copy
          </button>
        </div>
        <div className="flex  mt-2  text-base gap-2 px-9">
          <input
            type="range"
            min={6}
            max={20}
            value={length}
            onChange={(e) => {
              setlength(e.target.value);
            }}
            className="cursor-pointer"
          />
          <label>length: {length}</label>
          </div>
          <div className="flex  mt-2  text-base gap-2 px-9">
          <input
            type="checkbox"
            defaultChecked={numAllow}
            onChange={() => {
              setNumAllow((prev) => !prev);
            }}
          />
          <label htmlFor="numberAllow">Number</label>
          </div>
          <div className="flex  mt-2  text-base gap-2 px-9">
          <input
            type="checkbox"
            defaultChecked={symAllow}
            onChange={() => {
              setSymAllow((prev) => !prev);
            }}
          />
          <label htmlFor="symbolAllow">Symbols</label>
        </div>
      </div>
      </div>
    </>
  );
}

export default App;
