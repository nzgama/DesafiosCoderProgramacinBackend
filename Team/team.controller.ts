import repository from "./team.repository.ts";
import { Team } from "./team.model.ts";


function getAllTeams() {
  return repository.getAllTeams();
}

function getTeam(teamId: string) {
  return repository.getTeam(teamId);
}

function addTeam(team: Team) {
  return repository.addTeam(team);
}

export default { getAllTeams, getTeam, addTeam };
