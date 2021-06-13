import React, { BaseSyntheticEvent, useState } from "react";

const Content = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    user_type: "",
    password: "",
  });

  interface boolean_interface {
    [key: string]: Boolean;
  }
  const [hasBeenTouched, setHasBeenTouched] = useState<boolean_interface>({
    name: false,
    email: false,
    user_type: false,
    password: false,
  });
  const [error, setError] = useState<boolean_interface>({
    name: false,
    email: false,
    user_type: false,
    password: false,
  });
  const [reveal_password, setReveal_password] = useState<boolean>(false);

  const [step, setStep] = useState<number>(1);

  const { name, email, user_type, password } = user;
  const onChange = (e: BaseSyntheticEvent) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    setHasBeenTouched({ ...hasBeenTouched, [e.target.name]: true });
    setError({ ...error, [e.target.name]: !e.target.checkValidity() });
  };

  const onSubmit = (e: BaseSyntheticEvent) => {
    e.preventDefault();
    setStep(step + 1);
    console.log("Next Clicked. Account details: ", user);
  };

  // errors handling
  const nameError = () => {
    if (hasBeenTouched.name) {
      return name === "";
    } else return false;
  };
  const emailError = () => {
    if (hasBeenTouched.email) {
      if (error.email) return true;
      else return email === "";
    } else return false;
  };
  const user_typeError = () => {
    if (hasBeenTouched.user_type) {
      if (error.user_type) return true;
      else return user_type === "";
    } else if (hasBeenTouched.password && user_type === "") return true;
    else return false;
  };
  const passwordError = () => {
    if (hasBeenTouched.password) {
      if (error.password) return true;
      else return password === "";
    } else return false;
  };

  const toggle_PasswordReveal = () => {
    setReveal_password(!reveal_password);
  };

  const allValid = () => {
    if (
      user.name === "" ||
      user.email === "" ||
      user.user_type === "" ||
      user.password === ""
    )
      return false;
    else if (nameError() || emailError() || user_typeError() || passwordError())
      return false;
    else return true;
  };

  const renderContent = () => {
    const registrationContent = () => (
      <div className='form-container'>
        <h1 className='title'>Let's set up your account</h1>
        <h2 className='sign-in'>
          Already have an account? <a href='#'>Sign in</a>
        </h2>
        <form onSubmit={onSubmit}>
          <div className={`input-item ${nameError() ? "error" : ""}`}>
            <label htmlFor='name' hidden={name === "" ? true : false}>
              Your name
            </label>
            {nameError() && <i className='fas fa-eye'></i>}
            <input
              type='text'
              name='name'
              value={name}
              placeholder='Your Name'
              onChange={onChange}
              required
            />
            <div className='note'>{nameError() && "Please enter a name"}</div>
          </div>
          <div className={`input-item ${emailError() ? "error" : ""}`}>
            <label htmlFor='email' hidden={email === "" ? true : false}>
              Email address
            </label>
            {emailError() && <i className='fas fa-eye'></i>}
            <input
              type='email'
              name='email'
              value={email}
              placeholder='Email address'
              onChange={onChange}
              required
            />
            <div className='note'>
              {emailError() && "Please enter a valid email address"}
            </div>
          </div>
          <div className={`input-item ${user_typeError() ? "error" : ""}`}>
            <i className='fas fa-chevron-down'></i>
            <select name='user_type' required onChange={onChange}>
              <option value='' hidden>
                I would describe my user type as
              </option>
              <option value='Designer'>Design</option>
              <option value='Manager'>Manager</option>
              <option value='Sales'>Sales</option>
            </select>
            <div className='note'>
              {user_typeError() && "Please select an user type"}
            </div>
          </div>

          <div className={`input-item ${passwordError() ? "error" : ""}`}>
            <label htmlFor='password' hidden={password === "" ? true : false}>
              Password
            </label>
            <i
              className={`fas ${
                reveal_password ? "fa-eye-slash" : "fa-eye"
              } password-eye`}
              onClick={toggle_PasswordReveal}
            ></i>
            <input
              type={reveal_password ? "text" : "password"}
              name='password'
              value={password}
              placeholder='Password'
              onChange={onChange}
              minLength={8}
              required
            />
            <div className='note'>
              {passwordError()
                ? "Please enter a valid password"
                : "Minimum 8 characters"}
            </div>
          </div>
          <input
            type='submit'
            value='Next'
            className='btn btn-next'
            disabled={!allValid()}
          />
        </form>
        <div className='form-footer'>
          By clicking the "Next" button, you agree to create a free account, and
          to <a href='#'>Terms of Service</a> and{" "}
          <a
            href='https://incsub.com/privacy-policy/'
            target='_blank'
            rel='noopener noreferrer'
          >
            Privacy Policy
          </a>
          .
        </div>
      </div>
    );
    const page2Content = () => (
      <div className='page-2'>
        <h1>Page 2</h1>
        <div className='name'>Name: {name}</div>
        <div className='email'>Email: {email}</div>
        <div className='user_type'>User Type: {user_type}</div>
        <div className='password'>Password: {password}</div>
        <div className='btn btn-back' onClick={() => setStep(step - 1)}>
          Back
        </div>
        <div className='btn btn-next' onClick={() => setStep(step + 1)}>
          Next
        </div>
      </div>
    );
    const page3Content = () => (
      <div className='page-3'>
        <h1>Page 3</h1>
        <div className='btn btn-back' onClick={() => setStep(step - 1)}>
          Back
        </div>
      </div>
    );

    switch (step) {
      case 1:
        return registrationContent();
      case 2:
        return page2Content();
      case 3:
        return page3Content();
      default:
        return registrationContent();
    }
  };

  return (
    <section className='content-container'>
      <div className='steps'>
        <div className='label'>Step {step} of 3</div>
        <div className={`dot ${step >= 1 ? "black" : ""}`}></div>
        <div className={`dot ${step >= 2 ? "black" : ""}`}></div>
        <div className={`dot ${step >= 3 ? "black" : ""}`}></div>
        <div className='end'></div>
      </div>
      {renderContent()}
    </section>
  );
};

export default Content;
