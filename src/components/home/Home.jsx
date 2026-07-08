import { Link } from "react-router-dom";
import "./Home.css";
import { useState } from "react";
import axios from 'axios'
function Home() {
    const [cgpa, setCgpa] = useState("")
    const [iq, setIq] = useState("")
    const [prediction, setPrediction] = useState("")
    const handleSubmit = (e) => {
        e.preventDefault();

        axios
            .post("http://127.0.0.1:5000/predict", {
                cgpa,
                iq,
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
    <main className="card">
        <div className="header">
            <div className="logo">SP</div>

            <div>
                <h1>Student Placement Predictor</h1>
                <p className="lead">
                    Enter CGPA and IQ to see a placement prediction
                </p>
            </div>
        </div>

        <form className="form" onSubmit={handleSubmit}>
            <div className="field">
                <label htmlFor="cgpa">CGPA</label>
                <input
                    type="number"
                    id="cgpa"
                    name="cgpa"
                    value={cgpa}
                    onChange={(e) => { setCgpa(e.target.value) }}
                    placeholder="e.g. 8.75"
                    min="0"
                    max="10"
                    step="0.01"
                />
            </div>

            <div className="field">
                <label htmlFor="iq">IQ</label>
                <input
                    type="number"
                    id="iq"
                    name="iq"
                    value={iq}
                    onChange={(e) => setIq(e.target.value)}
                    placeholder="e.g. 120"
                    step="1"
                />
            </div>

            <div className="action">
                <button type="submit" className="btn">
                    Predict
                </button>
            </div>

            <div className="result">
                <div className="label">Result:</div>
                <div className="text">{prediction}</div>
            </div>

            <div className="links">
                <a
                    href="/std_report.html"
                    className="btn"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    View Student Report
                </a>

                <Link to="/Marks" className="btn">
                    Open Marks Predictor
                </Link>
            </div>
        </form>
    </main>
);
}

export default Home;