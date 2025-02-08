import { MultilingualProduct } from '@/modules/multilingual-product/domain/entities/multilingual-product.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Relation,
} from 'typeorm';

@Entity()
export class Language {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updatedAt: Date;

  @DeleteDateColumn({
    type: 'timestamp with time zone',
    nullable: true,
    default: null,
  })
  deletedAt: Date | null;

  @Column({ type: String })
  name: string;

  @OneToMany(
    () => MultilingualProduct,
    (MultilingualProduct) => MultilingualProduct.language,
    {
      onDelete: 'CASCADE',
    },
  )
  multilingualProducts: Relation<MultilingualProduct[]>;
}
