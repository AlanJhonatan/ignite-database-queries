import {
  Connection, createConnection, getRepository, Repository,
} from 'typeorm';

import { User } from './modules/users/entities/User';
import { Game } from './modules/games/entities/Game';

import { UsersRepository } from './modules/users/repositories/implementations/UsersRepository';
import { GamesRepository } from './modules/games/repositories/implementations/GamesRepository';

let connection: Connection;

let ormUsersRepository: Repository<User>;
let ormGamesRepository: Repository<Game>;

let usersRepository: UsersRepository;
let gamesRepository: GamesRepository;


(async () => {
  connection = await createConnection();

  ormUsersRepository = getRepository(User);
  ormGamesRepository = getRepository(Game);

  usersRepository = new UsersRepository();
  gamesRepository = new GamesRepository();

  const game = await ormGamesRepository.findOneOrFail({
    where: {
      title: 'Rocket League',
    },
  });

  const users = await gamesRepository.findUsersByGameId(game.id);

  console.log(game, users);

  connection.close();
})()