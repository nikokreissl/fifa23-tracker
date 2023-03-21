import GlobalStyle from "../styles";
import Head from "next/head";
import { useState } from "react";
import { givenCompetitions } from "../data/competition";
import { createContext } from "react";
import { uid } from "uid";
import Heading from "../components/Heading";

export const DataContext = createContext();

export default function App({ Component, pageProps }) {
  const [competitions, setCompetition] = useState(givenCompetitions);

  function handleAddCompetition(competitionName, competitionGames) {
    const newCompetition = {
      name: competitionName,
      totalGames: competitionGames,
      id: uid(),
      isArchived: false,
      gamesPlayed: [],
    };
    setCompetition([newCompetition, ...competitions]);
  }

  function handleUpdateCompetition(competitionId) {
    const updatedCompetition = competitions.find(
      (competition) => competitionId === competition.id
    );
    console.log(updatedCompetition);
  }

  return (
    <DataContext.Provider
      value={{ competitions, handleAddCompetition, handleUpdateCompetition }}
    >
      <GlobalStyle />

      <Head>
        <title>Capstone Project</title>
      </Head>
      <Heading>FIFA23 Tracker</Heading>
      <Component {...pageProps} />
    </DataContext.Provider>
  );
}
