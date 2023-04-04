import { useRouter } from "next/router";
import { StyledDetailContainer } from "../../../components/Competition/GameDetail/StyledGameDetail";
import {
  StyledButton,
  StyledButtonWrapper,
} from "../../../components/GeneralComponents/Buttons/StyledButton";
import { useState, useContext } from "react";
import { DataContext } from "../../_app";
import {
  StyledEditChallengeForm,
  StyledTimesWrapper,
  StyledTimesText,
  StyledTimesButton,
} from "../../../components/Objectives/ChallengeDetail/StyledChallengeDetail";

export default function AddChallengePage() {
  const router = useRouter();
  const path = router.asPath;
  const { objectiveId } = router.query;

  const { handleAddChallenge } = useContext(DataContext);

  const [challengeDescription, setChallengeDescription] = useState("");
  const [challengeTimesNeeded, setChallengechallengeTimesNeeded] = useState(0);
  const [challengeTimesCompleted, setChallengeTimesCompleted] = useState(0);

  function handleDescriptionInput(event) {
    setChallengeDescription(event.target.value);
  }

  function handleChallengeTimesUpdate(timesType, operation) {
    if (timesType === "needed") {
      if (operation === "increment") {
        setChallengechallengeTimesNeeded(challengeTimesNeeded + 1);
      } else if (operation === "decrement") {
        setChallengechallengeTimesNeeded(challengeTimesNeeded - 1);
      }
    } else if (timesType === "completed") {
      if (operation === "increment") {
        setChallengeTimesCompleted(challengeTimesCompleted + 1);
      } else if (operation === "decrement") {
        setChallengeTimesCompleted(challengeTimesCompleted - 1);
      }
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    const challengeDetails = {
      description: challengeDescription,
      timesNeeded: challengeTimesNeeded,
      timesCompleted: challengeTimesCompleted,
    };
    if (challengeTimesNeeded < challengeTimesCompleted) {
      alert("Times needed can not be smaller than times completed");
    } else {
      handleAddChallenge(challengeDetails, objectiveId);
      if (path.includes("archive")) {
        router.push(`/objective/${objectiveId}/?archive`);
      } else {
        router.push(`/objective/${objectiveId}`);
      }
    }
  }

  function handleAddCancel() {
    if (path.includes("archive")) {
      router.push(`/objective/${objectiveId}/?archive`);
    } else {
      router.push(`/objective/${objectiveId}`);
    }
  }

  return (
    <main>
      <StyledDetailContainer>
        <StyledButtonWrapper>
          <StyledButton onClick={handleAddCancel}>🔙 Cancel</StyledButton>
        </StyledButtonWrapper>
        <h2>Track new Challenge</h2>
        <StyledEditChallengeForm onSubmit={handleSubmit}>
          <label htmlFor="challenge-description">Description</label>
          <textarea
            name="challenge-description"
            id="challenge-description"
            rows="5"
            pattern="^(?!\s*$).+"
            value={challengeDescription}
            onChange={handleDescriptionInput}
            required
          ></textarea>
          <StyledTimesWrapper>
            <StyledTimesText>Times needed:</StyledTimesText>
            <StyledTimesButton
              type="button"
              onClick={() => handleChallengeTimesUpdate("needed", "increment")}
            >
              +1
            </StyledTimesButton>
            <p>{challengeTimesNeeded}</p>
            <StyledTimesButton
              type="button"
              onClick={() => handleChallengeTimesUpdate("needed", "decrement")}
              disabled={
                challengeTimesNeeded < 1 ||
                challengeTimesNeeded === challengeTimesCompleted
                  ? true
                  : false
              }
            >
              -1
            </StyledTimesButton>
          </StyledTimesWrapper>
          <StyledTimesWrapper>
            <StyledTimesText>Times completed:</StyledTimesText>
            <StyledTimesButton
              type="button"
              onClick={() =>
                handleChallengeTimesUpdate("completed", "increment")
              }
              disabled={
                challengeTimesNeeded === challengeTimesCompleted ? true : false
              }
            >
              +1
            </StyledTimesButton>
            <p>{challengeTimesCompleted}</p>
            <StyledTimesButton
              type="button"
              onClick={() =>
                handleChallengeTimesUpdate("completed", "decrement")
              }
              disabled={challengeTimesCompleted < 1 ? true : false}
            >
              -1
            </StyledTimesButton>
          </StyledTimesWrapper>
          <button>Update</button>
        </StyledEditChallengeForm>
      </StyledDetailContainer>
    </main>
  );
}
