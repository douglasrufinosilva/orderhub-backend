import { Request, Response } from "express";
import { DetailUserService } from "../../services/user/DetaiUserService";

class DetailUserController {
  async handle(req: Request, res: Response) {

    const user_id = req.user_id

    const detailUser = new DetailUserService()

    const user = await detailUser.execute(user_id)

    res.status(200).json(user)
  }
}

export { DetailUserController }