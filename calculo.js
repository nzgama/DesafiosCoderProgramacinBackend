process.on("message", (cant) => {
  let arr = [];
  for (let i = 0; i < cant; i++) {
    arr.push(Math.floor(Math.random() * 1000));
  }
  process.send({ type: "arr", data: arr });
});
