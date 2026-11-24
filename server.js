import express from 'express';
import journal from "./middlewares/journal.js";
import vehiculeRoutes from "./routes/vehicules.js";

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(journal);


app.use('/vehicules', vehiculeRoutes);

app.use((req, res) => {
  res.status(404).json({ message: 'Routes introuvables' });
});

app.listen(PORT);


