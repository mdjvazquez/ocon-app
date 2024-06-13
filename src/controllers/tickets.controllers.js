import { pool } from "../db.js";
import { table } from "../routes/tickets.routes.js";

export const getAll = async (req, res) => {
  const response = await pool.query(`SELECT * FROM ${table} ORDER BY id ASC`);
  res.status(200).json(response.rows);

};

export const getById = async (req, res) => {
  const { id } = req.params;
  const { rows, params } = await pool.query(
    `SELECT * FROM ${table} WHERE id = $1`,
    [id]
  );

  if (rows.length === 0) {
    return res.status(404).json({ message: "Ticket not found" });
  }

  res.json(rows[0]);
};

export const createOne = async (req, res) => {
  try {
    const { title, content, created_of, complete } = req.body;
    const { rows } = await pool.query(
      `INSERT INTO ${table} (title, content, created_of, complete) VALUES ($1, $2, $3, $4) RETURNING *`,
      [title, content, created_of, complete]
    );

    res.status(201).json(rows[0]);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const deleteOne = async (req, res) => {
  const { id } = req.params;
  const { rows, rowCount } = await pool.query(
    `DELETE FROM ${table} WHERE id = $1 RETURNING *`,
    [id]
  );

  if (rowCount === 0) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json(rows[0]);
};

export const updateOne = async (req, res) => {
  const id = parseInt(req.params.id);
  const { title, content, created_of, complete } = req.body;
  const { rows } = await pool.query(
    `UPDATE ${table} SET title = $1, content = $2, created_of = $3, complete = $4 WHERE id = $5 RETURNING *`,
    [title, content, created_of, complete, id]
  );

  return res.json(rows[0]);
};
