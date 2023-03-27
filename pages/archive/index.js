import ArchiveCard from "../../components/Archive/ArchiveCards";
import { useContext } from "react";
import { DataContext } from "../_app";

export default function ArchivePage() {
  const { objectives, competitions } = useContext(DataContext);
  return (
    <main>
      <ArchiveCard
        itemName="Competitions"
        object={competitions}
        href="competitions"
      />
      <ArchiveCard
        itemName="Objectives"
        object={objectives}
        href="competitions"
      />
    </main>
  );
}
