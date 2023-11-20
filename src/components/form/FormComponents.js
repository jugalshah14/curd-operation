import * as React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useForm, Controller } from "react-hook-form";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { v4 as uuidv4 } from "uuid";
import "./FormComponents.css";
import TableComponents from "../table/TableComponents";

const FormComponents = () => {
  const {
    control,
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = (data) => {
    const uniqueId = uuidv4();
    const formDataWithId = { ...data, id: uniqueId };

    const storedData = JSON.parse(localStorage.getItem("formData")) || [];
    storedData.push(formDataWithId);
    localStorage.setItem("formData", JSON.stringify(storedData));
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="header">
          <h3>CURD Operation</h3>
        </div>

        <div className="row">
          <div className="col-md-6">
            <label className="FirstName">First Name*</label>
            <Input
              variant="outlined"
              {...register("firstName", { required: true })}
              aria-invalid={errors.firstName ? "true" : "false"}
              placeholder="Enter First Name"
            />
            {errors.firstName?.type === "required" && (
              <p role="alert" className="Error">
                First name is required
              </p>
            )}
          </div>
          <div className="col-md-6">
            <label className="LastName">Last Name*</label>
            <Input
              variant="outlined"
              {...register("lastName", { required: true })}
              aria-invalid={errors.lastName ? "true" : "false"}
              placeholder="Enter Last Name"
            />
            {errors.lastName?.type === "required" && (
              <p role="alert" className="Error">
                Last name is required
              </p>
            )}
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <label className="MobileNumber">Mobile Number*</label>
            <Input
              type="number"
              variant="outlined"
              {...register("MobileNumber", { required: true })}
              aria-invalid={errors.MobileNumber ? "true" : "false"}
              placeholder="Enter Mobile Number"
            />
            {errors.MobileNumber?.type === "required" && (
              <p role="alert" className="Error">
                Mobile Number is required
              </p>
            )}
          </div>
          <div className="col-md-6">
            <label className="email">E-Mail*</label>
            <Input
              variant="outlined"
              {...register("mail", { required: "Email Address is required" })}
              aria-invalid={errors.mail ? "true" : "false"}
              placeholder="Enter Email"
            />
            {errors.mail && (
              <p role="alert" className="Error">
                {errors.mail.message}
              </p>
            )}
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <FormControl>
              <FormLabel id="demo-row-radio-buttons-group-label">
                Gender
              </FormLabel>
              <Controller
                name="gender"
                control={control}
                rules={{ required: "Please select gender" }}
                render={({ field }) => (
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    {...field}
                  >
                    <FormControlLabel
                      value="female"
                      control={<Radio />}
                      label="Female"
                    />
                    <FormControlLabel
                      value="male"
                      control={<Radio />}
                      label="Male"
                    />
                    <FormControlLabel
                      value="other"
                      control={<Radio />}
                      label="Other"
                    />
                  </RadioGroup>
                )}
              />
              {errors.gender && (
                <p role="alert" className="Error">
                  {errors.gender.message}
                </p>
              )}
            </FormControl>
          </div>
          <div className="col-md-6">
            <label className="Password">Password*</label>
            <Input
              type="password"
              variant="outlined"
              {...register("password", { required: true })}
              aria-invalid={errors.password ? "true" : "false"}
              placeholder="Enter Password"
            />
            {errors.password?.type === "required" && (
              <p role="alert" className="Error">
                Password is required
              </p>
            )}
          </div>
        </div>
        <div className="button">
          <Button type="submit" variant="contained">
            Submit
          </Button>
        </div>
      </form>
      <TableComponents />
    </div>
  );
};

export default FormComponents;
