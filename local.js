const { createApp } = require("./src/server");
const PORT = process.env.PORT || 3000;
createApp().listen(PORT, () => console.log(`Local dev on http://localhost:${PORT}`));
