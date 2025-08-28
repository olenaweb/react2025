import "./index.css";
import "./app.css";
import "./forms.css";
import { useState, useEffect, useMemo } from "react";
import Modal from "@/components/form/modal";
import { useAppSelector } from "@/app/appHook";

import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler, Resolver } from "react-hook-form";

import ReadMore from "@/components/form/read-more";
import Loader from "@/components/loader/Loader";

import ReloadButton from "@/components/buttons/BackButton";

import { getData } from "@/request/getData";
import { Response } from "@/type/type";
import { CountryData } from "@/type/type";

const currentYear = new Date(Date.now()).getFullYear();
const schema = Yup.object().shape({
  country: Yup.string().matches(
    /^($| $|[A-Z][A-Za-z0-9 ]*)$/,
    "Should begin with the title letter or be empty."
  ),
  year: Yup.number()
    .required("Year is required")
    .typeError("Year should be a number")
    .min(1900, "Min year 1900")
    .max(currentYear, `Max year ${currentYear}`),
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
  } = useForm<FormDataInput>({
    mode: "onTouched",
    resolver: yupResolver(schema) as Resolver<FormDataInput>,
    defaultValues: {
      country: "",
      year: 2023,
    },
  });
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [requestData, setRequestData] = useState<CountryData[]>([
    {
      country: "",
      iso_code: "",
      data: [],
    },
  ]);
  const [currYear, setCurrentYear] = useState<number>(2023);

  // const updateRequestData = (result: Response) => {
  //   if ("error" in result) {
  //     setErrorMessage(result.error);
  //     setRequestData([
  //       {
  //         country: "",
  //         iso_code: "",
  //         data: [],
  //       },
  //     ]);
  //   } else {
  //     setRequestData(result);
  //     setErrorMessage("");
  //   }
  // };

  // const updateErrorMessage = (message: string) => {
  //   setErrorMessage(message);
  // };

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
    setCurrentYear(data.year);
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const resultData: Response = await getData(currYear);
        if ("error" in resultData) {
          setErrorMessage("Sorry, the name is not found. Try another name");
          setRequestData([
            {
              country: "",
              iso_code: "",
              data: [],
            },
          ]);
        } else {
          setRequestData(resultData);
          console.log('"resultData="', resultData);
          setErrorMessage("");
        }
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setErrorMessage("Something's gone wrong :-( ");
        setIsLoading(false);
      }
    };

    fetchData();
  }, [currYear]);

  const viewContainer = useMemo(() => {
    if (isLoading) {
      return <Loader />;
    } else if (errorMessage !== "") {
      return (
        <div className="error-message">
          {errorMessage} <ReloadButton />
        </div>
      );
    } else {
      return (
        <>
          <p>Данные</p>
          <ul className="cards">
            {requestData.map((item) => (
              <p key={item.country}>{item.country}</p>
            ))}
          </ul>
          {/* <Container results={requestData.results} /> */}
        </>
      );
    }
  }, [isLoading, errorMessage, requestData]);

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
      <div className="view-body">{viewContainer}</div>
      {isOpen && (
        <Modal isOpen={isOpen} onClose={doCloseHandle}>
          <ReadMore onClose={doCloseHandle} />
        </Modal>
      )}
    </div>
  );
};

export default App;
