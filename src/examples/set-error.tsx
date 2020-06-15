import {useForm} from 'react-effector-form';
import React from 'react';
import {useStore} from 'effector-react';

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

const Code = ({source, title}) => {
  const data = useStore(source)
  const code = JSON.stringify(data, null, 2)
  return (
    <div className="code">
      <h1 className="code-title">{title}</h1>
      <pre>{code}</pre>
    </div>
  )
}

const Form = () => {
  const {handleSubmit, controller, setOrDeleteError, $form, $errorsInline} = useForm();

  const onSubmit = ({values, form}) => {
    if (!form.hasError) {
      alert(JSON.stringify(values, null, '  '));
    }
  };

  return (
    <div>
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

      <div className="row">
        <Code source={$errorsInline} title="errors" />
        <Code source={$form} title="form state" />
      </div>
    </div>
  );
}

export default Form;
