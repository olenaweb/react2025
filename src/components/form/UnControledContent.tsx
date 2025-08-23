import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { ValidationError } from "yup";
import { useAppDispatch, useAppSelector } from "@/app/appHook";

import { saveUser } from "@/features/user/userSlice";

const UnControledContent: React.FC = () => {
  const dispatch = useAppDispatch();
  const { countries } = useAppSelector((state) => state.countries);

  const navigate = useNavigate();
  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const genderRef = useRef<HTMLSelectElement>(null);
  const agreementRef = useRef<HTMLInputElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const countryRef = useRef<HTMLSelectElement>(null);

  const [errors, setErrors] = useState<Record<string, string>>({});

  const schema = Yup.object({
    name: Yup.string()
      .required("Name is required")
      .matches(/^[A-Z][a-z]+$/, "The first letter is title, only Latin"),
    age: Yup.number()
      .typeError("Age should be a number")
      .positive("Age should be more than 0")
      .required("Age is required"),
    email: Yup.string().email("Incorrect email").required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "At least 8 characters")
      .matches(/[A-Z]/, "Need at least one title letter")
      .matches(/[a-z]/, "Need at least one lowercase letter")
      .matches(/\d/, "Need at least one digit")
      .matches(/[@#$!^%*?&]/, "Need one special character @#$!^%*?&"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords don't match")
      .required("Is required"),
    gender: Yup.string().required("Is required "),
    agreement: Yup.boolean().oneOf([true], "Is required"),
    country: Yup.string().required("Choose the country"),
  });

  const onCloseForm = () => {
    navigate("/", { replace: true });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const file = fileRef.current?.files?.[0];
    let base64: string | undefined;
    console.log('"file="', file);
    if (file) {
      if (!["image/png", "image/jpeg"].includes(file.type)) {
        setErrors({ file: "Only PNG or JPEG are acceptable" });
        return;
      }

      try {
        base64 = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = () => reject(reader.error);
          reader.readAsDataURL(file);
        });
      } catch (readErr) {
        console.error(readErr);
        setErrors({ file: "Failed to read file" });
        return;
      }
    }

    const formData = {
      name: nameRef.current?.value || "",
      age: ageRef.current?.value ? Number(ageRef.current.value) : 0,
      email: emailRef.current?.value || "",
      password: passwordRef.current?.value || "",
      confirmPassword: confirmPasswordRef.current?.value || "",
      gender: genderRef.current?.value || "",
      agreement: agreementRef.current?.checked || false,
      country: countryRef.current?.value || "",
      image: base64,
    };

    try {
      const isValidate = await schema.validate(formData, { abortEarly: false });
      console.log('"isValidate="', isValidate);
      setErrors({});
      dispatch(saveUser(formData));
      onCloseForm();
    } catch (err: unknown) {
      if (err instanceof ValidationError) {
        const newErrors: Record<string, string> = {};
        (err.inner || []).forEach((e) => {
          if (e.path) {
            newErrors[e.path] = e.message;
          }
        });
        setErrors(newErrors);
        console.log('"newErrors="', newErrors);
      } else {
        console.error(err);
        setErrors({ _general: (err as Error)?.message || "Unexpected error" });
      }
    }
  };

  return (
    <form id="uncontrol" className={"form"} onSubmit={handleSubmit}>
      <div className="Name inputBlock">
        <label htmlFor="name">Name:</label>
        <input ref={nameRef} id="name" type="text" />
        {errors.name && <p className="error">{errors.name}</p>}
      </div>

      <div className="Age inputBlock">
        <label htmlFor="age">Age:</label>
        <input ref={ageRef} id="age" type="number" />
        {errors.age && <p className="error">{errors.age}</p>}
      </div>
      <div className="Password inputBlock">
        <label htmlFor="password">Password:</label>
        <input ref={passwordRef} id="password" type="password" />
        {errors.password && <p className="error">{errors.password}</p>}
      </div>

      <div className="ConfirmPassword inputBlock">
        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input ref={confirmPasswordRef} id="confirmPassword" type="password" />
        {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
      </div>

      <div className="Email inputBlock">
        <label htmlFor="email">Email:</label>
        <input ref={emailRef} id="email" type="email" />
        {errors.email && <p className="error">{errors.email}</p>}
      </div>

      <div className="gender inputBlock">
        <label htmlFor="gender">Gender:</label>
        <select ref={genderRef} id="gender" autoComplete="on">
          <option className="choose-options" value="">
            Choose...
          </option>
          <option className="choose-options" value="male">
            male
          </option>
          <option className="choose-options" value="female">
            female
          </option>
        </select>
        {errors.gender && <p className="error">{errors.gender}</p>}
      </div>

      <div className="country inputBlock">
        <label htmlFor="country">Country:</label>
        <select className="select" ref={countryRef} id="country" autoComplete="on">
          <option className="choose-options" value="">
            Choose country...
          </option>
          {countries.map((item) => (
            <option className="choose-options" key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
        {errors.country && <p className="error">{errors.country}</p>}
      </div>

      <div className="agreement inputBlock">
        <input className={"check-agree"} ref={agreementRef} type="checkbox" id="agreement" />
        <label className={"text-agree"} htmlFor="agreement">
          I agree to the terms and conditions
        </label>
        {errors.agreement && <p className="agree error">{errors.agreement}</p>}
      </div>

      <div className="file inputBlock">
        <label htmlFor="file">Avatar:</label>
        <input ref={fileRef} id="file" type="file" />
        {errors.file && <p className="error">{errors.file}</p>}
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};
export default UnControledContent;
