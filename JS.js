// ========== Load March 7th Model ==========
const app = new PIXI.Application({
  view: document.getElementById("live2d"),
  autoStart: true,
  backgroundColor: 0x222222, // nền xám để dễ nhìn
  resizeTo: window
});

// Tải model Live2D
PIXI.live2d.Live2DModel.from("March7/march7.model3.json").then(model => {
  model.scale.set(0.3);   // chỉnh kích thước
  model.x = 100;          // vị trí ngang
  model.y = 400;          // vị trí dọc
  app.stage.addChild(model);

  console.log("✅ March7 loaded thành công!");
}).catch(err => {
  console.error("❌ Lỗi khi load model:", err);
});

// ========== Chatbox + GPT Proxy ==========
async function ask() {
  const inputBox = document.getElementById("input");
  const chatBox = document.getElementById("chat");
  const q = inputBox.value.trim();

  if (!q) return;

  // Hiện câu hỏi người dùng
  chatBox.innerHTML += `<b>You:</b> ${q}<br>`;

  try {
    // Gọi GPT qua proxy server (thay URL này = URL Vercel của bạn)
    const response = await fetch("https://im-snowy.vercel.app/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ q })
    });

    if (!response.ok) {
      throw new Error("HTTP error! Status: " + response.status);
    }

    const data = await response.json();

    // Lấy câu trả lời từ GPT
    const ans = data.choices?.[0]?.message?.content || "⚠️ Không có phản hồi từ GPT";

    chatBox.innerHTML += `<b>March 7th:</b> ${ans}<br>`;
  } catch (err) {
    console.error("❌ Error:", err);
    chatBox.innerHTML += `<b>March 7th:</b> ⚠️ Lỗi khi gọi API<br>`;
  }

  // Reset ô nhập + cuộn xuống
  inputBox.value = "";
  chatBox.scrollTop = chatBox.scrollHeight;
}
