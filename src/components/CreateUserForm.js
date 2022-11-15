import React from "react";

function CreateUserForm() {
  return (
    <form className="FormElement">
      <label htmlFor="userName">User Name</label>
      <input type="text" name="userName" />

      <button type="submit">Submit</button>
    </form>
  );
}

export default CreateUserForm;
