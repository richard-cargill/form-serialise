import test from 'ava';
import {serialise} from '..';

test('When no form element exists it throws an error', t => {
  const form = document.querySelector('form');

  const error = t.throws(() => {
    serialise(form);
  }, Error);

  t.is(error.message, 'Cannot read property \'elements\' of null');
});

test('If no input elements exists an empty string is returned', t => {
  document.body.innerHTML = `
    <form id="test-form" class="boilerform" action="" method="post">
      <fieldset class="c-form">
        <legend class="c-form__heading">Contact form</legend>
        <div class="c-form__row">
          <button class="c-button" type="submit">Submit</button>
        </div>
      </fieldset>
    </form>`;

  const form = document.querySelector('form');
  const str = serialise(form);

  t.is(str, '');
});

test('Input type text and textarea', t => {
  document.body.innerHTML = `
    <form id="test-form" class="boilerform" action="" method="post">
      <fieldset class="c-form">
        <legend class="c-form__heading">Contact form</legend>
        <div class="c-form__row">
          <label for="name" class="c-label">Name</label>
          <input type="text" name="name" id="name" class="c-input-field" value="Test Name" autocorrect="off" required />
        </div>
        <div class="c-form__row">
          <label for="email" class="c-label">Email</label>
          <input type="email" name="email" id="email" autocapitalize="none" autocorrect="off" class="c-input-field" required value="email@email.com" />
        </div>
        <div class="c-form__row"> <label for="message" class="c-label">Your message</label>
          <textarea name="message" id="message" class="c-input-field c-input-field--multiline" rows="10">Im some text</textarea>
        </div>
        <div class="c-form__row">
          <button class="c-button" type="submit">Submit</button>
        </div>
      </fieldset>
    </form>`;

  const form = document.querySelector('form');
  const str = serialise(form);

  t.is(str, 'name=Test Name&email=email@email.com&message=Im some text');
});

test('Radio inputs', t => {
  document.body.innerHTML = `
    <form action="#" method="post">
		<div>
			 <h4>Radio Button Choice</h4>

			 <label for="radio-choice-1">Choice 1</label>
			 <input type="radio" name="radio-choice" id="radio-choice-1" tabindex="2" value="choice-1" checked="checked" />

		 <label for="radio-choice-2">Choice 2</label>
			 <input type="radio" name="radio-choice" id="radio-choice-2" tabindex="3" value="choice-2" />
		</div>

	  <div>
		  <input type="submit" value="Submit" />
		</div>
	</form>`;

  const form = document.querySelector('form');
  const str = serialise(form);

  t.is(str, 'radio-choice=choice-1');
});

test('Checkboxes with multiple choices', t => {
  document.body.innerHTML = `
    <form action="#" method="post">
		<div>
			 <h4>Checkbox Choice</h4>

			<div>
			  <label for="checkbox">Checkbox:</label>
				<input type="checkbox" name="checkbox" id="checkbox1"  checked="checked" value="checkbox 1" />
				<input type="checkbox" name="checkbox" id="checkbox2" checked="checked" value="checkbox 2" />
				<input type="checkbox" name="checkbox" id="checkbox3" checked="checked" value="checkbox 3" />
			</div>

		</div>

	  <div>
		  <input type="submit" value="Submit" />
		</div>
	</form>`;

  const form = document.querySelector('form');
  const str = serialise(form);

  t.is(str, 'checkbox=checkbox 1&checkbox=checkbox 2&checkbox=checkbox 3');
});

test('Select one input', t => {
  document.body.innerHTML = `
    <form action="#" method="post">
		<div>
			 <h4>Checkbox Choice</h4>

		  <div>
			<label for="select-choice">Select Dropdown Choice:</label>
			<select name="select-choice" id="select-choice">
			  <option value="Choice 1">Choice 1</option>
			  <option value="Choice 2">Choice 2</option>
			  <option selected="selected" value="Choice 3">Choice 3</option>
			</select>
		  </div>

		</div>

	  <div>
		  <input type="submit" value="Submit" />
		</div>
	</form>`;

  const form = document.querySelector('form');
  const str = serialise(form);

  t.is(str, 'select-choice=Choice 3');
});

