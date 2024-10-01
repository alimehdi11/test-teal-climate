import express from "express";
import {
  // getBusinessUnitsByUserId,
  getBusinessUnitsActivitiesByUserId,
  updateUserbyId,
  getUserbyId,
} from "../controllers/users.controllers.js";

import { isUserExists } from "../middlewares/users.middlewares.js";

const usersRouter = express.Router();

// // Get user's businessUnits for given userId
// usersRouter.get(
//   "/:userId/businessUnits",
//   isUserExists,
//   getBusinessUnitsByUserId
// );

/**
 * @route GET /users/:userId/businessUnitsActivities
 * @desc Get user's business unit activities
 * @param {string} userId - The ID of the user
 * @query {string} [order=DESC] - The order of the results, either 'DESC' or 'ASC'
 * @query {number} [limit] - The maximum number of results to return
 * @query {string} [orderBy=CO2e] - The column to order the results by
 * @returns {Array} - An array of business unit activities for the given user
 *
 * This endpoint retrieves business unit activities for a specified user.
 * - You can specify the `order` of the results (default is descending 'DESC').
 * - You can limit the number of results by providing a `limit` value.
 * - You can order the results by a specific column using `orderBy` (default is 'CO2e').
 *
 * Example:
 * GET /users/123/businessUnitsActivities?order=ASC&limit=10&orderBy=CO2e
 */

// Get user's businessUnitsActivities for given userId or getTop10EmissionsByUserId
usersRouter.get(
  "/:userId/businessUnitsActivities",
  isUserExists,
  getBusinessUnitsActivitiesByUserId
);

// Update user by id
usersRouter.put("/:id", updateUserbyId);

// Get user by id
usersRouter.get("/:id", getUserbyId);

export { usersRouter };
