import React from 'react';
import {useForm} from 'react-effector-form';
import {useStore} from 'effector-react';
import Code from '../components/code';

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
  const {handleSubmit, controller, $values, $form, $fieldsInline} = useForm();

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


      <div className="row">
        <Code source={$values} title="values" />
        <Code source={$fieldsInline} title="fields state" />
        <Code source={$form} title="form state" />
      </div>
    </div>
  );
}

export default Form;
