import { useState } from "react";
import ApiClient from "../api/ApiClient";

interface CreateVisitRequest {
  description: string;
  doctorNpwzId: string;
  patientInsuranceId: string;
  scheduledDateTime: string;
}

interface CreateVisitResponse {
  id: number;
  description: string;
  diagnostics: string | null;
  scheduledDateTime: string;
  visitStatus: string;
  receptionist: any;
  selectedDoctor: any;
  patient: any;
  labExaminationList: any | null;
  physicalExaminationList: any | null;
}

export default function HomePage() {
  const [description, setDescription] = useState("");
  const [doctorNpwzId, setDoctorNpwzId] = useState("");
  const [patientInsuranceId, setPatientInsuranceId] = useState("");
  const [scheduledDateTime, setScheduledDateTime] = useState("");
  const [response, setResponse] = useState<CreateVisitResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const requestBody: CreateVisitRequest = {
      description,
      doctorNpwzId,
      patientInsuranceId,
      scheduledDateTime,
    };

    try {
      const apiResponse = await ApiClient.post<
        CreateVisitResponse,
        CreateVisitRequest
      >("/api/receptionist/create-visit", requestBody);
      setResponse(apiResponse.data);
      setError(null);
    } catch (err) {
      setError("Failed to create visit");
      setResponse(null);
    }
  };

  return (
    <div>
      <h1>Create Visit</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="description">Description:</label>
          <input
            id="description"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="doctorNpwzId">Doctor NPWZ ID:</label>
          <input
            id="doctorNpwzId"
            type="text"
            value={doctorNpwzId}
            onChange={(e) => setDoctorNpwzId(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="patientInsuranceId">Patient Insurance ID:</label>
          <input
            id="patientInsuranceId"
            type="text"
            value={patientInsuranceId}
            onChange={(e) => setPatientInsuranceId(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="scheduledDateTime">Scheduled DateTime:</label>
          <input
            id="scheduledDateTime"
            type="text"
            value={scheduledDateTime}
            onChange={(e) => setScheduledDateTime(e.target.value)}
          />
        </div>
        <button type="submit">Create Visit</button>
      </form>
      {response && (
        <div>
          <h2>Visit Created Successfully</h2>
          <p>ID: {response.id}</p>
          <p>Description: {response.description}</p>
          <p>Scheduled DateTime: {response.scheduledDateTime}</p>
          <p>Status: {response.visitStatus}</p>
          {/* You can display more details here */}
        </div>
      )}
      {error && <p>{error}</p>}
    </div>
  );
}
