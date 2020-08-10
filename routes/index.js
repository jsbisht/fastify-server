export default async function (app) {
  app.get("/", async function (req, reply) {
    return { hello: "world" };
  });
}
