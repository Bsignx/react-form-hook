import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import "./styles.css";

type FormData = {
  isDeveloper: boolean;
  firstName: string;
  lastName: string;
  age: number;
  website: string;
};

const SignupSchema = yup.object({
  isDeveloper: yup
    .string()
    .nullable()
    .required("Campo isDeveloper obrigatório"),
  firstName: yup.string().required("Campo firstName obrigatório"),
  lastName: yup.string().required("Campo lastName obrigatório"),
  age: yup
    .number()
    .positive("Número precisa ser positivo")
    .integer("Campo precisa ser do tipo inteiro")
    .required("Campo lastName obrigatório"),
  website: yup.string().url("Campo precisa ser uma URL válida"),
});

function App() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormData>({
    resolver: yupResolver(SignupSchema),
  });

  const onSubmit = (data: FormData) => {
    alert(JSON.stringify(data));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-input-container">
        <p className="form-radio-input-title">Are you a Developer?</p>

        <div className="form-radio-input-container">
          <label htmlFor="yes">Yes</label>
          <input
            type="radio"
            id="yes"
            {...register("isDeveloper")}
            value="yes"
          />
        </div>

        <div className="form-radio-input-container">
          <label htmlFor="no">No</label>
          <input type="radio" id="no" {...register("isDeveloper")} value="no" />
        </div>

        {errors.isDeveloper && (
          <p className="error">{errors.isDeveloper?.message}</p>
        )}
      </div>

      <div className="form-input-container">
        <label htmlFor="first-name">First Name</label>
        <input type="text" id="first-name" {...register("firstName")} />
        {errors.firstName && (
          <p className="error">{errors.firstName?.message}</p>
        )}
      </div>

      <div className="form-input-container">
        <label htmlFor="last-name">Last Name</label>
        <input type="text" id="last-name" {...register("lastName")} />
        {errors.lastName && <p className="error">{errors.lastName?.message}</p>}
      </div>

      <div className="form-input-container">
        <label htmlFor="age">Age</label>
        <input type="number" id="age" {...register("age")} defaultValue={0} />
        {errors.age && <p className="error">{errors.age?.message}</p>}
      </div>

      <div className="form-input-container">
        <label htmlFor="website">Website</label>
        <input type="text" id="website" {...register("website")} />
        {errors.website && <p className="error">{errors.website?.message}</p>}
      </div>

      <div className="buttons-container">
        <button type="submit">Submit</button>
        <button type="reset">Reset fields</button>
      </div>
    </form>
  );
}

export default App;
