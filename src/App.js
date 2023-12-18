import { useState } from "react";
import "./App.css";
const App = () => {
  const [text, setText] = useState("");
  const [answer, setAnswer] = useState("");
  const apiCall = async () => {
    try {
      const response = await fetch("http://localhost:3000", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Promt: text,
        }),
      });

      const result = await response.json();
      const newText = result?.result.replace(/[|&;$%@"<>()+,`'*]/g, "");

      setAnswer(newText);
    } catch (error) {
      console.log(error, "This is error");
    }
  };

  return (
    <>
      <div className="page-container">
        <input
          type="text"
          value={text}
          onChange={(e) => {
            setText(e?.target?.value);
          }}
        />

        <button
          onClick={() => {
            apiCall();
          }}
        >
          Get a API call
        </button>
        <p>{answer}</p>
      </div>
    </>
  );
};

export default App;
