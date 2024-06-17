import "./App.css";
import { Builder } from "../";
import React from "react";

function App() {
  const [value, setValue] = React.useState({
      "title": "Demo form",
      "status": "draft",
      "url": "http://forms.aidbox.io/questionnaire/",
      "resourceType": "Questionnaire",
      "item": [
          {
              "type": "string",
              "linkId": "H4OzNWRe",
              "text": "First Name"
          },
          {
              "type": "string",
              "text": "Last Name",
              "linkId": "k0cRMStQ"
          }
      ]
  } as unknown);

  const [item, setItem] = React.useState(undefined as unknown);

  return (
    <>
      <div className="debugger">
        <div>Questionnaire (editable)</div>
        <textarea
          className="q"
          value={JSON.stringify(value, null, 2)}
          onChange={(e) => {
            try {
              setValue(JSON.parse(e.target.value));
            } catch (e) {
              console.error(e);
            }
          }}
        ></textarea>
        <div>Selected Item</div>
        <textarea
          className="item"
          readOnly
          value={JSON.stringify(item, null, 2)}
        ></textarea>
      </div>
      <Builder
        baseUrl={import.meta.env.DEV ? "http://localhost:8765" : undefined}
        onChange={setValue}
        onSelect={setItem}
        value={value}
      />
    </>
  );
}

export default App;
