CREATE SCHEMA IF NOT EXISTS tennis;

-- Tour Type
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'tour_type') THEN
    CREATE TYPE tour_type as enum(
      'ATP',
      'WTP'
    );
  END IF;
END
$$;

-- Entity Status
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'tour_type') THEN
    CREATE TYPE tour_type as enum(
      'ATP',
      'WTP'
    );
  END IF;
END
$$;


-- Tournament Type, this is created since we can have tournaments in atp specific where there is a group of palyers are playing.tournament_type
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'tournament_type') THEN
    CREATE TYPE tournament_type as enum(
      'ATP-250',
      'ATP-100',
      'GRAND-SLAM'
    );
  END IF;
END
$$;

-- Table to store tournaments information
CREATE TABLE tennis.tournaments (
  id SERIAL PRIMARY KEY,
  -- Tournament name like: Rolex Miami open
  name VARCHAR(255) NOT NULL,
  -- Date on which tournament is starting.
  start_date DATE NOT NULL,
  -- Date on which tournament is ending.
  end_date DATE NOT NULL,
  -- Location of the tournament: Like tokyo Japan
  location VARCHAR(255) NOT NULL,
  -- Amount of money tournament will get. This is the real world money not the fantasy game money.
  prize_money BIGINT NOT NULL,
  tournament_type tournament_type not null,
  tournament_status entity_status not null default
  created_at timestamp default now() not null,
  updated_at timestamp default now() not null
);

-- A single table to store all the players in tennis world
-- We need to maintain this table to make sure there are no duplicates
CREATE TABLE tennis.players (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  country VARCHAR(255) NOT NULL,
  picture_url varchar (255) NOT NULL,
  tour_type tour_type not null,
  created_at timestamp default now() not null,
  updated_at timestamp default now() not null,
  constrain unique

);

CREATE TABLE tennis.tournament_player_mapping (
  id SERIAL PRIMARY KEY,
  player_id VARCHAR(255) NOT NULL,
  tournament_id VARCHAR(255) NOT NULL,
  created_at timestamp default now() not null,
  updated_at timestamp default now() not null
);

CREATE TABLE tennis_tournaments.matches (
  id SERIAL PRIMARY KEY,
  tournament_id INT NOT NULL,
  player1_id INT NOT NULL,
  player2_id INT NOT NULL,
  round INT NOT NULL,
  winner_id INT NOT NULL,
  CONSTRAINT matches_tournament_fk FOREIGN KEY (tournament_id)
    REFERENCES tennis_tournaments.tournaments(id)
    ON DELETE CASCADE,
  CONSTRAINT matches_player1_fk FOREIGN KEY (player1_id)
    REFERENCES tennis_tournaments.players(id)
    ON DELETE CASCADE,
  CONSTRAINT matches_player2_fk FOREIGN KEY (player2_id)
    REFERENCES tennis_tournaments.players(id)
    ON DELETE CASCADE,
  CONSTRAINT matches_winner_fk FOREIGN KEY (winner_id)
    REFERENCES tennis_tournaments.players(id)
    ON DELETE CASCADE
);

CREATE INDEX matches_tournament_idx ON tennis_tournaments.matches (tournament_id);
CREATE INDEX matches_round_idx ON tennis_tournaments.matches (round);

CREATE TABLE tennis_tournaments.games (
  id SERIAL PRIMARY KEY,
  match_id INT NOT NULL,
  player1_score INT NOT NULL,
  player2_score INT NOT NULL,
  game_number INT NOT NULL,
  winner_id INT NOT NULL,
  CONSTRAINT games_match_fk FOREIGN KEY (match_id)
    REFERENCES tennis_tournaments.matches(id)
    ON DELETE CASCADE,
  CONSTRAINT games_winner_fk FOREIGN KEY (winner_id)
    REFERENCES tennis_tournaments.players(id)
    ON DELETE CASCADE
);

CREATE INDEX games_match_idx ON tennis_tournaments.games (match_id);

CREATE TABLE tennis_tournaments.play_by_play (
  id SERIAL PRIMARY KEY,
  game_id INT NOT NULL,
  server_id INT NOT NULL,
  receiver_id INT NOT NULL,
  point_number INT NOT NULL,
  point_outcome VARCHAR(255) NOT NULL,
  CONSTRAINT play_by_play_game_fk FOREIGN KEY (game_id)
    REFERENCES tennis_tournaments.games(id)
    ON DELETE CASCADE,
  CONSTRAINT play_by_play_server_fk FOREIGN KEY (server_id)
    REFERENCES tennis_tournaments.players(id)
    ON DELETE CASCADE,
  CONSTRAINT play_by_play_receiver_fk FOREIGN KEY (receiver_id)
    REFERENCES tennis_tournaments.players(id)
    ON DELETE CASCADE
);

CREATE INDEX play_by_play_game_idx ON tennis_tournaments.play_by_play (game_id);