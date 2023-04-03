import { useRouter } from "next/router";
import CompetitionDetail from "../../components/Competition/CompetitionDetail";
import EditCompetition from "../../components/Competition/CompetitionEdit";
import { useState, useContext } from "react";
import { DataContext } from "../_app";

export default function CompetitionDetailPage() {
  const [isEdit, setIsEdit] = useState(false);

  const router = useRouter();
  const path = router.asPath;
  const { competitionId } = router.query;

  const {
    competitions,
    handleUpdateCompetition,
    handleArchiveCompetition,
    handleDeleteCompetition,
  } = useContext(DataContext);
  const competition = competitions.find(
    (competition) => competition.id === competitionId
  );

  function toggleEdit() {
    setIsEdit(!isEdit);
  }

  function handleDirectHome() {
    if (path.includes("archive")) {
      router.push("/archive/competitions");
    } else {
      router.push("/");
    }
  }

  function handleGameDetailRedirect(competitionId, gameId) {
    if (path.includes("archive")) {
      router.push(
        `/competition/${competitionId}/game-detail/${gameId}/?archive`
      );
    } else {
      router.push(`/competition/${competitionId}/game-detail/${gameId}`);
    }
  }

  function handleTrackNewGameRedirect(competitionId) {
    if (competition.gamesPlayed.length === competition.totalGames) {
      alert(
        "You have already tracked all games! In order to track more games, update the total number of games."
      );
    } else if (path.includes("archive")) {
      router.push(`/competition/${competitionId}/track-new-game/?archive`);
    } else {
      router.push(`/competition/${competitionId}/track-new-game`);
    }
  }

  if (!competition) {
    return <p>Loading...</p>;
  }

  return (
    <main>
      {isEdit ? (
        <EditCompetition
          onToggleEdit={toggleEdit}
          competition={competition}
          onUpdateCompetition={handleUpdateCompetition}
          onArchiveCompetition={handleArchiveCompetition}
          onDeleteCompetition={handleDeleteCompetition}
          onClickBack={handleDirectHome}
        />
      ) : (
        <CompetitionDetail
          competition={competition}
          onClickBack={handleDirectHome}
          onToggleEdit={toggleEdit}
          onClickgameDetail={handleGameDetailRedirect}
          onTrackNewGame={handleTrackNewGameRedirect}
          path={path}
        />
      )}
    </main>
  );
}
