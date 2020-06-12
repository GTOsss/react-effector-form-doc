import {useForm} from 'react-effector-form';
import React from 'react';

const Input = ({
  controller,
  label,
}) => {
  const {input, form, fieldState, error} = controller();
  const showError = form.submitted || form.forcedError || fieldState.blurred;

  return (
    <div className="input-wrap">
      <label>{label}</label>
      <input {...input} value={input.value || ''} className="input" />
      {(showError) && error && (
        <div className="input-error-message">
          {error}
        </div>
      )}
    </div>
  );
};

const Form = () => {
  const {handleSubmit, controller, setOrDeleteError} = useForm();

  const onSubmit = ({values, form}) => {
    if (!form.hasError) {
      alert(JSON.stringify(values, null, '  '));
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input label="Username" controller={controller({name: 'username'})} />
      <Input label="First name" controller={controller({name: 'profile.firstName'})}/>
      <Input label="Last name" controller={controller({name: 'profile.lastName'})} />
      <button type="submit">submit</button>
      <button onClick={() => setOrDeleteError({field: 'profile.firstName', error: 'Error'})} type="button">
        set error lastName
      </button>
      <button onClick={() => setOrDeleteError({field: 'profile.firstName', error: ''})} type="button">
        remove error lastName
      </button>
    </form>
  );
}

export default Form;
