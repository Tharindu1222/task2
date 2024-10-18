// create-ad.dto.ts
import { IsNotEmpty, IsNumber, IsString, IsOptional } from 'class-validator';

export class CreateAdDto {
  @IsNotEmpty()
  @IsString()
  vehicleMake: string;

  @IsNotEmpty()
  @IsString()
  vehicleModel: string;

  @IsNotEmpty()
  @IsString()
  bodyType: string;

  @IsNotEmpty()
  @IsString()
  vehicleRegistrationNumber: string;

  @IsNotEmpty()
  @IsNumber()
  millage: number;

  @IsNotEmpty()
  @IsNumber()
  engineCC: number;

  @IsNotEmpty()
  @IsString()
  fuelType: string;

  @IsNotEmpty()
  @IsNumber()
  yearOfManufactured: number;

  @IsNotEmpty()
  @IsString()
  district: string;

  @IsOptional()
  @IsString()
  vehicleGrade?: string;

  @IsOptional()
  @IsString()
  exteriorColor?: string;

  @IsOptional()
  @IsString()
  interiorColor?: string;

  @IsOptional()
  @IsNumber()
  numberOfOwners?: number;

  @IsOptional()
  @IsString()
  images?: string;  // Expecting a comma-separated string for images

  @IsOptional()
  @IsNumber()
  askingPrice?: number;
}
