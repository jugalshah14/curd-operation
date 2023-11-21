import * as React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { useForm, Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { v4 as uuidv4 } from "uuid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./FormComponents.css";

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
    toast.success("Form submitted successfully!");
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="header">
          <h3>CRUD Operation</h3>
        </div>

        <div className="row">
          <div className="col-md-6">
            <label className="FirstName">First Name*</label>
            <TextField
              error={errors.firstName}
              helperText={
                errors.firstName?.type === "required" &&
                "First name is required"
              }
              variant="outlined"
              {...register("firstName", { required: true })}
              aria-invalid={errors.firstName ? "true" : "false"}
              placeholder="Enter First Name"
            />
          </div>
          <div className="col-md-6">
            <label className="LastName">Last Name*</label>
            <TextField
              error={errors.lastName}
              helperText={
                errors.lastName?.type === "required" && "Last name is required"
              }
              variant="outlined"
              {...register("lastName", { required: true })}
              aria-invalid={errors.lastName ? "true" : "false"}
              placeholder="Enter Last Name"
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <label className="MobileNumber">Mobile Number*</label>
            <TextField
              error={errors.MobileNumber}
              helperText={
                errors.MobileNumber?.type === "required" &&
                "Mobile Number is required"
              }
              type="number"
              variant="outlined"
              {...register("MobileNumber", { required: true })}
              aria-invalid={errors.MobileNumber ? "true" : "false"}
              placeholder="Enter Mobile Number"
            />
          </div>
          <div className="col-md-6">
            <label className="email">E-Mail*</label>
            <TextField
              error={errors.mail}
              helperText={
                errors.mail?.type === "required" && "Email is Required"
              }
              variant="outlined"
              {...register("mail", { required: true })}
              aria-invalid={errors.mail ? "true" : "false"}
              placeholder="Enter Email"
            />
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
            <TextField
              error={errors.password}
              helperText={
                errors.password?.type === "required" && "Password is required"
              }
              type="password"
              variant="outlined"
              {...register("password", { required: true })}
              aria-invalid={errors.password ? "true" : "false"}
              placeholder="Enter Password"
            />
          </div>
        </div>
        <div className="button">
          <Button type="submit" variant="contained">
            Submit
          </Button>
        </div>
      </form>
      <Link to="/TableComponents">Go to Table</Link>
      <ToastContainer />
    </div>
  );
};

export default FormComponents;
