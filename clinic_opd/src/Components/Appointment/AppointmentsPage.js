import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AppointmentsPage.css";
import { Navigate, useNavigate } from "react-router-dom";

function AppointmentsPage() {
  const [p_id, setP_id] = useState("");
  const [doc_id, setDoc_id] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // State for error message
  const token = localStorage.getItem("patienttoken")

  const navigate = useNavigate(); // Initialize history

  useEffect(() => {
    if (token) {
      setP_id(token);
    }
  }, [token]);

  function convertTimeToExtendedFormat(time) {
    // Split the time string into hours and minutes
    const [hours, minutes] = time.split(":");
    // Create a new time string with ':00' appended to it
    const extendedTime = `${hours}:${minutes}:00`;
    return extendedTime;
  }

  const handleRegistrationSubmit = () => {
    // Get the current date and time
    const currentDate = new Date();
    const currentDateTime = currentDate.toISOString();

    // Check if the selected appointment date and time are in the future
    const selectedDateTime = `${appointmentDate}T${convertTimeToExtendedFormat(
      appointmentTime
    )}`;
    if (selectedDateTime <= currentDateTime) {
      // Set error message and style
      setErrorMessage("Invalid appointment date and time. Please select a future date and time.");
      return;
    }

    const newAppointment = {
      patient: { p_id },
      doctor: { doc_id },
      appointmentDate,
      appointmentTime: convertTimeToExtendedFormat(appointmentTime),
      status: "",
    };

    // Make a POST request using Axios
    axios
      .post("http://localhost:8081/appointment/bookAppointment", newAppointment)
      .then((response) => {
        // Handle a successful response, e.g., show a success message
        console.log("Registration successful", response.data);
        navigate("/success");
      })
      .catch((error) => {
        // Handle any errors, e.g., display an error message
        console.error("Registration failed", error);
      });
  };


  if(!token){
    return <Navigate to = "/PatientSignIn"/>
  }

  return (
    <div className="register">
      <div className="form" onSubmit={handleRegistrationSubmit}>
        <h2>New Appointment</h2>
        <div className="form-body">
        {errorMessage && (
            <p className="error-message" style={{ color: "red" }}>
              {errorMessage}
            </p>
          )}
          <div className="form__input p_id">
            <label className="form__label" htmlFor="p_id">
              Patient ID:
            </label>
            <input
              type="number"
              id="p_id"
              name="p_id"
              className="form__input"
              value={p_id}
              onChange={(e) => setP_id(e.target.value)}
              // required
              // placeholder="Patient ID"
              disabled
            />
          </div>
          <div className="form__input doc_id">
            <label className="form__label" htmlFor="doc_id">
             Doctor ID:
            </label>
            <input
              type="number"
              id="doc_id"
              name="doc_id"
              className="form__input"
              value={doc_id}
              onChange={(e) => setDoc_id(e.target.value)}
              required
              placeholder="Doctor ID:"
            />
          </div>
          <div className="form__input appointmentTime">
            <label className="form__label" htmlFor="appointmentTime">
              Appointment Time:
            </label>
            <input
              type="time"
              id="appointmentTime"
              className="form__input"
              value={appointmentTime}
              onChange={(e) => setAppointmentTime(e.target.value)}
              placeholder="Phone number with 10 digits"
              required
            />
          </div>
          <div className="form__input appointmentDate">
            <label className="form__label" htmlFor="appointmentDate">
            Appointment Date:
            </label>
            <input
              type="date"
              id="appointmentDate"
              className="form__input"
              value={appointmentDate}
              onChange={(e) => setAppointmentDate(e.target.value)}
              placeholder="Address with pincode"
            />
          </div>
          <div className="form__input status">
            <label className="form__label" htmlFor="status">
              Status:
            </label>
            <input
              type="text"
              id="status"
              name="status"
              className="form__input"
              value="" 
              readOnly
              disabled
            />
          </div>
        </div>
        <div class="submit">
          <button
            onClick={() => handleRegistrationSubmit()}
            type="submit"
            class="btn"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
}

export default AppointmentsPage;
