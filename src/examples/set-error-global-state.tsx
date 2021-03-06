import {useForm, deleteIn} from 'react-effector-form';
import {createStore, createEvent} from 'effector';
import React from 'react';

const setOrDeleteErrorGlobalState = createEvent();

const $errorsInline = createStore({});

$errorsInline.on(setOrDeleteErrorGlobalState, (state, {field, error}) =>
  error ? {...state, [field]: error} : deleteIn(state, field, false, false));

const $form = createStore({
  submitted: false,
  hasError: false,
  forceError: false,
});

$form.on(setOrDeleteErrorGlobalState, (state) => {
  return {
    ...state, // hasError and other variables useForm will be set automatically
    forcedError: true, // but we need forcedError to force the error display
    // submitted: true // Or you can set submitted true to display errors if you don't use forcedError
  };
});

const Input = ({
  controller,
  label,
}) => {
  const {input, form, fieldState, error} = controller();
  const showError = form.forcedError || form.submitted || fieldState.blurred; // forcedError to force the error display

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
  const {handleSubmit, controller} = useForm({$errorsInline, $form});

  const onSubmit = ({values, form}) => {
    if (!form.hasError) {
      alert(JSON.stringify(values, null, '  '));
    }
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
      <button
        onClick={() => setOrDeleteErrorGlobalState({field: 'profile.lastName', error: 'Error for lastName'})}
        type="button"
      >
        set error lastName
      </button>
      <button
        onClick={() => setOrDeleteErrorGlobalState({field: 'profile.lastName', error: ''})}
        type="button"
      >
        remove error lastName
      </button>
    </form>
  );
}

export default Form;
