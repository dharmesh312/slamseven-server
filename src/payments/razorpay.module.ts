import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RazorpayOrder } from './razorpay-orders.entity';
import { RazorpayController } from './razorpay.controller';
import { RazorpayService } from './razorpay.service';

@Module({
  imports: [TypeOrmModule.forFeature([RazorpayOrder]), ConfigModule],
  providers: [RazorpayService],
  controllers: [RazorpayController],
  exports: [TypeOrmModule],
})
export class RazorpayModule {}