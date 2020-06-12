import {useForm} from 'react-effector-form';
import {createStore} from 'effector';
import React from 'react';

const initialValues = {
  username: 'gtosss',
  profile: {
    firstName: 'Timofey',
    lastName: 'Goncharov',
  }
};

const $values = createStore(initialValues);

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
  const {handleSubmit, controller} = useForm({$values});

  const onSubmit = ({values}) => {
    alert(JSON.stringify(values, null, '  '));
  };

  return (
    <div>
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
    </div>
  );
}

export default Form;
