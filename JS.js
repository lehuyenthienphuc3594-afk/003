// Load Live2D model March 7th
const app = new PIXI.Application({
  view: document.getElementById("live2d"),
  transparent: true,
});
PIXI.live2d.Live2DModel.from("March7th/March7th.model3.json").then(model => {
  model.scale.set(0.3);
  model.x = 100;
  model.y = 400;
  app.stage.addChild(model);
});

// Chatbot logic
async function ask() {
  const q = document.getElementById("input").value.trim();
  if (!q) return;

  document.getElementById("chat").innerHTML += "<b>You:</b> " + q + "<br>";

  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ q })
    });

    const data = await response.json();

    if (response.ok) {
      const ans = data.answer;
      document.getElementById("chat").innerHTML += "<b>March 7th:</b> " + ans + "<br>";
    } else {
      document.getElementById("chat").innerHTML += "<b>March 7th:</b> [Error] " + JSON.stringify(data) + "<br>";
    }
  } catch (err) {
    document.getElementById("chat").innerHTML += "<b>March 7th:</b> [Exception] " + err.message + "<br>";
  }

  document.getElementById("input").value = "";
}
