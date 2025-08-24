import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler, Resolver } from "react-hook-form";
import { useRef, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/app/appHook";
import { saveUser } from "@/features/user/userSlice";

type Props = {
  onClose?: () => void;
};

type FormDataInput = {
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  agreement: boolean;
  country: string;
  file?: unknown;
  image?: string;
};
type SubmitValues = Omit<FormDataInput, "file"> & { image: string };

const ControledContent: React.FC<Props> = ({ onClose }) => {
  const dispatch = useAppDispatch();
  const { countries } = useAppSelector((state) => state.countries);
  const nameRef = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    nameRef.current?.focus();
  }, []);
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

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    reset,
  } = useForm<FormDataInput>({
    mode: "onTouched",
    resolver: yupResolver(schema) as Resolver<FormDataInput>,
    defaultValues: {
      name: "",
      age: 0,
      email: "",
      password: "",
      confirmPassword: "",
      gender: "",
      agreement: false,
      country: "",
    },
  });
  const fileToBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => reject(reader.error);
      reader.readAsDataURL(file);
    });
  const getFileFromField = (field?: unknown): File | undefined => {
    if (!field) return undefined;
    if (field instanceof File) return field;
    if (field instanceof FileList) return field[0];
    return undefined;
  };
  const onSubmit: SubmitHandler<FormDataInput> = async (data) => {
    try {
      const { file, ...rest } = data;
      const values: SubmitValues = { ...rest, image: "" };

      const fileObj = getFileFromField(file);
      if (fileObj) {
        values.image = await fileToBase64(fileObj);
      } else {
        values.image = rest.image ?? "";
      }

      dispatch(saveUser(values));
      reset();
      onClose?.();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form id="control" className="form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="Name inputBlock">
        <label htmlFor="name">Name</label>
        <input id="name" type="text" {...register("name")} tabIndex={1} ref={nameRef} />
        {errors.name && <p className="error">{errors.name.message}</p>}
      </div>

      <div className="Age inputBlock">
        <label htmlFor="age">Age:</label>
        <input id="age" type="number" {...register("age")} tabIndex={2} />
        {errors.age && <p className="error">{errors.age.message}</p>}
      </div>

      <div className="Password inputBlock">
        <label htmlFor="password">Password:</label>
        <input id="password" type="password" {...register("password")} tabIndex={3} />
        {errors.password && <p className="error">{errors.password.message}</p>}
      </div>

      <div className="ConfirmPassword inputBlock">
        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input id="confirmPassword" type="password" {...register("confirmPassword")} tabIndex={4} />
        {errors.confirmPassword && <p className="error">{errors.confirmPassword.message}</p>}
      </div>

      <div className="Email inputBlock">
        <label htmlFor="email">Email:</label>
        <input id="email" type="email" {...register("email")} tabIndex={5} />
        {errors.email && <p className="error">{errors.email.message}</p>}
      </div>

      <div className="gender inputBlock">
        <label htmlFor="gender">Gender:</label>
        <select id="gender" autoComplete="on" {...register("gender")} tabIndex={6}>
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
        {errors.gender && <p className="error">{errors.gender.message}</p>}
      </div>

      <div className="country inputBlock">
        <label htmlFor="country">Country:</label>
        <input
          className="select"
          id="country"
          list="country-list"
          {...register("country")} tabIndex={7}
        />
        <datalist id="country-list">
          {countries.map((item: string) => (
            <option key={item} value={item} />
          ))}
        </datalist>
        {errors.country && <p className="error">{errors.country.message}</p>}
      </div>

      <div className="agreement inputBlock">
        <input
          className={"check-agree"}
          type="checkbox"
          id="agreement"
          {...register("agreement")}
          tabIndex={8}
        />
        <label className={"text-agree"} htmlFor="agreement">
          I agree to the terms and conditions
        </label>
        {errors.agreement && <p className="agree error">{errors.agreement.message}</p>}
      </div>

      <div className="file inputBlock">
        <label htmlFor="file">Avatar:</label>
        <input id="file" type="file" accept="image/png, image/jpeg" {...register("file")} tabIndex={9} />
        <p className="error" aria-live="polite">
          {(errors.file?.message as string) || "\u00A0"}
        </p>
      </div>

      <button className={"submit-btn"} type="submit" disabled={!isValid || isSubmitting} tabIndex={10}>
        {isSubmitting ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
};
export default ControledContent;
