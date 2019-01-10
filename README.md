# Parse query string

Small lib for serialising form inputs.

## Install

``` 
$ npm install git+https://git@github.com/richard-cargill/form-serialise.git 
```

## Usage
```html
<form>
  <input type="text" name="key" value="value" />
  <input type="submit" />
</form>
```

```js
const {serialise} = require('form-serialise');
const form = document.querySelector('form');
const str = serialise(form);
// "key=value"
```

The only method currently avaiable is `serialise`. Multiple same name inputs are joined into an array.

### Supported inputs 
- text, email, textarea, select-one, date, password, number
- radio, checkbox and select-multiple only return selected values

## License

[MIT](LICENSE).
