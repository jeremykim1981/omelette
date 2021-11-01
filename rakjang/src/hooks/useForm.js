import { useState, useCallback } from "react";
import produce from "immer";

const useForm = ({ initialState, resolver }) => {
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState(initialState);

  const setValue = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    const nextState = produce(form, (draftState) => {
      draftState[name] = value;
    });
    setForm(nextState);
  };

  const handleSubmit = () => {
    try {
      const values = resolver.validateSync(form, { abortEarly: false });
      return {
        values,
        errors: {},
        isError: false,
      };
    } catch (error) {
      const errors = parseErrorSchema(error);
      setErrors(errors);
      return {
        values: {},
        errors,
        isError: true,
      };
    }
  };

  const parseErrorSchema = (error) => {
    if (Array.isArray(error.inner) && error?.inner?.length) {
      const errors = error.inner.reduce((prev, { path, message, type }) => {
        const field = path;
        return {
          ...prev,
          [field]: {
            type,
            message,
          },
        };
      }, {});

      return errors;
    }

    return {
      [error.path]: { message: error.message, type: error.type },
    };
  };

  return {
    form,
    setForm,
    setValue,
    errors,
    handleSubmit,
  };
};

export default useForm;
