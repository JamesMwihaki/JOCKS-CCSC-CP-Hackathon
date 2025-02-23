import  { BuildingsDto } from "./buildings.dto";
import { PartialType } from "@nestjs/mapped-types";

export class updateBuildingsDto extends PartialType(BuildingsDto) {};