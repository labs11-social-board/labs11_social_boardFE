import React from "react";
import styled from "styled-components";

import { Team } from "../index.js";

/***************************************************************************************************
 ********************************************** Styles *********************************************
 **************************************************************************************************/
const DivTeams = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const DivTeamRows = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

/***************************************************************************************************
 ********************************************* Component *******************************************
 **************************************************************************************************/
const Teams = ({ teams, history }) => {
  return (
    <DivTeams>
      <DivTeamRows>
        {teams.map((team, index) => (
          <Team key={team.id} team={team} history={history} />
        ))}
      </DivTeamRows>
    </DivTeams>
  );
};

export default Teams;
