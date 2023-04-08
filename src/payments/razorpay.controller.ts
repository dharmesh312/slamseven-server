import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Req, Res, ValidationPipe } from '@nestjs/common';
import { Role, RoleEnum } from 'src/auth/role';
import { RazorpayOrder } from './razorpay-orders.entity';
import { RazorpayService } from './razorpay.service';

export class OrderPayload {
    amount: number;
}

export class VerifySignaturePayload {
    razorpayPaymentId: string;
    razorpayOrderId: string;
    razorpaySingature: string;
    orderId: string;
}

@Controller('razorpay')
export class RazorpayController {
    constructor(
        private razorpayService: RazorpayService,
       ) { }

    @Post('order/create') 
    @Role(RoleEnum.ROLE_PLAYER)
    async createOrder(@Res() res, @Body() payload: OrderPayload, @Req() req): Promise<void> {
        const playerId = req.user.id;

        const orderPayload = {
            amount: payload.amount * 100, currency: "INR", receipt: "",
        }
        const razorpayOrder = await this.razorpayService.createRazorpayOrder(orderPayload)

        const rzporder = new RazorpayOrder();

        if(razorpayOrder) {
            rzporder.amount = razorpayOrder.amount;
            rzporder.orderId = razorpayOrder.id;
            rzporder.entity = razorpayOrder.entity;
            rzporder.amountPaid = razorpayOrder.amount_paid;
            rzporder.amountDue = razorpayOrder.amount_due;
            rzporder.currency = razorpayOrder.currency;
            rzporder.amountPaid = razorpayOrder.amount_paid;
            rzporder.status = razorpayOrder.status;
            rzporder.attempts = razorpayOrder.attempts;
            rzporder.playerId = playerId;
        } else {
            return res.status(HttpStatus.BAD_GATEWAY)
        }
        const savedOrder = await this.razorpayService.saveOrder(rzporder)

        return res.status(HttpStatus.OK).json({
            error: false,
            razorpayOrder, 
            savedOrder,
        });
    }

    @Put('payments/verify')
    @Role(RoleEnum.ROLE_PLAYER)
    async verifyPayment(@Res() res, @Body() payload: VerifySignaturePayload, @Req() req): Promise<void> {
        const playerId = req.user.id;
        const order = await this.razorpayService.getOrder(payload.orderId)
        if(!order) {
            return res.status(HttpStatus.BAD_REQUEST)
        }
        if(playerId !== order.playerId) {
            return res.status(HttpStatus.BAD_REQUEST)
        }

        const updatedOrder = await this.razorpayService.verifySignature({ 
            orderId: order.orderId, 
            razorpayOrderId: payload.razorpayOrderId,
            paymentId: payload.razorpayPaymentId, 
            signature: payload.razorpaySingature,
         })

        if(!updatedOrder) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR)
        }

        return res.status(HttpStatus.OK).json({
            error: false,
            paymentVerified: true
        });
    }

    @Get('orders')
    @Role(RoleEnum.ROLE_ADMIN)
    async getAllOrders(@Res() res): Promise<void> {
        const orders = await this.razorpayService.getAll();
        return res.status(HttpStatus.OK).json({
            error: false,
            orders
        });
    }

}