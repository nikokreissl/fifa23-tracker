import { useRouter } from "next/router";
import { useContext } from "react";
import { DataContext } from "../../../_app";
import ChallengeDetail from "../../../../components/Objectives/ChallengeDetail";

export default function ChallengeDetailPage() {
  const router = useRouter();
  const { objectiveId, challengeId } = router.query;

  const { objectives, handleChallengeUpdate } = useContext(DataContext);

  const currentObjective = objectives.find(
    (objective) => objectiveId === objective.id
  );

  if (!currentObjective) {
    return <p>Loading...</p>;
  }

  const currentChallenge = currentObjective.challenges.find(
    (challenge) => challengeId === challenge.challengeId
  );

  if (!currentChallenge) {
    return <p>Loading...</p>;
  }
  function handleClickBack() {
    router.push(`/objective/${currentObjective.id}`);
  }

  return (
    <ChallengeDetail
      objectiveId={currentObjective.id}
      challenge={currentChallenge}
      onClickBack={handleClickBack}
      onUpdateChallenge={handleChallengeUpdate}
    />
  );
}
