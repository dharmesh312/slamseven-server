import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Selection } from './selections.entity';
import { SelectionsService } from './selections.service';

@Module({
  imports: [TypeOrmModule.forFeature([Selection])],
  providers: [SelectionsService],
  exports: [TypeOrmModule],
})
export class SelectionsModule {}