test('Select multiple input', t => {
  document.body.innerHTML = `
    <form action="#" method="post">
		<div>
			 <h4>Checkbox Choice</h4>

		  <div>
			<label for="select-choice">Select Dropdown Choice:</label>
			<select name="select-choice" multiple size="6">
				<option value="American" selected="selected">American flamingo</option>
				<option value="Andean">Andean flamingo</option>
				<option value="Chilean">Chilean flamingo</option>
				<option value="Greater" selected="selected">Greater flamingo</option>
				<option value="James's">James's flamingo</option>
				<option value="Lesser">Lesser flamingo</option>
			</select>

		  </div>

		</div>

	  <div>
		  <input type="submit" value="Submit" />
		</div>
	</form>`;

  const form = document.querySelector('form');
  const str = serialise(form);

  t.is(str, 'select-choice=American&select-choice=Greater');
});

test('Date input', t => {
  document.body.innerHTML = `
    <form action="#" method="post">
		<div>
			 <h4>Checkbox Choice</h4>

		  <div>
			<input name="date" id="date" type="date" value="2017-06-01">
		  </div>

		</div>

	  <div>
		  <input type="submit" value="Submit" />
		</div>
	</form>`;

  const form = document.querySelector('form');
  const str = serialise(form);

  t.is(str, 'date=2017-06-01');
});

test('Payment form', t => {
  document.body.innerHTML = `<form>
 <h1>Payment form</h1>
 <p>Required fields are followed by <strong><abbr title="required">*</abbr></strong>.</p>
 <section>
 <h2>Contact information</h2>
 <fieldset>
 <legend>Title</legend>
 <ul>
 <li>
 <label for="title_1">
 <input type="radio" id="title_1" name="title" checked="checked" value="M." >
 Mister
 </label>
 </li>
 <li>
 <label for="title_2">
 <input type="radio" id="title_2" name="title" value="Ms.">
 Miss
 </label>
 </li>
 </ul>
 </fieldset>
 <p>
 <label for="name">
 <span>Name: </span>
 <strong><abbr title="required">*</abbr></strong>
 </label>
 <input type="text" id="name" name="username" value="My name">
 </p>
 <p>
 <label for="mail">
 <span>E-mail: </span>
 <strong><abbr title="required">*</abbr></strong>
 </label>
 <input type="email" id="mail" name="usermail" value="my.email@email.com">
 </p>
<p>
 <label for="password">
 <span>Password: </span>
 <strong><abbr title="required">*</abbr></strong>
 </label>
 <input type="password" id="pwd" name="password" value="password!">
 </p>
 </section>
 <section>
 <h2>Payment information</h2>
 <p>
 <label for="card">
 <span>Card type:</span>
 </label>
 <select id="card" name="usercard">
 <option value="visa">Visa</option>
 <option value="mc" selected="selected">Mastercard</option>
 <option value="amex">American Express</option>
 </select>
 </p>
 <p>
 <label for="number">
 <span>Card number:</span>
 <strong><abbr title="required">*</abbr></strong>
 </label>
 <input type="number" id="number" name="cardnumber" value="69">
 </p>
 <p>
 <label for="date">
 <span>Expiration date:</span>
 <strong><abbr title="required">*</abbr></strong>
 <em>formatted as mm/yy</em>
 </label>
 <input type="date" id="date" name="expiration" value="2035-06-01">
 </p>
 </section>
 <section>
 <p> <button type="submit">Validate the payment</button> </p>
 </section>
 </form>
  `;

  const form = document.querySelector('form');
  const str = serialise(form);

  t.is(str, 'title=M.&username=My name&usermail=my.email@email.com&password=password!&usercard=mc&cardnumber=69&expiration=2035-06-01');
});
