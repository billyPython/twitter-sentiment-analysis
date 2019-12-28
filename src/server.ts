import app from "./app";
import cron from "node-cron";
import { get } from 'http';

function fetchTest() {
    console.log('Cron scheduled message!');
}
cron.schedule("*/5 * * * * *", function() {
    fetchTest();
});

app.listen(3000, () => console.log(`Listening on port ${3000}`));
