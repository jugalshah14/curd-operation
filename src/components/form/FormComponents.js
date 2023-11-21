import * as React from "react";
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useForm, Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import LinearProgress from "@mui/material/LinearProgress";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { v4 as uuidv4 } from "uuid";
import { ToastContainer, toast } from "react-toastify";
import "./FormComponents.css";
import { useLocation, useParams } from "react-router-dom";

const FormComponents = ({ editData, editMode }) => {
  const {
    control,
    register,
    reset,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm();
  const [passwordStrength, setPasswordStrength] = useState(0);
  const handlePasswordChange = (e) => {
    const password = e.target.value;
    const strength = password.length / 8;
    setPasswordStrength(strength);
  };

  useEffect(() => {
    if (editMode) {
      Object.keys(editData).forEach((key) => {
        setValue(key, editData[key]);
      });
    }
  }, [editMode, editData, setValue]);
  let { id } = useParams();
  const tableData = JSON.parse(localStorage.getItem("formData")) || [];

  useEffect(() => {
    if (id) {
      const itemToEdit = tableData.find((item) => item.id === id);
      reset(itemToEdit);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  const location = useLocation();
  const onSubmit = (data) => {
    const urlId = location.pathname.split("/form/")[1];

    if (urlId) {
      const storedData = JSON.parse(localStorage.getItem("formData")) || [];
      const existingData = storedData.find((item) => item.id === urlId);

      if (existingData) {
        const updatedData = storedData.map((item) =>
          item.id === urlId ? { ...item, ...data } : item
        );

        localStorage.setItem("formData", JSON.stringify(updatedData));
        reset();

        toast.success("Form edited successfully!");
        return;
      }
    }

    const uniqueId = uuidv4();
    const formDataWithId = { ...data, id: uniqueId };

    const storedData = JSON.parse(localStorage.getItem("formData")) || [];
    storedData.push(formDataWithId);
    localStorage.setItem("formData", JSON.stringify(storedData));
    reset();

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
                errors.MobileNumber?.type === "required"
                  ? "Mobile Number is required"
                  : errors.MobileNumber?.type === "pattern"
                  ? "Invalid mobile number"
                  : ""
              }
              type="text"
              variant="outlined"
              {...register("MobileNumber", {
                required: "Mobile Number is required",
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: "Invalid mobile number",
                },
              })}
              aria-invalid={errors.MobileNumber ? "true" : "false"}
              placeholder="Enter Mobile Number"
            />
          </div>
          <div className="col-md-6">
            <label className="email">E-Mail*</label>
            <TextField
              error={errors.mail}
              helperText={
                errors.mail?.type === "required"
                  ? "Email is Required"
                  : errors.mail?.type === "pattern"
                  ? "Invalid email format"
                  : ""
              }
              variant="outlined"
              {...register("mail", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email format",
                },
              })}
              aria-invalid={errors.mail ? "true" : "false"}
              placeholder="Enter Email"
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <FormControl>
              <label>Gender</label>
              <Controller
                name="gender"
                control={control}
                render={({ field }) => (
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    defaultValue="female"
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
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters long",
                },
              })}
              aria-invalid={errors.password ? "true" : "false"}
              placeholder="Enter Password"
              onChange={handlePasswordChange}
            />
            <LinearProgress
              variant="determinate"
              value={passwordStrength * 100}
            />
          </div>
        </div>
        <div className="button">
          <Button type="submit" variant="contained">
            Submit
          </Button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default FormComponents;
