import "./index.css";
import "./app.css";
import "./forms.css";
import { useState } from "react";
import Modal from "@/components/form/modal";
import { useAppSelector } from "@/app/appHook";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler, Resolver } from "react-hook-form";
import AddNewInformation from "@/components/form/add-new-information";

const schema = Yup.object().shape({
  country: Yup.string().matches(
    /^($| $|[A-Z][A-Za-z0-9 ]*)$/,
    "The wrong format. The field should begin with the title letter or be empty."
  ),
  year: Yup.number()
    .required("Year is required")
    .typeError("Year should be a number")
    .min(1900, "Min year 1900")
    .max(2025, "Max year 2025"),
});

type FormDataInput = {
  country: string;
  year: number;
};

const App: React.FC = () => {
  const countries = useAppSelector((state) => state.countries.countries);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    reset,
  } = useForm<FormDataInput>({
    mode: "onTouched",
    resolver: yupResolver(schema) as Resolver<FormDataInput>,
    defaultValues: {
      country: "",
      year: 2025,
    },
  });
  const [isOpen, setIsOpen] = useState(false);

  const controlFormHandle = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsOpen(true);
    console.log('"isOpen="', isOpen);
  };

  const doCloseHandle = () => {
    setIsOpen(false);
    console.log('"isOpen="', isOpen);
  };

  const onSubmit: SubmitHandler<FormDataInput> = async (data) => {
    console.log('"data="', data);
    reset();
  };
  return (
    <div className="view-app">
      <div className="search-block">
        <form id="control" className="form" onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="year inputBlock">
            <div className="label-input">
              <label htmlFor="year">Year:</label>
              <input
                id="year"
                type="number"
                {...register("year")}
                tabIndex={1}
                placeholder="Choose year"
              />
            </div>
            {errors.year && <p className="error">{errors.year.message}</p>}
          </div>
          <div className="country inputBlock">
            <div className="label-input">
              <label htmlFor="country">Country:</label>
              <input
                className="select"
                id="country"
                list="country-list"
                {...register("country")}
                tabIndex={2}
                placeholder="Enter country"
              />
            </div>
            {errors.country && <p className="error">{errors.country.message}</p>}
            <datalist id="country-list">
              {countries.map((item: string) => (
                <option className="option" key={item} value={item} />
              ))}
            </datalist>
          </div>
          <div className="buttons">
            <button
              className="submit-btn"
              type="submit"
              disabled={!isValid || isSubmitting}
              tabIndex={3}
            >
              🔍
            </button>
            <button
              className="add-fields-btn"
              type="button"
              onClick={controlFormHandle}
              tabIndex={4}
            >
              Add Fields
            </button>
          </div>
        </form>
      </div>
      <div className="view-body">
        <h1>Welcome to Perfomance</h1>
      </div>
      {isOpen && (
        <Modal isOpen={isOpen} onClose={doCloseHandle}>
          <AddNewInformation onClose={doCloseHandle} />
        </Modal>
      )}
    </div>
  );
};

export default App;
