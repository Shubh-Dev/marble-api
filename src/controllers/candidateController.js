import { getCandidateById, getAllCandidates, createCandidate } from "../models/candidateModel.js";

const getCandidateByIdController = async (req, res) => {
    const candidateId = req.params.id;
    try {
        const candidate = await getCandidateById(candidateId);
        res.json(candidate);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const getAllCandidatesController = async (req, res) => {
    try {
        const candidates = await getAllCandidates();
        res.json(candidates);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

const createCandidateController = async (req, res) => {
    const candidate = req.body;
    try {
        const newCandidate = await createCandidate(candidate);
        res.json(newCandidate);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

export { getCandidateByIdController, getAllCandidatesController, createCandidateController };