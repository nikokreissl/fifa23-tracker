import styled from "styled-components";
import { useState } from "react";
import { useContext } from "react";
import { DataContext } from "../../pages/_app";
import { useRouter } from "next/router";

export default function CreateCompetitionForm() {
  const router = useRouter();

  const [competitionNameInput, setCompetitionNameInput] = useState("");
  const [competitionGameInput, setCompetitionGameInput] = useState(1);

  const { handleAddCompetition } = useContext(DataContext);

  function handleNameInput(event) {
    setCompetitionNameInput(event.target.value);
  }

  function handleGameInput(event) {
    setCompetitionGameInput(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    handleAddCompetition(competitionNameInput, competitionGameInput);

    router.push("/");
  }

  return (
    <>
      <button onClick={() => router.back()}>Cancel</button>
      <StyledCreateCompetitionForm onSubmit={handleSubmit}>
        <label htmlFor="competition-name">Name</label>
        <input
          type="text"
          name="competition-name"
          id="competition-name"
          value={competitionNameInput}
          onChange={handleNameInput}
          required
        />
        <label htmlFor="competition-games">Number of Games</label>
        <input
          type="number"
          name="competition-games"
          id="competition-games"
          value={competitionGameInput}
          onChange={handleGameInput}
          min={1}
          max={100}
        />
        <button>Create competition</button>
      </StyledCreateCompetitionForm>
    </>
  );
}

const StyledCreateCompetitionForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 70%;
  gap: 10px;
`;