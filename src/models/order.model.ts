import db from "../config/mySql";

class OrderModel {
  async createOrder(userId: number, totalAmount: number) {
    const [result]: any = await db.query(
      `INSERT INTO orders (user_id, total_amount, status)
       VALUES (?, ?, ?)`,
      [userId, totalAmount, "pending"],
    );

    return result.insertId;
  }

  async createOrderItem(
    orderId: number,
    productId: string,
    quantity: number,
    price: number,
  ) {
    await db.query(
      `INSERT INTO order_items (order_id, product_id, quantity, price)
       VALUES (?, ?, ?, ?)`,
      [orderId, productId, quantity, price],
    );
  }

  async getOrdersByUser(userId: number) {
    const [rows]: any = await db.query(
      `SELECT * FROM orders WHERE user_id = ?`,
      [userId],
    );

    return rows;
  }

  async getOrderItems(orderId: number) {
    const [rows]: any = await db.query(
      `SELECT * FROM order_items WHERE order_id = ?`,
      [orderId],
    );

    return rows;
  }
}

export default OrderModel;