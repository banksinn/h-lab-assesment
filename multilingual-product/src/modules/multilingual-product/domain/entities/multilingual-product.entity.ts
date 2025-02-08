import { Language } from '@/modules/language/domain/entities/language.entity';
import { Product } from '@/modules/product/domain/entities/product.entity';
import { Entity, ManyToOne, PrimaryColumn, Relation } from 'typeorm';

@Entity()
export class MultilingualProduct {
  @PrimaryColumn()
  languageId: number;

  @PrimaryColumn()
  productId: number;

  @ManyToOne(() => Language, (Language) => Language.multilingualProducts, {
    onDelete: 'CASCADE',
  })
  language: Relation<Language>;

  @ManyToOne(() => Product, (Product) => Product.multilingualProducts, {
    onDelete: 'CASCADE',
  })
  product: Relation<Product>;
}
