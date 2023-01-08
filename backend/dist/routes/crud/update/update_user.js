var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// @ts-nocheck
import User from "../../../models/user.js";
import { Router } from "express";
const router = Router();
router.put("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { old_username, username, weight, height, BMI, age, firstName, lastName } = req.body;
        const old_user = yield User.findOne({
            username: old_username
        });
        if (!old_user) {
            return res.status(400).json({
                msg: "User does not exist"
            });
        }
        const user = yield User.findOne({
            username: username
        });
        if (old_username !== username) {
            old_user.username = username;
            old_user.weight = weight;
            old_user.height = height;
            old_user.BMI = BMI;
            old_user.age = age;
            old_user.firstName = firstName;
            old_user.lastName = lastName;
            old_user.save();
            old_user.workouts.forEach((workout) => __awaiter(void 0, void 0, void 0, function* () {
                workout.username = username;
                workout.machines.forEach((machine) => __awaiter(void 0, void 0, void 0, function* () {
                    machine.username = username;
                    yield machine.save();
                }));
                workout.save();
            }));
            old_user.savedWorkouts.forEach((workout) => __awaiter(void 0, void 0, void 0, function* () {
                workout.username = username;
                workout.machines.forEach((machine) => __awaiter(void 0, void 0, void 0, function* () {
                    machine.username = username;
                    yield machine.save();
                }));
                workout.save();
            }));
            return res.status(200).send({
                msg: "New Username Appled.",
                user: old_user
            });
        }
        else {
            if (!user) {
                return res.status(400).json({
                    msg: "User does not exist"
                });
            }
            user.weight = weight;
            user.height = height;
            user.BMI = BMI;
            user.age = age;
            user.firstName = firstName;
            user.lastName = lastName;
            yield user.save();
            return res.status(200).send({
                msg: "User profile updated.",
                user: user
            });
        }
    }
    catch (error) {
        res.send(error);
    }
}));
export default router;
