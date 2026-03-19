app.use("/api/ships", require("./modules/ship/ship.routes"));
app.use("/api/cargo", require("./modules/cargo/cargo.routes"));
app.use("/api/docks", require("./modules/dock/dock.routes"));
app.use("/api/containers", require("./modules/container/container.routes"));