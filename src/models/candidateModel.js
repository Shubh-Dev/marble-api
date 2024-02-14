import db from "../config/database.js";
import { Dropbox } from "dropbox";

const accessToken = process.env.DROPBOX_ACCESS_TOKEN;

const dbx = new Dropbox({ accessToken, fetch });

const insertIntoDropbox = async (file) => {
  try {
    const response = await dbx.filesUpload({
      path: `/${file.originalname}`,
      contents: file.buffer,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

const getCandidateById = async (candidateID) => {
  try {
    return await db.oneOrNone("SELECT * FROM candidates WHERE id = $1", [
      candidateID,
    ]);
  } catch (err) {
    throw err;
  }
};

const getAllCandidates = async () => {
  try {
    return await db.manyOrNone("SELECT * FROM candidates");
  } catch (err) {
    throw err;
  }
};

const createCandidate = async (candidate) => {
  if (candidate.resume) {
    const file = candidate.resume;
    try {
      const response = await insertIntoDropbox(file);
      candidate.resume = response.result.path_display;
    } catch (error) {
      throw error;
    }
  }

  try {
    return await db.one(
      "INSERT INTO candidates (name, email, phone_no, years_of_experience, skills, current_salary, github_link, linkedin_link, resume, notes ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *",
      [
        candidate.name,
        candidate.email,
        candidate.phone_no,
        candidate.years_of_experience,
        candidate.skills,
        candidate.current_salary,
        candidate.github_link,
        candidate.linkedin_link,
        candidate.resume,
        candidate.notes,
      ]
    );
  } catch (err) {
    throw err;
  }
};

export { getCandidateById, getAllCandidates, createCandidate };
