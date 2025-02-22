import  { RoomsDto } from "./rooms.dto";
import { PartialType } from "@nestjs/mapped-types";

export class updateDemoDto extends PartialType(RoomsDto) {};