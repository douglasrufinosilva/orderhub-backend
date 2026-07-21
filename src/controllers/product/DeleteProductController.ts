import { Request, Response } from "express";
import { DeleteProductServide } from "../../services/product/DeleteProductServide";

class DeleteProductController {
  async handle(req: Request, res: Response) {
    const product_id = req.query?.product_id as string;

    const deleteProduct = new DeleteProductServide();

    const product = await deleteProduct.execute({ product_id: product_id });

    res.status(200).json(product);
  }
}

export { DeleteProductController };
