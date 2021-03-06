import React from 'react';
import {createStore} from 'effector';
import {Controller, useForm} from 'react-effector-form';
import './styles.scss';

const Input = ({
  controller,
  label,
}) => {
  const {input, error, form, fieldState} = controller();

  return (
    <div className="input-wrap">
      <label>{label}</label>
      <input {...input} value={input.value || ''} />
      {(form.submitted || fieldState.blurred) && error && (
        <div className="input-error">
          {error}
        </div>
      )}
    </div>
  );
};

const Form = () => {
  const {handleSubmit, controller} = useForm();

  const onSubmit = (result) => {
    console.log(result);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input label="Name" controller={controller({name: 'name'})} />
        <Input label="Nested field" controller={controller({name: 'nested.someField'})} />
        <button type="submit">submit</button>
      </form>
    </div>
  );
}

export default Form;
