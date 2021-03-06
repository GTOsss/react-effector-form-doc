import React from 'react';
import {useForm} from 'react-effector-form';
import cn from 'classnames';
import {useStore} from 'effector-react';

const validateRequired = (value) => !value ? 'Field is required' : undefined;

const Input = ({
  controller,
  label,
}) => {
  const {input, error, form, fieldState} = controller();

  return (
    <div className="input-wrap">
      <label>{label}</label>
      <input
        {...input}
        value={input.value || ''}
        className={cn('input', {'input-error': Boolean(error)})}
      />
      {(form.submitted || fieldState.blurred) && error && (
        <div className="input-error-message">
          {error}
        </div>
      )}
    </div>
  );
};

const Form = () => {
  const {handleSubmit, controller, $values, $errorsInline, $form} = useForm();

  const onSubmit = ({values, form}) => {
    if (!form.hasError) {
      alert(JSON.stringify(values, null, '  '));
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="Username"
          controller={controller({
            name: 'username',
            validate: validateRequired,
          })}
        />
        <Input
          label="First name"
          controller={controller({
            name: 'profile.firstName',
            validate: validateRequired,
          })}
        />
        <Input
          label="Last name"
          controller={controller({
            name: 'profile.lastName',
            validate: validateRequired,
          })}
        />
        <button type="submit">submit</button>
      </form>

      <div className="row">
        <Code source={$values} title="values" />
        <Code source={$errorsInline} title="errors" />
        <Code source={$form} title="form state" />
      </div>
    </div>
  );
}

export default Form;
