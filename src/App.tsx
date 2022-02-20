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
        <label>Are you a Developer?</label>
        Yes
        <input type="radio" {...register("isDeveloper")} value="yes" />
        No
        <input type="radio" {...register("isDeveloper")} value="no" />
        <p className="error">{errors.isDeveloper?.message}</p>
      </div>

      <div className="form-input-container">
        <label>First Name</label>
        <input type="text" {...register("firstName")} />
        <p className="error">{errors.firstName?.message}</p>
      </div>

      <div className="form-input-container">
        <label>Last Name</label>
        <input type="text" {...register("lastName")} />
        <p className="error">{errors.lastName?.message}</p>
      </div>

      <div className="form-input-container">
        <label>Age</label>
        <input type="number" {...register("age")} defaultValue={0} />
        <p className="error">{errors.age?.message}</p>
      </div>

      <div className="form-input-container">
        <label>Website</label>
        <input type="text" {...register("website")} />
        <p className="error">{errors.website?.message}</p>
      </div>

      <div className="buttons-container">
        <button type="submit">Submit</button>
        <button type="reset">Reset fields</button>
      </div>
    </form>
  );
}

export default App;
