import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Ad {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'vehicle_make' })
  vehicleMake: string;

  @Column({ name: 'vehicle_model' })
  vehicleModel: string;

  @Column({ name: 'body_type' })
  bodyType: string;

  @Column({ name: 'vehicle_registration_number' })
  vehicleRegistrationNumber: string;

  @Column({ name: 'millage', type: 'int' })
  millage: number;

  @Column({ name: 'engine_cc', type: 'int' })
  engineCC: number;

  @Column({ name: 'fuel_type' })
  fuelType: string;

  @Column({ name: 'year_of_manufactured', type: 'int' })
  yearOfManufactured: number;

  @Column()
  district: string;

  @Column({ name: 'vehicle_grade', nullable: true })
  vehicleGrade?: string;

  @Column({ name: 'exterior_color', nullable: true })
  exteriorColor?: string;

  @Column({ name: 'interior_color', nullable: true })
  interiorColor?: string;

  @Column({ name: 'number_of_owners', type: 'int', nullable: true })
  numberOfOwners?: number;

  @Column({ name: 'asking_price', type: 'decimal', precision: 10, scale: 2 })
  askingPrice: number;

  @Column('text', { nullable: true }) // Store image URLs as a JSON string or comma-separated string
  images?: string; // Change this to string instead of string[]
}
