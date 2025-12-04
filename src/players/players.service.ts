import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class PlayersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createPlayerDto: CreatePlayerDto) {
    if (createPlayerDto.teamId) {
      const team = await this.prisma.team.findUnique({
        where: { id: createPlayerDto.teamId },
      });
      if (!team) {
        throw new NotFoundException(`Team with ID ${createPlayerDto.teamId} not found.`);
      }
    }
    return this.prisma.player.create({
      data: createPlayerDto,
    });
  }

  findAll() {
    return this.prisma.player.findMany();
  }

  findOne(id: number) {
    return this.prisma.player.findUnique({ where: { id: id } });
  }

  async update(id: number, updatePlayerDto: UpdatePlayerDto) {
    if (updatePlayerDto.teamId) {
      const team = await this.prisma.team.findUnique({
        where: { id: updatePlayerDto.teamId },
      });
      if (!team) {
        throw new NotFoundException(`Team with ID ${updatePlayerDto.teamId} not found.`);
      }
    }
    return this.prisma.player.update({
      where: { id: +id },
      data: updatePlayerDto,
    });
  }

  remove(id: number) {
    return this.prisma.player.delete({ where: { id: id } });
  }
}
