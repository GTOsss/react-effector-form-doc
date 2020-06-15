import {useForm} from 'react-effector-form';
import {createStore, createEffect, sample, createEvent, combine} from 'effector';
import {useStore} from 'effector-react';
import React from 'react';
import isEqual from 'lodash.isequal';

const sleep = () => new Promise(resolve => setTimeout(resolve, 700))

const getUserFx = createEffect({
  handler: async () => {
    await sleep()
    return {
      username: 'gtosss',
      profile: {
        firstName: 'Timofey',
        lastName: 'Goncharov',
      },
    }
  },
})

const putUserFx = createEffect({
  handler: async values => {
    console.log('save: ', values)
    await sleep()
  },
})

const resetUser = createEvent()
const clearUser = createEvent()

const $isPending = combine([getUserFx.pending, putUserFx.pending], vars =>
  vars.includes(true),
)

const initialUser = {
  username: '',
  profile: {
    firstName: '',
    lastName: '',
  },
};

const $values = createStore(initialUser)
  .on(getUserFx.doneData, (_, user) => user)
  .reset(clearUser)

const formSnapshot = createStore(initialUser)
  .on(putUserFx.done, (_, {params}) => params)

const $isChanged = combine(
  $values,
  formSnapshot,
  (a, b) => !isEqual(a, b),
)

sample({
  source: formSnapshot,
  clock: resetUser,
  target: $values,
})

const $isEmpty = $values.map(
  values =>
    !values.username && !values.profile.firstName && !values.profile.lastName,
)

const Input = ({controller, label}) => {
  const {input} = controller();

  return (
    <div className="input-wrap">
      <label>{label}</label>
      <input {...input} value={input.value || ''} className="input" />
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
  const {handleSubmit, controller} = useForm({$values});

  const onSubmit = ({values}) => {
    putUserFx(values);
  };

  const disabled = useStore($isPending);
  const changed = useStore($isChanged);
  const empty = useStore($isEmpty);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input label="Username" controller={controller({name: 'username'})} />
        <Input label="First name" controller={controller({name: 'profile.firstName'})} />
        <Input label="Last name" controller={controller({name: 'profile.lastName'})} />
        <button disabled={disabled} type="button" onClick={() => getUserFx()}>
          {useStore(getUserFx.pending) ? 'loading...' : 'load user'}
        </button>
        <button disabled={disabled || !changed} type="button" onClick={() => resetUser()}>reset</button>
        <button disabled={disabled || empty} type="button" onClick={() => clearUser()}>clear</button>
        <button disabled={disabled || !changed || empty} type="submit">
          {useStore(putUserFx.pending) ? 'saving...' : 'save'}
        </button>
      </form>

      <div className="row">
        <Code source={$values} title="values" />
        <Code source={formSnapshot} title="saved state" />
      </div>
    </div>
  );
}

export default Form;
