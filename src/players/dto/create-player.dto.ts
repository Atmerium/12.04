import { IsDateString, IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreatePlayerDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsInt()
  goalCount: number

  @IsNotEmpty()
  @IsDateString()
  birthDate: string;

  @IsNotEmpty()
  @IsInt()
  teamId: number;
}
