import express from 'express';
import { emojiRouter } from './routers';

const app = express();

app.use(express.json());
app.use('/api', emojiRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
