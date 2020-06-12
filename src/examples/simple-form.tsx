import React from 'react';
import {useForm} from 'react-effector-form';

const Input = ({
  controller,
  label,
}) => {
  const {input} = controller();

  return (
    <div className="input-wrap">
      <label>{label}</label>
      <input {...input} value={input.value || ''} className="input" />
    </div>
  );
};

const Form = () => {
  const {handleSubmit, controller} = useForm();

  const onSubmit = ({values}) => {
    alert(JSON.stringify(values, null, '  '));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        label="Username"
        controller={controller({name: 'username'})}
      />
      <Input
        label="First name"
        controller={controller({name: 'profile.firstName'})}
      />
      <Input
        label="Last name"
        controller={controller({name: 'profile.lastName'})}
      />
      <button type="submit">submit</button>
    </form>
  );
}

export default Form;
