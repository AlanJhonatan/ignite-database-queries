import { getRepository, Repository } from 'typeorm';

import { User } from '../../../users/entities/User';
import { Game } from '../../entities/Game';

import { IGamesRepository } from '../IGamesRepository';

export class GamesRepository implements IGamesRepository {
  private repository: Repository<Game>;

  constructor() {
    this.repository = getRepository(Game);
  }

  async findByTitleContaining(param: string): Promise<Game[]> {
    // Complete usando query builder
    return this.repository
      .createQueryBuilder()
      .where('LOWER(title) like LOWER(:title)', { title: `%${param}%` })
      .getMany()
  }

  async countAllGames(): Promise<[{ count: string }]> {
    return this.repository.query("select count(*) from games;"); // Complete usando raw query
  }

  async findUsersByGameId(id: string): Promise<User[]> {
    // Complete usando query builder
    return this.repository
      .createQueryBuilder()
      .select('users')
      .from(User, 'users')
      .innerJoinAndSelect('users.games', 'game', 'game.id = :id', { id })
      .getMany()
  }
}
