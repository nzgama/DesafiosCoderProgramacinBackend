function getRoot(req, res) {
  res.render("./layouts/login.hbs", {});
}

function getLogin(req, res) {
  res.render("./layouts/login.hbs");
}

function getSignup(req, res) {
  res.render("./layouts/signup.hbs");
}

function postLogin(req, res) {
  const { username } = req.user;
  req.session.user = username;
  req.session.admin = true;
  res.render("./layouts/hello.hbs", { username: req.session.user });
}

function postSignup(req, res) {
  res.render("./layouts/login.hbs", { message: "success in registering" });
}

function getLogout(req, res) {
  const oldUser = req.session.user;
  req.logout();
  req.session.destroy((err) => {
    if (err) {
      res.send("no pudo deslogear");
    } else {
      res.render("./layouts/bye.hbs", { username: oldUser });
    }
  });
}

function getFaillogin(req, res) {
  res.render("./layouts/login-error");
}

function failRoute(req, res) {
  res.status(404).render("routing-error", {});
}

module.exports = {
  getRoot,
  getLogin,
  getSignup,
  postLogin,
  getFaillogin,
  postSignup,
  getLogout,
  failRoute,
};
