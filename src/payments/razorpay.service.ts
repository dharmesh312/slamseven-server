import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { RazorpayOrder } from './razorpay-orders.entity';
import * as Razorpay from 'razorpay';
import { ConfigService } from '@nestjs/config';
import * as crypto from 'crypto';
// var { validatePaymentVerification } = require('./dist/utils/razorpay-utils');


@Injectable()
export class RazorpayService {
  razorpayClient: any;
  constructor(
    @InjectRepository(RazorpayOrder)
    private repository: Repository<RazorpayOrder>,
    private configService: ConfigService,
  ) {
        this.razorpayClient = new Razorpay({ key_id: this.configService.get('RAZORPAY_KEY'), key_secret: this.configService.get('RAZORPAY_SECRET') })
  }

  async createRazorpayOrder(options): Promise<any> {
    let razorpayorder;
    try {
        razorpayorder = await this.razorpayClient.orders.create(options)
    } catch (error) {
        console.log(error)
    }
    return razorpayorder
  }

  async saveOrder(payload): Promise<RazorpayOrder> {
    return this.repository.save(payload)
  }

  async getOrder(orderId): Promise<RazorpayOrder> {
    return this.repository.findOne({ where: { orderId } })
  }

  async getAll(): Promise<RazorpayOrder[]> {
    return this.repository.find();
  }

  async verifySignature({ orderId, paymentId, signature, razorpayOrderId }): Promise<any> {
    const secret = this.configService.get('RAZORPAY_SECRET')
    const hmac = crypto.createHmac('sha256', secret);
    hmac.update(orderId + "|" + paymentId);
    const generated_signature = hmac.digest('hex');
    if(signature===generated_signature){
       return this.repository.update({ orderId }, { razorpayPaymentId: paymentId, razorpayOrderId, razorpayPaymentSignature: signature })
    } else {
        return null;
    }

  }

}