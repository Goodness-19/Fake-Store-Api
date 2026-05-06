import  express  from "express";
import productRoutes from "../src/routes/product.route"
import userRoutes from "../src/routes/user.route"
import orderRoutes from "../src/routes/order.routes"

const app = express();

app.use(express.json());

app.use("/products", productRoutes);
app.use("/users", userRoutes);
app.use("/orders", orderRoutes);

export default app;