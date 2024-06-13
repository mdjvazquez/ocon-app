import { pool } from "../db.js";
import { table } from "../routes/companies.routes.js";

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
    return res.status(404).json({ message: "Company not found" });
  }

  res.json(rows[0]);
};

export const createOne = async (req, res) => {
  try {
    const {
      name,
      street,
      ext_num,
      int_num,
      colony,
      rfc,
      phone_number,
      active,
    } = req.body;
    const { rows } = await pool.query(
      `INSERT INTO ${table} (
      name,
      street,
      ext_num,
      int_num,
      colony,
      rfc,
      phone_number,
      active) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
      [name, street, ext_num, int_num, colony, rfc, phone_number, active]
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
    return res.status(404).json({ message: "Company not found" });
  }

  res.json(rows[0]);
};

export const updateOne = async (req, res) => {
  const id = parseInt(req.params.id);
  const { name, street, ext_num, int_num, colony, rfc, phone_number, active } =
    req.body;
  const { rows } = await pool.query(
    `UPDATE ${table} SET name = $1, street = $2, ext_num = $3, int_num = $4, colony = $5, rfc = $6, phone_number = $7, active = $8  WHERE id = $9 RETURNING *`,
    [name, street, ext_num, int_num, colony, rfc, phone_number, active, id]
  );

  return res.json(rows[0]);
};
