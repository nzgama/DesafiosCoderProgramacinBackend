const Router = require("koa-router");
const router = new Router({ prefix: "/books" });

let books = [
  { id: 101, name: "Fight Club", author: "Chuck Palahniuk" },
  { id: 102, name: "Sharp Objects", author: "Gillian Flynn" },
  { id: 103, name: "Frankenstein", author: "Mary Shelley" },
  { id: 104, name: "Into The Willd", author: "Jon Krakauer" },
];

/* API REST Get All */
router.get("/", (ctx) => {
  return (ctx.body = {
    status: "success",
    message: books,
  });
});

/* API REST Get x ID */
router.get("/:id", (ctx) => {
  const foundBook = books.find((book) => book.id == ctx.params.id);

  if (foundBook) {
    return (ctx.body = foundBook);
  } else {
    ctx.response.status = 404;
    return (ctx.body = {
      status: "error!",
      message: "Book Not Found with that id!",
    });
  }
});

/* API REST Post */
router.post("/", (ctx) => {
  // Check if any of the data field not empty
  if (ctx.request.body.id && ctx.request.body.name && ctx.request.body.author) {
    books.push({
      id: ctx.request.body.id,
      name: ctx.request.body.name,
      author: ctx.request.body.author,
    });

    ctx.response.status = 201;
    return (ctx.body = {
      status: "success",
      message: `New book added with id:  ${ctx.request.body.id} & name: ${ctx.request.body.name}`,
    });
  } else {
    ctx.response.status = 400;
    return (ctx.body = {
      status: "error",
      message: "Please enter the data",
    });
  }
});

/* API REST Put */
router.put("/:id", (ctx) => {
  // Check if any of the data field not empty
  if (
    !ctx.request.body.id ||
    !ctx.request.body.name ||
    !ctx.request.body.author
  ) {
    ctx.response.status = 400;
    return (ctx.body = {
      status: "error",
      message: "Please enter the data",
    });
  } else {
    const id = ctx.params.id;
    const indexFound = books.findIndex((book) => book.id == id);
    // books.splice(index, 1, ctx.request.body);
    if (indexFound) {
      ctx.response.status = 201;
      books[indexFound] = {
        id: ctx.request.body.id,
        name: ctx.request.body.name,
        author: ctx.request.body.author,
      };
      return (ctx.body = {
        status: "success",
        message: `Book updated with id: ${ctx.request.body.id} & name: ${ctx.request.body.name}`,
      });
    } else {
      ctx.response.status = 400;
      return (ctx.body = {
        status: "error",
        message: "Please enter the valid book id",
      });
    }
  }
});

/* API REST Delete */
router.delete("/:id", (ctx) => {
  const id = ctx.params.id;
  const indexFound = books.findIndex((book) => book.id == id);
  if (indexFound) {
    books.splice(indexFound, 1);
    ctx.response.status = 200;
    return (ctx.body = {
      status: "success",
      message: `Book deleted with id: ${id}`,
    });
  } else {
    ctx.response.status = 400;
    return (ctx.body = {
      status: "error",
      message: "Please enter the valid book id",
    });
  }
});

module.exports = { books: router };
