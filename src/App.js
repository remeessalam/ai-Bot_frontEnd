import { useState, useEffect } from "react";
import "./App.css";
const App = () => {
  const [text, setText] = useState("");
  const [answer, setAnswer] = useState("");
  const [loader, setLoader] = useState(false);
  const apiCall = async () => {
    try {
      setLoader(true);
      const response = await fetch("http://localhost:3000", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Promt: text,
        }),
      });
      setText("");
      const result = await response.json();
      const newText = result?.result.replace(/[|&;$%@"<>()+,`'*]/g, "");

      setAnswer(newText);
      setLoader(false);
    } catch (error) {
      console.log(error, "This is error");
    }
  };
  useEffect(() => {
    const handleKey = (event) => {
      if (event.key === "Enter" && text.length > 0) {
        event.preventDefault();
        document.querySelector(".button").click();
      }
    };
    let EnterInput = document.querySelector(".inputBox");
    EnterInput.addEventListener("keypress", handleKey);
    return () => {
      EnterInput.removeEventListener("keypress", handleKey);
    };
  }, []);
  return (
    <>
      <div className="page-container">
        <div className="result-container">
          {loader ? (
            <div className="loader">
              {/* {" "}
              <div className="inner-circle"></div> */}
            </div>
          ) : (
            <p>{answer}</p>
          )}
        </div>
        <div className="input-box">
          <input
            className="inputBox"
            type="text"
            placeholder="Ask questions..."
            value={text}
            onChange={(e) => {
              setText(e?.target?.value);
            }}
          />

          <button
            className="button"
            onClick={() => {
              text.length > 0 && apiCall();
            }}
          >
            Search
          </button>
        </div>
      </div>
    </>
  );
};

export default App;
