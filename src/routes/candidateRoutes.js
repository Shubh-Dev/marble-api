import express from 'express';
import { getCandidateByIdController, getAllCandidatesController, createCandidateController  } from '../controllers/candidateController.js';


const candidateRoutes = express.Router();

candidateRoutes.get('/:id', getCandidateByIdController);
candidateRoutes.get('/', getAllCandidatesController);
candidateRoutes.post('/', createCandidateController);

export default candidateRoutes;