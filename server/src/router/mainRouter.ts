import {Router} from "express"
import { userRouter } from "./userRouter";
import { expenseRouter } from "./expenseRouter";

export const mainRouter = Router()

mainRouter.use('/user',userRouter);
mainRouter.use('/expense', expenseRouter);

