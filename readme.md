# Custom Form

A **PROOF OF CONCEPT** React form library that allows seamless combination of controlled and uncontrolled inputs in the same form.
It provides a way to construct a form without separate configuration.

## Installation

To get started with the project, follow these steps:

1. Clone the repository ```git clone <repository_url>```
2. Navigate into the project directory: ```cd <project_directory>```
3. Install dependencies: ```npm i```
4. Start the development server: ```npm run dev```
5. Open the project in a browser: [localhost](http://localhost:5173/)

### Node
This project is developed using Node version ``18.14.1`` if you encounter any
problem, please contact me.

## Testing

This project includes both **UNIT TEST** and a simple **E2E TEST**

To run the test:
* Unit test: ``npm run test``
* E2E test: ``npm run test:e2e`` NOTE: run the dev server first.

NOTE: If you encounter a problem in regards to the unit test especially about
``structuredClone`` please check the node version [here](#node)

---

## Features

Below are the features and how to use this library

* [Controlled and Uncontrolled](#inputs)
* [Validation](#validation)
* [Inject](#contributing)
* [No Config](#config)
* [Performance](#performance)

### Inputs

You could simply define either controlled or uncontrolled components inside of your form.
The base components are `Form`, `ControlledInput`, `Input` which are all regular HTML element
under the hood.

NOTE: IT IS IMPORTANT TO ADD THE NAME `name` PROP FOR THE INPUT(CONTROLLED OR UNCONTROLLED)

```JSX
    <Form onSubmit={(formData) => {
        handleSubmit(formData as FormData);
    }}>
        <h2>Example Form</h2>
        <div>
            <label htmlFor="firstName">Controlled First name:</label>
            <ControlledInput name='firstName'/>
        </div>
        <div>
            <label htmlFor="lastName">Last name:</label>
            <Input name='lastName'/>
        </div>
    </Form>
```

The name prop allows the library to register and track the state of the input.

---

### Validation

Valdiation are tied to input and the way to register a list of validators is thru
the `validations` prop of `Input` and `ControlledInput`

NOTE: There are only 2 validations as of now. `minLength` and `isEmail` this could be easily extended.

```JSX
    <div>
        <label htmlFor="Email">Email:</label>
        <ControlledInput
            name='email'
            validations={[
                minLength(2, 'Minimum length is 2'),
                isEmail('Not an email')
            ]}
        />
        <Error for="email" />
    </div>
```

A sample custom validation is provided in the example.

---

### Inject

State injections are way to access the internal state of the form thru `InjectForm` and `InjectFields`

Inject Form state to parts of the form.

```JSX
    <InjectForm>
        {({ isValid }) => (
            <button type="submit" disabled={!isValid}>Submit</button>
        )}
    </InjectForm>
```
Inject Fields state to parts of the form. In the example name is omitted because we don't want to track this data

```JSX
    <InjectFields names={['firstName', 'lastName']}>{
        (fields) => (
            <Input id='injectField' disabled value={`${fields.firstName?.value ?? ""} ${fields.lastName?.value ?? ""}`.trim()} />
        )
    }</InjectFields>
```

---

### Config

This library builds the configuration and state based on the children of your form.

---

### Performance

Rerendering is considered while building this library especially using `ControlledInput` this library uses
`useReducer`, `useContext` and a custom naive implementation of `useSelector` to reduce unnecessary rendering.

---

### TODOs

This is a proof of concept and there are lot of things to consider in regards to form the noteworthy features that are not here are the following:

1. Checkbox group with same name
2. File input
3. Popular validation library extension
4. Progressive enhancement
5. Nested form
6. No linting on this project so you might see inconsistent formatting.

And more!

If you have any questions feel free to contact me.
Sharlon Balbalosa (sbalbalosa@gmail.com)
