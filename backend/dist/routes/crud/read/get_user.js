var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Router } from "express";
import User from "../../../models/user.js";
const router = Router();
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.query.username;
    try {
        let user = yield User.findOne({ username: username }).exec();
        if (!user) {
            return res.status(400).json({ msg: "User does not exist." });
        }
        return res.status(200).json({
            msg: `User ${user.username} found successfully!`,
            user: user
        });
    }
    catch (error) {
        return res.status(400).send(error);
    }
}));
export default router;
