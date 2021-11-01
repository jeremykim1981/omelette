const RadioButton = ({ name }) => {
  return (
    <div>
      <div className="">{name}</div>
      <input {...register} type="radio" value={name} />
    </div>
  );
};
const Text_Field = ({ name }) => {
  return (
    <div className="">
      <input type="text" placeholder={name} {...register(`${name}`, {})} />
    </div>
  );
};
const Email_Field = ({ name }) => {
  return (
    <div className="">
      <input
        type="email"
        placeholder={name}
        {...register(`${name}`, { pattern: /@/i })}
      />
    </div>
  );
};
const Tel_Field = ({ name }) => {
  return (
    <div className="">
      <input
        type="tel"
        placeholder={name}
        {...register(`${name}`, {
          required: true,
          max: 10,
          min: 10,
          maxLength: 10,
        })}
      />
    </div>
  );
};
