var Components = {
  loginModal: `
  <div class="login">
    <div class="container">
      <div class="container sign-component" id="container">
        <div class="form-container sign-up-container">
          <form id="sign_up_form">
            <h1>Create Account</h1>
            <div class="social-container">
              <a href="#" class="social"><i class="fab fa-facebook-f"></i></a>
              <a href="#" class="social"><i class="fab fa-google-plus-g"></i></a>
              <a href="#" class="social"><i class="fab fa-linkedin-in"></i></a>
            </div>
            <span>or use your email for registration</span>
            <div class="inputs">
              <div class="form-control full">
                <input
                  type="text"
                  id="fullname"
                  name="name"
                  required=""
                  class="field"
                  autocomplete="name"
                />
                <label for="fullname"> Full Name </label>
              </div>
              <div class="form-control full">
                <input
                  type="email"
                  id="sign_up_email"
                  name="email"
                  required=""
                  class="field"
                  autocomplete="email"
                />
                <label for="sign_up_email"> Email </label>
              </div>
              <div class="form-control full">
                <input
                  type="password"
                  id="sign_up_password"
                  name="password"
                  required=""
                  class="field"
                />
                <label for="sign_up_password"> Password </label>
              </div>
            </div>
            <input type="submit" value="Sign Up" id="sign_up" />
            <div class="app-register have-account">
              Do have an account?
              <span class="end sign-component">Sign In</span>
            </div>
          </form>
        </div>
        <div class="form-container sign-in-container">
          <form id="sign_in_form">
            <h1>Sign in</h1>
            <div class="social-container">
              <a href="#" class="social"><i class="fab fa-facebook-f"></i></a>
              <a href="#" class="social"><i class="fab fa-google-plus-g"></i></a>
              <a href="#" class="social"><i class="fab fa-linkedin-in"></i></a>
            </div>
            <span>or use your account</span>
            <div class="inputs">
              <div class="form-control full">
                <input
                  type="email"
                  id="sign_email"
                  name="email"
                  required=""
                  class="field"
                  autocomplete="eEmail"
                />
                <label for="sign_email"> Email </label>
              </div>
              <div class="form-control full">
                <input
                  type="password"
                  id="signin_password"
                  name="password"
                  required=""
                  class="field"
                />
                <label for="signin_password"> Password </label>
              </div>
            </div>
            <a href="#">Forgot your password?</a>
            <input type="submit" value="Sign In" name="sign_in" id="sign_in" />
            <div class="app-register have-account">
              Don't have an account?
              <span class="end sign-component">Sign Up</span>
            </div>
          </form>
        </div>
        <div class="overlay-container">
          <div class="overlay">
            <div class="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p>
                To keep connected with us please login with your personal info
              </p>
              <button class="ghost sign-component" id="signIn">Sign In</button>
            </div>
            <div class="overlay-panel overlay-right">
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start journey with us</p>
              <button class="ghost sign-component" id="signUp">Sign Up</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  `,
  initialModalEditAdd: (category) => {
    return `<div class="master-container">
      <div class="card cart">
        <div class="top-title">
          <span class="title">Add ${category}</span>
          <i class="fa-solid fa-xmark x"></i>
        </div>
        <div class="form">
        <form id="${category}-form" name="${category}-form">
            <div class="inputs">
              <input
                type="hidden"
                id="category"
                name="category"
                value="${category}"
              />
              <input
                type="hidden"
                id="item_id"
                name="item_id"
              />`;
  },
  inputField: (id, required, type, classes, name) => {
    name = name ?? id;
    classes = classes ?? "field";
    type = type ?? "text";
    return `
    <div class="form-control">
      <input
        type="${type}"
        id="${id}"
        name="${name}"
        class="${classes}"
        ${required ? "required" : ""}
        autocomplete="${name}"
        />
      <label for="${name}">
      ${Utils.capitalizeWords(name.replace(/_/g, " "))}
      </label>
    </div>
    `;
  },
  textareaField: (id, required, label, name) => {
    name = name ?? id;
    label = label ?? name;
    return `
    <div class="form-control">
      <div class="textarea">
        <textarea
          id="${id}"
          name="${name}"
          class="field"
          ${required ? "required" : ""}
        ></textarea>
        </div>
        <label for="${name}" class="txtar-la">
          ${Utils.capitalizeWords(label.replace(/_/g, " "))}
        </label>
    </div>
    `;
  },
  endInputFields: (withTime) => {
    return withTime
      ? `
        <div class="form-control full">
          <label for="added_time" class="d-none">
            Added Time
          </label>
          <input type="datetime-local" id="added_time" name="added_time" />
        </div>
      </div>
        `
      : "</div>";
  },
  endModalEditAdd: () => {
    return `
              <input type="submit" class="submit" value="Submit" />
            </form>
          </div>
        </div>
      </div>
    `;
  },
  itemModal: (category) => {
    let content = Components.initialModalEditAdd(category);
    let inputs = [
      { id: "name", required: true },
      { id: "title", required: true },
      { id: "stock_quantity", required: true, type: "number" },
      { id: "status", required: true },
    ];
    if (category !== "package") {
      inputs.push({ id: "min_days", required: true, type: "number" });
      inputs.push({ id: "max_days", required: true, type: "number" });
      inputs.push({ id: "day_price", required: true, type: "number" });

      if (category === "car") {
        inputs.push({ id: "persons", required: true, type: "number" });
      }
    }

    if (category !== "car") {
      inputs.push({ id: "min_persons", required: true, type: "number" });
      inputs.push({ id: "max_persons", required: true, type: "number" });
      inputs.push({ id: "person_price", required: true, type: "number" });

      if (category === "package") {
        inputs.push({ id: "days", required: true, type: "number" });
      }
    }

    inputs.forEach((input) => {
      content += Components.inputField(input.id, input.required, input.type);
    });

    content += Components.endInputFields(1);
    content += '<div class="textareas">';
    let textareas = [
      { id: "description", required: true },
      { id: "imgs_srcs", required: true, label: "Image Source" },
    ];

    textareas.forEach((textarea) => {
      content += Components.textareaField(
        textarea.id,
        textarea.required,
        textarea.label
      );
    });
    content += "</div>";
    content += Components.endModalEditAdd();
    return content;
  },
};
