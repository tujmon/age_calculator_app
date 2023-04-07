import React from "react";
import "./styles.css";

export default function App() {
  const [day, setDay] = React.useState("--");
  const [month, setMonth] = React.useState("--");
  const [year, setYear] = React.useState("--");
  const [dayValidation, setDayValidation] = React.useState("valid");
  const [monthValidation, setMonthValidation] = React.useState("valid");
  const [yearValidation, setYearValidation] = React.useState("valid");
  const [validDate, setValidDate] = React.useState(true);

  const formRef = React.useRef();
  function resetValidation() {
    setDayValidation("valid");
    setMonthValidation("valid");
    setYearValidation("valid");
    setValidDate(true);
  }
  function handleSubmit(event) {
    event.preventDefault();
    resetValidation();
    const isDayFilled = event.target[0].value.length >= 1;
    const isMonthFilled = event.target[1].value.length >= 1;
    const isYearFilled = event.target[2].value.length >= 1;

    if (!isDayFilled || !isMonthFilled || !isYearFilled) {
      setDayValidation(isDayFilled ? "valid" : "required");
      setMonthValidation(isMonthFilled ? "valid" : "required");
      setYearValidation(isYearFilled ? "valid" : "required");
      return;
    }
    const isDayValid = event.target[0].value.length === 2;
    const isMonthValid = event.target[1].value.length === 2;
    const isYearValid = event.target[2].value.length === 4;

    if (!isDayValid || !isMonthValid || !isYearValid) {
      setDayValidation(isDayValid ? "valid" : "incorrect");
      setMonthValidation(isMonthValid ? "valid" : "incorrect");
      setYearValidation(isYearValid ? "valid" : "incorrect");
      return;
    }
    const actualDate = new Date();
    console.log(actualDate);
    const formDate = new Date(
      `${event.target[1].value}/${event.target[0].value}/${event.target[2].value}`
    );
    console.log(formDate);
    if (actualDate.getTime() < formDate.getTime()) {
      setValidDate(false);
      return;
    }
    const date = diffDates(formDate, actualDate);
    setDay(date[0]);
    setMonth(date[1]);
    setYear(date[2]);
    formRef.current.reset();
  }

  function diffDates(date1, date2) {
    const diff = Math.abs(date1 - date2);

    const years = Math.floor(diff / (365 * 24 * 60 * 60 * 1000));
    const months = Math.floor(
      (diff % (365 * 24 * 60 * 60 * 1000)) / (30 * 24 * 60 * 60 * 1000)
    );
    const days = Math.floor(
      (diff % (30 * 24 * 60 * 60 * 1000)) / (24 * 60 * 60 * 1000)
    );
    return [days, months, years];
  }

  return (
    <div className="wrapper">
      <form ref={formRef} onSubmit={handleSubmit}>
        <div className="fields">
          <div className="field">
            <label
              className={dayValidation !== "valid" || !validDate ? "red" : ""}
            >
              Day
            </label>
            <input
              type="number"
              placeholder="DD"
              className={
                dayValidation !== "valid" || !validDate ? "required" : ""
              }
            ></input>
            {dayValidation === "required" && (
              <span className="red">This field is required</span>
            )}
            {dayValidation === "incorrect" && (
              <span className="red">Must be a valid day</span>
            )}
            {!validDate && <span className="red">Must be a valid date</span>}
          </div>
          <div className="field">
            <label
              className={monthValidation !== "valid" || !validDate ? "red" : ""}
            >
              Month
            </label>
            <input
              type="number"
              placeholder="MM"
              className={
                monthValidation !== "valid" || !validDate ? "required" : ""
              }
            ></input>
            {monthValidation === "required" && (
              <span className="red">This field is required</span>
            )}
            {monthValidation === "incorrect" && (
              <span className="red">Must be a valid month</span>
            )}
          </div>
          <div className="field">
            <label
              className={yearValidation !== "valid" || !validDate ? "red" : ""}
            >
              Year
            </label>
            <input
              type="number"
              placeholder="YYYY"
              className={
                yearValidation !== "valid" || !validDate ? "required" : ""
              }
            ></input>
            {yearValidation === "required" && (
              <span className="red">This field is required</span>
            )}
            {yearValidation === "incorrect" && (
              <span className="red">Must be a valid year</span>
            )}
          </div>
        </div>
        <div className="button-field">
          <div className="line"></div>
          <button type="submit">
            <img src="https://beshoys.github.io/age-calculator-app-ftm/assets/images/icon-arrow.svg" />
          </button>
        </div>
      </form>
      <div className="return-text">
        <span className="text">
          <span>{year}</span> years
        </span>
        <span className="text">
          <span>{month}</span> months
        </span>
        <span class="text">
          <span>{month}</span> days
        </span>
      </div>
    </div>
  );
}
