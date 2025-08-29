import React from "react";
import { useForm, SubmitHandler, Resolver } from "react-hook-form";

import { FormData } from "@/type/type";
import "./content.css";
import { useAppDispatch, useAppSelector } from "@/app/appHook";
import { saveInform } from "@/features/countries/informSlice";

type Props = {
  onClose?: () => void;
};

const Content: React.FC<Props> = () => {
  const dispatch = useAppDispatch();
  const informData = useAppSelector((state) => state.inform.data);
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormData>({
    mode: "onTouched",
    resolver: undefined as unknown as Resolver<FormData>,
    defaultValues: {
      population_growth_prct: informData.population_growth_prct || false,
      gdp: informData.gdp || false,
      cement_co2: informData.cement_co2 || false,
      co2_growth_abs: informData.co2_growth_abs || false,
      co2_growth_prct: informData.co2_growth_prct || false,
      methane: informData.methane || false,
      methane_per_capita: informData.methane_per_capita || false,
      nitrous_oxide: informData.nitrous_oxide || false,
      nitrous_oxide_per_capita: informData.nitrous_oxide_per_capita || false,
      temperature_change_anomaly: informData.temperature_change_anomaly || false,
    },
  });
  const onSubmit: SubmitHandler<FormData> = async (data) => {
    dispatch(saveInform(data));
  };
  return (
    <>
      <div className={"inform-content"}>
        <form id="inform-form" className="form" onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="inform-inputBlock">
            <input
              className={"inform-add-column"}
              type="checkbox"
              id="population_growth_prct"
              {...register("population_growth_prct")}
              tabIndex={1}
              autoFocus
            />
            <label className={"text-add-column"} htmlFor="population_growth_prct">
              Population growth prct
            </label>
          </div>

          <div className="inform-inputBlock">
            <input
              className={"inform-add-column"}
              type="checkbox"
              id="gdp"
              {...register("gdp")}
              tabIndex={2}
            />
            <label className={"text-add-column"} htmlFor="gdp">
              GDP
            </label>
          </div>

          <div className="inform-inputBlock">
            <input
              className={"inform-add-column"}
              type="checkbox"
              id="cement_co2"
              {...register("cement_co2")}
              tabIndex={3}
            />
            <label className={"text-add-column"} htmlFor="cement_co2">
              Cement CO2
            </label>
          </div>

          <div className="inform-inputBlock">
            <input
              className={"inform-add-column"}
              type="checkbox"
              id="co2_growth_abs"
              {...register("co2_growth_abs")}
              tabIndex={4}
            />
            <label className={"text-add-column"} htmlFor="co2_growth_abs">
              CO2 Growth Absolute
            </label>
          </div>

          <div className="inform-inputBlock">
            <input
              className={"inform-add-column"}
              type="checkbox"
              id="co2_growth_prct"
              {...register("co2_growth_prct")}
              tabIndex={5}
            />
            <label className={"text-add-column"} htmlFor="co2_growth_prct">
              CO2 Growth Percent
            </label>
          </div>

          <div className="inform-inputBlock">
            <input
              className={"inform-add-column"}
              type="checkbox"
              id="methane"
              {...register("methane")}
              tabIndex={6}
            />
            <label className={"text-add-column"} htmlFor="methane">
              Methane
            </label>
          </div>

          <div className="inform-inputBlock">
            <input
              className={"inform-add-column"}
              type="checkbox"
              id="methane_per_capita"
              {...register("methane_per_capita")}
              tabIndex={7}
            />
            <label className={"text-add-column"} htmlFor="methane_per_capita">
              Methane per capita
            </label>
          </div>

          <div className="inform-inputBlock">
            <input
              className={"inform-add-column"}
              type="checkbox"
              id="nitrous_oxide"
              {...register("nitrous_oxide")}
              tabIndex={8}
            />
            <label className={"text-add-column"} htmlFor="nitrous_oxide">
              Nitrous Oxide
            </label>
          </div>

          <div className="inform-inputBlock">
            <input
              className={"inform-add-column"}
              type="checkbox"
              id="nitrous_oxide_per_capita"
              {...register("nitrous_oxide_per_capita")}
              tabIndex={9}
            />
            <label className={"text-add-column"} htmlFor="nitrous_oxide_per_capita">
              Nitrous Oxide per capita
            </label>
          </div>

          <div className="inform-inputBlock">
            <input
              className={"inform-add-column"}
              type="checkbox"
              id="temperature_change_anomaly"
              {...register("temperature_change_anomaly")}
              tabIndex={10}
            />
            <label className={"text-add-column"} htmlFor="temperature_change_anomaly">
              Temperature Change Anomaly
            </label>
          </div>

          <button className={"inform-submit-btn"} type="submit" tabIndex={11}>
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </>
  );
};
export default Content;
