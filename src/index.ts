import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import path from 'path';

// https://github.com/Automattic/mongoose/issues/4587
const url = process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/bookstore?authSource=admin';
const mongoosePromise = mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  user: 'bookstore',
  pass: 'bookstore',
});
mongoosePromise
  .catch(reason => console.error('Oops:', reason))
  // .then(value => console.log('OK:', value))
  .finally(() => console.log("Ready."))
;

const app = express();
const port: string = process.env.PORT || '8080';

const schema: any = { name: String };
const Cat = mongoose.model('Cat', schema);

app.get('/**', (req: Request, res: Response) => {
  const kitty = new Cat({ name: 'Mew-mew' });
  kitty
    .save()
    .then(kitty => res.json({ kitty }));
});

app.listen(Number.parseInt(port), (args: any) => {
  console.log(`server listening ${port} port with ${args} args...`);
});
