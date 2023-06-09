import React from "react";
import styled from "styled-components";

export default function EmptyState({ itemName, path }) {
  return (
    <StyledEmptyStateText>
      {path.includes("archive")
        ? `No ${itemName} is archived at the moment. `
        : `No ${itemName} given yet. You can create a new one by clicking the button.`}
    </StyledEmptyStateText>
  );
}

const StyledEmptyStateText = styled.p`
  font-style: italic;
  margin: 2rem;
  text-align: center;
`;
