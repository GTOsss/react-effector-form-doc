import {useForm} from 'react-effector-form';
import {createStore, createEffect, sample, createEvent, combine} from 'effector';
import {useStore} from 'effector-react';
import React from 'react';
import isEqual from 'lodash.isequal';

const sleep = () => new Promise((resolve) => setTimeout(resolve, 1000));

const user = {
  username: 'gtosss',
  profile: {
    firstName: 'Timofey',
    lastName: 'Goncharov',
  },
};

const getUserFx = createEffect({
  handler: async () => {
    await sleep();
    return user;
  },
});

const putUserFx = createEffect({
  handler: async (values) => {
    await sleep();
    alert(JSON.stringify(values, null, '  '));
  },
});

const $isPending = combine([getUserFx.pending, putUserFx.pending], (vars) => vars.includes(true));

const resetUser = createEvent();
const clearUser = createEvent();

const initialValue = {profile: {}};
const $values = createStore(initialValue);

const sampledResetUser = sample({
  source: getUserFx.doneData,
  clock: resetUser,
})

$values.on(getUserFx.doneData, (_, user) => user);
$values.on(sampledResetUser, (_, user) => user);
$values.on(clearUser, () => initialValue);
$values.on(putUserFx.done, () => initialValue);

const $isChanged = createStore(false);

const sampledIsChangedUser = sample({
  source: getUserFx.doneData,
  clock: $values.updates,
  fn: (loadedUser, currentValues) => !isEqual(loadedUser, currentValues),
})

$isChanged.on(sampledIsChangedUser, (_, isChanged) => isChanged)

const $isEmpty = createStore(true);

$isEmpty.on($values.updates, (_, values) =>
  !values.username && !values.profile.firstName && !values.profile.lastName)

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
    putUserFx(values);
  };

  const disabled = useStore($isPending);
  const changed = useStore($isChanged);
  const empty = useStore($isEmpty);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input label="Username" controller={controller({name: 'username'})} />
      <Input label="First name" controller={controller({name: 'profile.firstName'})} />
      <Input label="Last name" controller={controller({name: 'profile.lastName'})} />
      <button disabled={disabled} type="button" onClick={() => getUserFx()}>load user</button>
      <button disabled={disabled || !changed} type="button" onClick={() => resetUser()}>reset</button>
      <button disabled={disabled || empty} type="button" onClick={() => clearUser()}>clear</button>
      <button disabled={disabled || !changed || empty} type="submit">save</button>
    </form>
  );
}

export default Form;
