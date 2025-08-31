import React from "react";
import { useForm, SubmitHandler, Resolver } from "react-hook-form";
import { useCallback } from "react";

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
      co2_per_gdp: informData.co2_per_gdp || false,
      gdp: informData.gdp || false,
      ghg_per_capita: informData.ghg_per_capita || false,
      cumulative_co2: informData.cumulative_co2 || false,
      co2_growth_prct: informData.co2_growth_prct || false,
      methane: informData.methane || false,
      methane_per_capita: informData.methane_per_capita || false,
      nitrous_oxide: informData.nitrous_oxide || false,
      nitrous_oxide_per_capita: informData.nitrous_oxide_per_capita || false,
      total_ghg: informData.total_ghg || false,
    },
  });

  const onSubmit: SubmitHandler<FormData> = useCallback(
    async (data) => {
      dispatch(saveInform(data));
    },
    [dispatch]
  );
  return (
    <>
      <div className={"inform-content"}>
        <form id="inform-form" className="form" onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="inform-inputBlock">
            <input
              className={"inform-add-column"}
              type="checkbox"
              id="co2_per_gdp"
              {...register("co2_per_gdp")}
              tabIndex={1}
              autoFocus
            />
            <label className={"text-add-column"} htmlFor="co2_per_gdp">
              CO2 per GDP
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
              id="ghg_per_capita"
              {...register("ghg_per_capita")}
              tabIndex={3}
            />
            <label className={"text-add-column"} htmlFor="ghg_per_capita">
              GHG per capita
            </label>
          </div>

          <div className="inform-inputBlock">
            <input
              className={"inform-add-column"}
              type="checkbox"
              id="cumulative_co2"
              {...register("cumulative_co2")}
              tabIndex={4}
            />
            <label className={"text-add-column"} htmlFor="cumulative_co2">
              Cumulative CO2
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
              id="total_ghg"
              {...register("total_ghg")}
              tabIndex={10}
            />
            <label className={"text-add-column"} htmlFor="total_ghg">
              Total GHG
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
