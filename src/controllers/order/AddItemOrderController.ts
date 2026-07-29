import { Request, Response } from "express";
import { AddItemOrderService } from "../../services/order/AddItemOrderService";

class AddItemOrderController {
  async handle(req: Request, res: Response) {
    const { amount, order_id, product_id } = req.body;

    const addItem = new AddItemOrderService();

    const newItem = await addItem.execute({
      amount,
      order_id,
      product_id,
    });

    return res.status(201).json(newItem);
  }
}

export { AddItemOrderController };
