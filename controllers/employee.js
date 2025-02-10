import { query } from "../Utils/connecttoDB.js";  // ✅ Correct relative path
import { createRoleQuery, createEmployeeTableQuery, getAllEmployeeQuery } from "../Utils/sqlQuery.js";  // ✅ Fixed import typo
import {createError} from "../Utils/error.js"
export async function getAllEmployee(req, res, next) {
    try {
        const response = await query("SELECT to_regclass('employee_details');");  // ✅ Fix query syntax
        console.log(response);

        // Check if the table exists safely
        if (!response.rows.length || !response.rows[0].to_regclass) { 
            console.log("Table does not exist. Creating table...");
            await query(createRoleQuery);  // Create ENUM type first if needed
            await query(createEmployeeTableQuery);  // Create employee table
        }

        // Fetch all employees
        const { rows } = await query(getAllEmployeeQuery);
        res.status(200).json(rows);
    } catch (error) {
        console.error("Error in getAllEmployee:", error);  // ✅ Proper error logging
        res.status(500).json({ error: error.message });  // ✅ Send error response
        return next(createError(400,"Couldn't get employee details!"));
    }
}

export async function getEmployee(req, res, next) {}
export async function deleteEmployee(req, res, next) {}
export async function updateEmployee(req, res, next) {}
export async function createEmployee(req, res, next) {}
