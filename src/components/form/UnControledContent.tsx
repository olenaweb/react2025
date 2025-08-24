import React, { useRef, useState } from "react";
import * as Yup from "yup";
import { ValidationError } from "yup";

import { useAppDispatch, useAppSelector } from "@/app/appHook";
import { saveUser } from "@/features/user/userSlice";

import { FormData } from "@/type/type";
type Props = {
  onClose?: () => void;
};

const UnControledContent: React.FC<Props> = ({ onClose }) => {
  const dispatch = useAppDispatch();
  const { countries } = useAppSelector((state) => state.countries);

  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const genderRef = useRef<HTMLSelectElement>(null);
  const agreementRef = useRef<HTMLInputElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const countryRef = useRef<HTMLInputElement>(null);


  const [errors, setErrors] = useState<Record<string, string>>({});
  const getFile = (fileIn: unknown): File | undefined => {
    if (!fileIn) return undefined;
    if (fileIn instanceof File) return fileIn;
    if (typeof (fileIn as FileList).item === "function")
      return (fileIn as FileList).item(0) || undefined;
    return undefined;
  };
  const schema = Yup.object({
    name: Yup.string()
      .required("Name is required")
      .matches(/^[A-Z][a-z]+$/, "The first letter is title, only Latin"),
    age: Yup.number()
      .required("Age is required")
      .typeError("Age should be a number")
      .positive("Age should be more than 0"),
    email: Yup.string().email("Incorrect email").required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "At least 8 characters")
      .matches(/[A-Z]/, "Need at least one title letter")
      .matches(/[a-z]/, "Need at least one lowercase letter")
      .matches(/\d/, "Need at least one digit")
      .matches(/[@#$!^%*?&]/, "Need one special character @#$!^%*?&"),
    confirmPassword: Yup.string()
      .required("Is required")
      .oneOf([Yup.ref("password")], "Passwords don't match"),
    gender: Yup.string().required("Choose gender "),
    agreement: Yup.boolean().oneOf([true], "You must accept terms").required("accept terms "),
    country: Yup.string().required("Choose the country"),
    file: Yup.mixed()
      .test("fileRequired", "choose one file", (value: unknown) => {
        const file = getFile(value);
        return !!file;
      })
      .test("fileType", "Only PNG or JPEG", (value: unknown) => {
        const file = getFile(value);
        if (!file) return true;
        return ["image/png", "image/jpeg"].includes(file.type);
      })
      .test("fileSize", "Max size 2MB", (value: unknown) => {
        const file = getFile(value);
        if (!file) return true;
        return file.size <= 2 * 1024 * 1024;
      }),
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const file = fileRef.current?.files?.[0];
    let base64: string | undefined;
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

    const data = {
      name: nameRef.current?.value || "",
      age: ageRef.current?.value ? Number(ageRef.current.value) : 0,
      email: emailRef.current?.value || "",
      password: passwordRef.current?.value || "",
      confirmPassword: confirmPasswordRef.current?.value || "",
      gender: genderRef.current?.value || "",
      agreement: agreementRef.current?.checked || false,
      country: countryRef.current?.value || "",
      image: base64,
      file: fileRef.current?.files?.[0]
    };

    try {
      await schema.validate(data, { abortEarly: false });
      setErrors({});
      const { file, ...rest } = data;
      const values: FormData = { ...rest };
      dispatch(saveUser(values));
      onClose?.();
    } catch (err: unknown) {
      if (err instanceof ValidationError) {
        const newErrors: Record<string, string> = {};
        (err.inner || []).forEach((e) => {
          if (e.path) {
            newErrors[e.path] = e.message;
          }
        });
        setErrors(newErrors);
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
        <input ref={nameRef} id="name" type="text" tabIndex={1} autoFocus />
        {errors.name && <p className="error">{errors.name}</p>}
      </div>

      <div className="Age inputBlock">
        <label htmlFor="age">Age:</label>
        <input ref={ageRef} id="age" type="number" tabIndex={2} />
        {errors.age && <p className="error">{errors.age}</p>}
      </div>
      <div className="Password inputBlock">
        <label htmlFor="password">Password:</label>
        <input ref={passwordRef} id="password" type="password" tabIndex={3} />
        {errors.password && <p className="error">{errors.password}</p>}
      </div>

      <div className="ConfirmPassword inputBlock">
        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input ref={confirmPasswordRef} id="confirmPassword" type="password" tabIndex={4} />
        {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
      </div>

      <div className="Email inputBlock">
        <label htmlFor="email">Email:</label>
        <input ref={emailRef} id="email" type="email" tabIndex={5} />
        {errors.email && <p className="error">{errors.email}</p>}
      </div>

      <div className="gender inputBlock">
        <label htmlFor="gender">Gender:</label>
        <select ref={genderRef} id="gender" autoComplete="on" tabIndex={6}>
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
        <input
          className="select"
          id="country"
          list="country-list"
          ref={countryRef} tabIndex={7}
          placeholder="Choose country..."
        />
        <datalist id="country-list">
          {countries.map((item: string) => (
            <option key={item} value={item} />
          ))}
        </datalist>
        {errors.country && <p className="error">{errors.country}</p>}
      </div>

      <div className="agreement inputBlock">
        <input className={"check-agree"} ref={agreementRef} type="checkbox" id="agreement" tabIndex={8} />
        <label className={"text-agree"} htmlFor="agreement">
          I agree to the terms and conditions
        </label>
        {errors.agreement && <p className="agree error">{errors.agreement}</p>}
      </div>

      <div className="file inputBlock">
        <label htmlFor="file">Avatar:</label>
        <input ref={fileRef} id="file" type="file" tabIndex={9} />
        {errors.file && <p className="error">{errors.file}</p>}
      </div>

      <button className={"submit-btn"} type="submit" tabIndex={10} >Submit</button>
    </form>
  );
};
export default UnControledContent;
