import { App } from './app';

const app = App();

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.info(`Server listening at port=${PORT}`);
});