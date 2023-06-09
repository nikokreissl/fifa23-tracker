import { useState } from "react";
import {
  StyledForm,
  StyledFormLabel,
  StyledInputField,
  StyledRangeField,
  StyledFormLabelInputWrapper,
} from "../../GeneralComponents/CreateForm/StyledCreateForm.js";
import {
  StyledButtonComponent,
  StyledButtonLinkWrapper,
} from "../../GeneralComponents/Buttons";
import {
  PageHeadlineComponent,
  StyledPageDescription,
} from "../../GeneralComponents/PageInformation/index.js";

export default function EditCompetition({
  onToggleEdit,
  competition,
  onUpdateCompetition,
  onArchiveCompetition,
  onDeleteCompetition,
  onClickBack,
}) {
  const { name, totalGames, id, isArchived } = competition;
  const [competitionName, setCompetitionName] = useState(name);
  const [competitionGames, setCompetitionGames] = useState(totalGames);

  function handleCompetitionNameChange(event) {
    setCompetitionName(event.target.value);
  }

  function handleCompetitionGamesChange(event) {
    setCompetitionGames(Number(event.target.value));
  }

  function handleUpdateSubmit() {
    if (competitionGames < competition.gamesPlayed.length) {
      alert(
        "Number of games must be greater than the current number of games added to the competition. Your changed won't be saved."
      );
    } else {
      onToggleEdit();
      onUpdateCompetition(id, competitionName, competitionGames);
    }
  }

  function deleteCompetition() {
    onClickBack();
    onDeleteCompetition(id);
  }

  function checkValidInput(input) {
    if (input.startsWith(" ")) {
      return false;
    } else {
      return true;
    }
  }

  return (
    <>
      <StyledButtonComponent type="back" functionToBeExecuted={onToggleEdit}>
        Back
      </StyledButtonComponent>
      <PageHeadlineComponent>Edit competition</PageHeadlineComponent>
      <StyledPageDescription>
        Change the <strong>competition name</strong> and in- or decrease the{" "}
        <strong>number of games</strong>.
        <br />
        The competition is over or you want to restore it? Use the button{" "}
        <strong>Archive / Restore</strong> to do so.
      </StyledPageDescription>
      <StyledForm onSubmit={(event) => event.preventDefault()}>
        <StyledFormLabel htmlFor="competition-name">Name</StyledFormLabel>
        <StyledInputField
          type="text"
          name="competition-name"
          id="competition-name"
          value={competitionName}
          onChange={handleCompetitionNameChange}
          pattern="^(?!\s*$).+"
          maxLength={20}
          required
        />
        <StyledFormLabelInputWrapper>
          <StyledFormLabel htmlFor="competition-games">
            Number of Games
          </StyledFormLabel>
          <p>{competitionGames}</p>
          <StyledRangeField
            type="range"
            name="competition-games"
            id="competition-games"
            value={competitionGames}
            onChange={handleCompetitionGamesChange}
            min={1}
            max={25}
          />
        </StyledFormLabelInputWrapper>
        <StyledButtonComponent
          type="update"
          functionToBeExecuted={handleUpdateSubmit}
          disabled={
            !competitionName ||
            !checkValidInput(competitionName) ||
            competitionGames < competition.gamesPlayed.length
              ? true
              : false
          }
        >
          Update
        </StyledButtonComponent>
      </StyledForm>
      <StyledButtonLinkWrapper>
        <StyledButtonComponent
          type="delete"
          functionToBeExecuted={deleteCompetition}
        >
          Delete
        </StyledButtonComponent>
        <StyledButtonComponent
          type="archive"
          functionToBeExecuted={() => onArchiveCompetition(id)}
          item="Competition"
        >
          {isArchived ? "Restore" : "Archive"}
        </StyledButtonComponent>
      </StyledButtonLinkWrapper>
    </>
  );
}
