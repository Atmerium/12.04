import { IsNotEmpty, IsString } from "class-validator";

export class CreateTeamDto {
  @IsNotEmpty()
  @IsString()
  country: string;
}
