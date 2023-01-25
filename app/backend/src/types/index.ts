export type ServiceLogin = {
  email: string,
  password: string,
};

export type TypeToken = {
  id?: number,
  username: string,
  vocation: string,
  level: number,
};

export interface TypeLogin {
  type: string | null,
  message: string,
}

export type TypeTeams = {
  id?: number,
  teamName: string,
};

export type TypeMatches = {
  id?: number,
  homeTeamId: number,
  homeTeamGoals: number,
  awayTeamId: number,
  inProgress: boolean,
  date: string,
};
