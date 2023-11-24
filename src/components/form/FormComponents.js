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
import moment from "moment";
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
    const lengthRegex = /.{8,}/;
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
    const uppercaseRegex = /[A-Z]/;
    const lowercaseRegex = /[a-z]/;
    const numberRegex = /\d/;

    const lengthValid = lengthRegex.test(password);
    const specialCharValid = specialCharRegex.test(password);
    const uppercaseValid = uppercaseRegex.test(password);
    const lowercaseValid = lowercaseRegex.test(password);
    const numberValid = numberRegex.test(password);

    const strength =
      (lengthValid +
        specialCharValid +
        uppercaseValid +
        lowercaseValid +
        numberValid) /
      5;

    setPasswordStrength(strength);
  };

  useEffect(() => {
    if (editMode) {
      Object.keys(editData).forEach((key) => {
        setValue(key, editData[key]);
        setValue(key, key === "password" ? "********" : editData[key]);

        if (key === "password") {
          setPasswordStrength(1);
        }
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
    data.gender = data.gender ?? "male";
    const currentDateAndTime = moment().format("DD-MM-YYYY HH:mm");
    const uniqueId = uuidv4();
    const formDataWithDateTime = {
      ...data,
      id: uniqueId,
      dateAndTime: currentDateAndTime,
    };

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

    const storedData = JSON.parse(localStorage.getItem("formData")) || [];
    storedData.push(formDataWithDateTime);
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
              error={Boolean(errors.firstName)}
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
              error={Boolean(errors.lastName)}
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
              error={Boolean(errors.MobileNumber)}
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
              error={Boolean(errors.mail)}
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
              <label>Gender*</label>
              <Controller
                name="gender"
                defaultValue="male"
                control={control}
                render={({ field }) => (
                  <RadioGroup
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    {...field}
                  >
                    <FormControlLabel
                      value="male"
                      control={<Radio />}
                      label="Male"
                    />
                    <FormControlLabel
                      value="female"
                      control={<Radio />}
                      label="Female"
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
              error={Boolean(errors.password)}
              helperText={
                errors.password?.type === "required" && "Password is required"
              }
              type="password"
              disabled={Boolean(id)}
              variant="outlined"
              {...register("password", {
                required: true,
                onChange: (e) => {
                  handlePasswordChange(e);
                },
              })}
              aria-invalid={errors.password ? "true" : "false"}
              placeholder="Enter Password"
              // onChange={handlePasswordChange}
            />
            <p className="PasswordNote">
              **Note: A strong password must include 8 characters, 1 uppercase
              letter, 1 lowercase letter, 1 number, and 1 special character.
            </p>
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
