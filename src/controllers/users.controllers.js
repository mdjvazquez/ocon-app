import { pool } from "../db.js";
import { table } from "../routes/users.routes.js";

export const getAll = async (req, res) => {
  const response = await pool.query(`SELECT * FROM ${table} ORDER BY id ASC`);
  res.status(200).json(response.rows);
};

export const getById = async (req, res) => {
  const { id } = req.params;
  const { rows } = await pool.query(`SELECT * FROM ${table} WHERE id = $1`, [
    id,
  ]);

  if (rows.length === 0) {
    return res.status(404).json({ message: "Ticket not found" });
  }

  res.json(rows[0]);
};

export const createOne = async (req, res) => {
  try {
    const {
      name,
      middle_name,
      last_name,
      email,
      email_verified,
      password,
      phone_number,
      company,
    } = req.body;
    const { rows } = await pool.query(
      `INSERT INTO ${table} (name,
      middle_name,
      last_name,
      email,
      email_verified,
      password,
      phone_number,
      company) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
      [
        name,
        middle_name,
        last_name,
        email,
        email_verified,
        password,
        phone_number,
        company,
      ]
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
  const {
    name,
    middle_name,
    last_name,
    email,
    email_verified,
    password,
    phone_number,
    company,
  } = req.body;
  const { rows } = await pool.query(
    `UPDATE ${table} SET name = $1, middle_name = $2, last_name = $3, email = $4, email_verified = $5, password = $6, phone_number = $7, company = $8  WHERE id = $9 RETURNING *`,
    [
      name,
      middle_name,
      last_name,
      email,
      email_verified,
      password,
      phone_number,
      company,
      id,
    ]
  );

  return res.json(rows[0]);
};
