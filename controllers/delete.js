const handleDelete = (req, res, db) => {
  const { email } = req.body;
  db("login")
    .where("email", email)
    .del()
    .then(
      db("users")
        .where("email", email)
        .del()
        .then(() => {
          res.json("User deleted");
        })
    )
    .catch((err) => res.status(400).json("Delete failed."));
};
export default handleDelete;
