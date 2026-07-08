import "./Marks.css";
import Select from "react-select";
import { useState } from "react";
import axios from "axios";

function Marks() {

  const options = [
    { value: "no", label: "No" },
    { value: "yes", label: "Yes" },
  ];

  const [parttime, setParttime] = useState(options[0]);

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: "#18181d",
      border: "2px solid #c89b2c",
      borderRadius: "16px",
      minHeight: "64px",
      boxShadow: state.isFocused
        ? "0 0 10px rgba(212,175,55,.45)"
        : "none",
      "&:hover": {
        border: "2px solid #d4af37",
      },
    }),

    menu: (provided) => ({
      ...provided,
      backgroundColor: "#18181d",
      border: "1px solid #c89b2c",
      borderRadius: "16px",
      overflow: "hidden",
    }),

    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? "#d4af37"
        : state.isFocused
          ? "#3b3113"
          : "#18181d",
      color: state.isSelected ? "#111" : "#fff",
      cursor: "pointer",
      fontSize: "18px",
      padding: "15px",
    }),

    singleValue: (provided) => ({
      ...provided,
      color: "#fff",
      fontSize: "18px",
    }),

    dropdownIndicator: (provided) => ({
      ...provided,
      color: "#d4af37",
      "&:hover": {
        color: "#f5d76e",
      },
    }),

    indicatorSeparator: () => ({
      display: "none",
    }),

    placeholder: (provided) => ({
      ...provided,
      color: "#888",
    }),
  };

  const [study, setStudy] = useState(0)
  const [attendance, setAttendance] = useState(0)
  const [mental, setMental] = useState(0)
  const [sleep, setSleep] = useState(0)
  const [prediction, setPrediction] = useState("");
 const handleSubmit = () => {
  axios
    .post("http://127.0.0.1:5000/predict2", {
      study,
      attendance,
      mental,
      sleep,
      parttime: parttime.value,
    })
    .then((response) => {
      setPrediction(response.data.prediction);
    })
    .catch((error) => {
      console.error(error);
      setPrediction("Error connecting to server");
    });
};

  return (
    <main className="marks-card">
      <div className="marks-title">
        <h1>Student Exam Score Predictor</h1>
        <p className="marks-lead">
          Adjust the sliders to visualize how different factors could affect
          exam performance
        </p>
      </div>

      <div className="marks-controls">
        <div className="marks-control">
          <label>
            Study Hours per Day
            <span className="marks-value">{study}hrs</span>
          </label>

          <input
            type="range"
            value={study}
            onChange={(e) => { setStudy(e.target.value) }}
            min="0"
            max="24"
            defaultValue="0"
          />


        </div>

        <div className="marks-control">
          <label>
            Attendance Percentage
            <span className="marks-value">{attendance}%</span>
          </label>

          <input
            type="range"
            min="0"
            max="100"
            value={attendance}
            onChange={(e) => { setAttendance(e.target.value) }}
            defaultValue="0" />

        </div>

        <div className="marks-control">
          <label>
            Mental Health Rating
            <span className="marks-value">{mental}</span>
          </label>

          <input
            type="range"
            min="1"
            max="10"
            value={mental}
            onChange={(e) => { setMental(e.target.value) }}
            defaultValue="1" />


        </div>

        <div className="marks-control">
          <label>
            Sleep Hours per Night
            <span className="marks-value">{sleep}hrs</span>
          </label>

          <input
            type="range"
            min="0"
            max="24"
            value={sleep}
            onChange={(e) => { setSleep(e.target.value) }}
            defaultValue="0" />


        </div>

        <div className="marks-control marks-full">
          <label>Part-Time Job</label>

          <Select
            options={options}
            value={parttime}
            onChange={setParttime}
            styles={customStyles}
            isSearchable={false}
          />
        </div>

        <div className="marks-full marks-actions">
          <button onClick={handleSubmit}>Predict Exam Score</button>
        </div>

        <div className="marks-result marks-full">
          <span>Result:</span>
          <strong>{prediction}</strong>
        </div>

        <div className="marks-full marks-actions">
          <a
            href="/marks_report.html"
            className="btn"
            target="_blank"
            rel="noopener noreferrer"
          >
            View Marks Report
          </a>
        </div>
      </div>
    </main>
  );
}

export default Marks;