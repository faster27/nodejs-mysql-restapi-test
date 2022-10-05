import { pool } from "../db.js";

export const getEmployees = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM employee");
    res.status(200).json(rows);
  } catch (error) {
    return res.status(500).json({
      message: "Something was wrong",
    });
  }
};

export const getEmployee = async (req, res) => {
  try {
    const id = req.params.id;
    const [rows] = await pool.query("SELECT * FROM employee where id = ?", [
      id,
    ]);

    if (rows.length <= 0) {
      return res.status(404).json({
        message: "Employee not found",
      });
    }
    res.status(200).json(rows[0]);
  } catch (error) {
    return res.status(500).json({
      message: "Something was wrong",
    });
  }
};

export const createEmployee = async (req, res) => {
  try {
    const { name, salary } = req.body;
    const [rows] = await pool.query(
      "INSERT INTO employee (name,salary) VALUES (?,?)",
      [name, salary]
    );

    res.status(200).send({
      id: rows.insertId,
      name,
      salary,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something was wrong",
    });
  }
};

export const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, salary } = req.body;

    const [result] = await pool.query(
      "UPDATE employee SET name = IFNULL(?,name), salary = IFNULL(?,salary) WHERE id = ?",
      [name, salary, id]
    );

    if (result.affectedRows <= 0) {
      return res.status(404).json({
        message: "employee not found",
      });
    }

    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({
      message: "Something was wrong",
    });
  }
};

export const deleteEmployee = async (req, res) => {
  try {
    const id = req.params.id;
    const [result] = await pool.query("DELETE FROM employee WHERE id = ?", [
      id,
    ]);

    if (result.affectedRows <= 0) {
      return res.status(404).json({
        message: "employee not found",
      });
    }

    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({
      message: "Something was wrong",
    });
  }
};
