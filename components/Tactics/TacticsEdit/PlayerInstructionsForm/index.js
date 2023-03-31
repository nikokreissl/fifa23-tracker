import { StyledDetailedInstructionEditWrapper } from "../GeneralInstructionsForm";
import {
  formations,
  playersDetailInstructions,
  playerInstructionValues,
} from "../../../../data/tactic/tactics-template";

export default function EditTacticPlayerForm({ tactic }) {
  console.log(tactic);
  function getGivenValueInstruction(tactic, inFor, inName) {
    const givenValue = tactic.playerInstructions
      .find((p) => p.instructionFor === inFor)
      .detailedInstructions.find((d) => d.instructionName === inName).value;
    return givenValue;
  }

  //   getGivenValueInstruction(tactic, "GK", "Saving On Crosses");

  const currentFormation = findFormation(tactic.formation);
  function findFormation(tacticFormation) {
    return formations.find((formation) => formation.name === tacticFormation)
      .positions;
  }

  const positionsWithInstructions = addInstructionToPositions(currentFormation);
  function addInstructionToPositions(formation) {
    const positionsWithInstructions = formation.map((position) => {
      const instruction = playersDetailInstructions.find((p) =>
        p.key.includes(position.key)
      );
      return {
        ...position,
        instructions: instruction ? instruction.instructions : [],
      };
    });
    return positionsWithInstructions;
  }

  const finalFormation = addDetailedInstructionsToPositions(
    positionsWithInstructions
  );
  function addDetailedInstructionsToPositions(formation) {
    const positionsWithDetailedInstructions = formation.map((position) => {
      const instructions = position.instructions.map((instruction) => {
        return playerInstructionValues.find(
          (p) => p.instructionName === instruction
        );
      });
      return { ...position, instructions };
    });
    return positionsWithDetailedInstructions;
  }

  return (
    <>
      {finalFormation.map((position) => (
        <fieldset key={position.position}>
          <legend>{position.position}</legend>

          {position.instructions.map((instruction) => (
            <StyledDetailedInstructionEditWrapper
              key={instruction.instructionName}
            >
              <label htmlFor={instruction.instructionName}>
                {instruction.instructionName}
              </label>
              <select
                name={instruction.instructionName}
                id={instruction.instructionName}
              >
                {instruction.values.map((value) => (
                  <option
                    key={value}
                    value={value}
                    defaultValue={getGivenValueInstruction(
                      tactic,
                      position.position,
                      instruction.instructionName
                    )}
                  >
                    {value}
                  </option>
                ))}
              </select>
            </StyledDetailedInstructionEditWrapper>
          ))}
        </fieldset>
      ))}
    </>
  );
}

{
  /* {instructionsTemplate.map((instruction) => (
        <fieldset key={instruction.instructionFor}>
          <legend>{instruction.instructionFor}</legend>
          {instruction.detailedInstructions.map((detailedInstruction) => (
            <StyledDetailedInstructionEditWrapper
              key={detailedInstruction.instructionName}
            >
              <label htmlFor={detailedInstruction.instructionName}>
                {detailedInstruction.instructionName}
              </label>
              {Array.isArray(detailedInstruction.value) ? (
                <select>
                  {detailedInstruction.value.map((value) => (
                    <option
                      key={value}
                      defaultValue={getGivenValueGeneralInstruction(
                        tactic,
                        instruction.instructionFor,
                        detailedInstruction.instructionName
                      )}
                    >
                      {value}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  htmlFor={detailedInstruction.instructionName}
                  type={"number"}
                  min={`${detailedInstruction.minValue}`}
                  max={`${detailedInstruction.maxValue}`}
                  defaultValue={getGivenValueGeneralInstruction(
                    tactic,
                    instruction.instructionFor,
                    detailedInstruction.instructionName
                  )}
                />
              )}
            </StyledDetailedInstructionEditWrapper>
          ))}
        </fieldset>
      ))} */
}
