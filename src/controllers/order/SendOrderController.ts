import { Request, Response } from "express";
import { SendOrderSevice } from "../../services/order/SendOrderService";

class SendOrderController {
  async handle(req: Request, res: Response) {
    const { name, order_id } = req.body;

    const sendOrder = new SendOrderSevice();

    const order = await sendOrder.execute({ name, order_id });

    return res.status(200).json(order);
  }
}

export { SendOrderController };
