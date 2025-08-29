import { useState } from "react";

import "./forms.css";
import Modal from "@/components/form/modal";
import ReadMore from "./read-more";
import { useAppSelector } from "@/app/appHook";

import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler, Resolver } from "react-hook-form";

const currentYear = new Date(Date.now()).getFullYear();
const schema = Yup.object().shape({
  country: Yup.string().matches(
    /^($| $|[A-Z][A-Za-z0-9 ]*)$/,
    "Should begin with the title letter or be empty."
  ),
  year: Yup.number()
    .required("Year is required")
    .typeError("Year should be a number")
    .min(1750, "Min year 1750")
    .max(currentYear - 2, `Max year ${currentYear - 2}`),
});

type FormDataInput = {
  country: string;
  year: number;
};

interface SearchProps {
  updateCountry?: (value: string) => void;
  updateYear?: (value: number) => void;
}

const SearchForm: React.FC<SearchProps> = ({ updateCountry, updateYear }) => {
  const countries = useAppSelector((state) => state.countries.countries);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<FormDataInput>({
    mode: "onTouched",
    resolver: yupResolver(schema) as Resolver<FormDataInput>,
    defaultValues: {
      country: "",
      year: 2023,
    },
  });

  const [isOpen, setIsOpen] = useState(false);
  const doCloseHandle = () => {
    setIsOpen(false);
  };

  const controlFormHandle = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsOpen(true);
  };

  const onSubmit: SubmitHandler<FormDataInput> = async (data) => {
    updateCountry?.(data.country);
    updateYear?.(data.year);
  };
  return (
    <>
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
              Read More
            </button>
          </div>
        </form>
      </div>
      {isOpen && (
        <Modal isOpen={isOpen} onClose={doCloseHandle}>
          <ReadMore onClose={doCloseHandle} />
        </Modal>
      )}
    </>
  );
};

export default SearchForm;
