## Installation
You can install it with npm:
```bash
npm i aidbox-forms
```

## Usage
```javascript
import { Builder } from 'aidbox-forms';

<Builder
  value={q}
  onReady={q => {
    console.log('Builder ready');
  }}
  onChange={q => {
    console.log('Questionnaire updated:', q);
  }}
  onSelect={item => {
    console.log('Questionnaire Item selected:', item);
  }}
/>
```
