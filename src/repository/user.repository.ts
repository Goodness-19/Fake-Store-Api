import db from "../config/mySql";

class UserRepository {
  async create(data: any) {
    const { username, email, password } = data;

    const [result]: any = await db.query(
      "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
      [username, email, password],
    );

    return {
      id: result.insertId,
      username,
      email,
    };
  }

  async findAll() {
    const [rows]: any = await db.query("SELECT id, username, email FROM users");
    return rows;
  }

  async findById(id: string) {
    const [rows]: any = await db.query(
      "SELECT id, username, email FROM users WHERE id = ?",
      [id],
    );
    return rows[0];
  }

  async findByEmail(email: string) {
    const [rows]: any = await db.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    return rows[0];
  }

  async update(id: string, data: any) {
    const { username, email } = data;

    await db.query("UPDATE users SET username = ?, email = ? WHERE id = ?", [
      username,
      email,
      id,
    ]);

    const [rows]: any = await db.query(
      "SELECT id, username, email FROM users WHERE id = ?",
      [id],
    );

    return rows[0];
  }

  async delete(id: string) {
    const [result]: any = await db.query("DELETE FROM users WHERE id = ?", [
      id,
    ]);

    return result;
  }
}

export default UserRepository;