import "./App.css";
import { useState } from "react";
import { NavLink } from "react-router-dom";

function Home() {
  const [text, setText] = useState("");

  return (
    <div className="App">
      <header className="App-header">
        <NavLink to="/pokedex">
          <img
            src="https://www.freeiconspng.com/uploads/file-pokeball-png-0.png"
            className="App-logo"
            alt="logo"
            style={{ padding: "10px" }}
            hidden={text !== "Ready!"}
          />
        </NavLink>
        <b>
          Requirement: Try to show the hidden image and make it clickable that
          goes to /pokedex when the input below is "Ready!" remember to hide the
          red text away when "Ready!" is in the textbox.
        </b>
        <p>Are you ready to be a pokemon master?</p>
        <input
          type="text"
          name="name"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <span style={{ color: "red" }} hidden={text === "Ready!"}>
          I am not ready yet!
        </span>
      </header>
    </div>
  );
}

export default Home;
