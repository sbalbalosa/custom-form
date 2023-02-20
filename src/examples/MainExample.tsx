import {
  Form,
  Input,
  ControlledInput,
  Error,
  InjectForm,
  InjectFields,
  isEmail,
  minLength,
} from "../components/form";

import ExampleContainer from "./ExampleContainer";

const customValidation = (error: string) => (value: string) => {
  if (value.startsWith("custom.name")) return null;
  return error;
};

export default function MainExample() {
  return (
    <ExampleContainer>
      {(handleSubmit) => (
        <Form
          onSubmit={(formData) => {
            handleSubmit(formData as FormData);
          }}
        >
          <h2>Example Form</h2>
          <div>
            <label htmlFor="firstName">Controlled First name:</label>
            <ControlledInput
              name="firstName"
              validations={[
                minLength(2, "Minimum length is 2"),
                customValidation("name should start with custom.name"),
              ]}
            />
            <Error for="firstName" />
          </div>
          <div>
            <label htmlFor="lastName">Controlled Last name:</label>
            <ControlledInput
              name="lastName"
              validations={[minLength(2, "Minimum length is 2")]}
            />
            <Error for="lastName" />
          </div>
          <div>
            Full Name: (Not part of the form)
            <InjectFields names={["firstName", "lastName"]}>
              {(fields) => (
                <Input
                  id="injectField"
                  disabled
                  value={`${fields.firstName?.value ?? ""} ${
                    fields.lastName?.value ?? ""
                  }`.trim()}
                />
              )}
            </InjectFields>
          </div>
          <div>
            <label htmlFor="address">Address:</label>
            <Input
              name="address"
              validations={[minLength(2, "Minimum length is 2")]}
            />
            <Error for="address" />
          </div>
          <div>
            <label htmlFor="email">Controlled Email:</label>
            <ControlledInput
              name="email"
              validations={[
                minLength(2, "Minimum length is 2"),
                isEmail("Not an email"),
              ]}
            />
            <Error for="email" />
          </div>
          <hr />
          <div style={{ marginTop: "1rem" }}>
            <InjectForm>
              {({ isValid }) => (
                <button type="submit" disabled={!isValid}>
                  Submit
                </button>
              )}
            </InjectForm>
          </div>
        </Form>
      )}
    </ExampleContainer>
  );
}
