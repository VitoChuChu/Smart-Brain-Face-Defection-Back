import Clarifai from "clarifai";

const app = new Clarifai.App({
  apiKey: "d77fc9bda81541c09320abae4ae108a4",
});
const handleAPICall = (req, res) => {
  app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => res.status(400).json(err));
};

const handleImage = (req, res, db) => {
  const { id, counts } = req.body;
  db.from("users")
    .where("id", "=", id)
    .increment("entries", counts)
    .returning("entries")
    .then((entries) => res.json(entries[0].entries))
    .catch((err) => res.status(400).json(err));
};
export { handleImage, handleAPICall };
