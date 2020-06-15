import {useForm} from 'react-effector-form';
import {createStore, createEvent} from 'effector';
import React from 'react';
import {useStore} from 'effector-react';
import cn from 'classnames';

const user = {
  username: 'gtosss',
  profile: {
    firstName: 'Timofey',
    lastName: 'Goncharov',
  },
};

const setUser = createEvent();
const clearUser = createEvent();

const $values = createStore({});

$values.on(setUser, () => user);
$values.on(clearUser, () => ({}));

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

const Code = ({source, title, className}) => {
  const data = useStore(source)
  const code = JSON.stringify(data, null, 2)
  return (
    <div className={cn('code', className)}>
      <h1 className="code-title">{title}</h1>
      <pre>{code}</pre>
    </div>
  )
}

const Form = () => {
  const {handleSubmit, controller} = useForm({$values});

  const onSubmit = ({values}) => {
    alert(JSON.stringify(values, null, '  '));
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input label="Username" controller={controller({name: 'username'})} />
        <Input label="First name" controller={controller({name: 'profile.firstName'})} />
        <Input label="Last name" controller={controller({name: 'profile.lastName'})} />
        <button type="button" onClick={() => setUser()}>load user</button>
        <button type="button" onClick={() => clearUser()}>clear user</button>
        <button type="submit">submit</button>
      </form>

      <Code className="code-center" source={$values} title="values" />
    </div>
  );
}

export default Form;
