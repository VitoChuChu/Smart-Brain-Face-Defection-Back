const handleRegister = (req, res, bcrypt, db) => {
  const { email, password, name } = req.body;
  if (!email || !password || !name) {
    return res.status(400).json("Please enter the correct form submission");
  } else {
    const hash = bcrypt.hashSync(password, 10);
    db.transaction((trx) => {
      trx
        .insert({
          hash: hash,
          email: email,
        })
        .into("login")
        .returning("email")
        .then((loginEmail) => {
          return trx("users")
            .returning("*")
            .insert({
              email: loginEmail[0].email,
              name: name,
              joined: new Date(),
            })
            .then((user) => {
              res.json(user[0]);
            });
        })
        .then(trx.commit)
        .catch(trx.rollback);
    }).catch((err) => res.status(400).json(err));
  }
};

export default handleRegister;
