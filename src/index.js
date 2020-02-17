import React from "react";
import { render } from "react-dom";
import { observable, action, computed } from "mobx";
import { observer } from "mobx-react";
import DevTools from "mobx-react-devtools";

class AppState {
  constructor() {
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  @observable request = "";
  @observable response = "";

  @computed get lengthOfRequest() {
    return this.request.length;
  }

  updateProperty(value) {
    this.request = value;
  }

  handleChange(event) {
    this.updateProperty(event.target.value);
  }

  handleSubmit(event) {
    this.respond(this.request);
    event.preventDefault();
  }

  @action respond = req => {
    if (req === "hello") {
      return (this.response = "How are you?");
    } else return (this.response = "");
  };
}

const ResponseView = observer(({ appState }) => (
  <div>
    <form onSubmit={appState.handleSubmit}>
      <p>
        Request:
        <input
          type="text"
          value={appState.request}
          onChange={appState.handleChange}
        />
      </p>
      <input type="submit" value="Press for Response" />
    </form>
    <p>Response: {appState.response}</p>
    <p>Length: {appState.lengthOfRequest}</p>
  </div>
));

render(
  <div>
    <ResponseView appState={new AppState()} />
    <DevTools />
  </div>,
  document.getElementById("root")
);
