const app = require('./app');

const port = process.env.PORT || 8081;

app.listen(port, () => {
    console.log(`App Listening on http://localhost:${port}`)
})