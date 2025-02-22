import  { DemoDto } from "./demo.dto";
import { PartialType } from "@nestjs/mapped-types";

export class updateDemoDto extends PartialType(DemoDto) {};