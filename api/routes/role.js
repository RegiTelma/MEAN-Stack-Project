import express from 'express';
import { createRole, getAllRoles, updateRole, deleteRole } from '../controllers/role.controller.js';
import { verifyAdmin } from '../utils/verifyToken.js';

const router=express.Router();

//Create a role in the database
router.post("/create",verifyAdmin, createRole);

//Update role in the database
router.put("/update/:id",verifyAdmin, updateRole); 

//Get all roles from the database
router.get("/getAll", getAllRoles);

//Delete a role from the database
router.delete("/deleteRole/:id", deleteRole);
 
export default router;