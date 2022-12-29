const socket = io();

socket.emit("showMessages", true);

const newProduct = () => {
  const title = document.getElementById("title").value;
  const price = document.getElementById("price").value;
  const thumbnail = document.getElementById("thumbnail").value;
  socket.emit("product", { title: title, price: price, thumbnail: thumbnail });
};

socket.on("msg-list", (data) => {
  console.log(data);
  let html = "";
  data.forEach((obj) => {
    html += `
    <div>
      <p><b style="color:blue;">${obj.author["id"]}</b> <b style="color:red;">[:]</b> <i style="color:green;">${obj.text}</i></p>
    </div>
    `;
  });
  document.getElementById("div-list-msgs").innerHTML = html;
});

const enviarMsg = () => {
  const nombre = document.getElementById("input-nombre").value;
  const apellido = document.getElementById("input-apellido").value;
  const edad = document.getElementById("input-edad").value;
  const alias = document.getElementById("input-alias").value;
  const msgParaEnvio = document.getElementById("input-msg").value;
  const email = document.getElementById("input-email").value;

  socket.emit("msg", {
    email: email,
    mensaje: msgParaEnvio,
    nombre: nombre,
    apellido: apellido,
    edad: edad,
    alias: alias,
  });
};

enviarMsg();
