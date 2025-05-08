import TextCorousel from "./TextCorousel";

function textCorouselItemGenerator() {
  const helloLanguages = [
    "Hello", // English
    "สวัสดี", // Thai
    "Hola", // Spanish
    "Bonjour", // French
    "你好", // Chinese (Mandarin)
    "नमस्ते", // Hindi
    "Привет", // Russian
    "こんにちは", // Japanese
    "안녕하세요", // Korean
    "Merhaba", // Turkish
  ];
  const fontFamily = [
    '"Georgia", "Times New Roman", "Palatino", "Arial Unicode MS", "Noto Serif JP", "Noto Serif SC", "Noto Serif TC", "Noto Serif Thai", serif',
    '"Arial", "Helvetica", "Open Sans", "Segoe UI", "Roboto", "Noto Sans JP", "Noto Sans SC", "Noto Sans TC", "Noto Sans Thai", sans-serif',
    '"Consolas", "Courier New", "Fira Code", "Menlo", "Monaco", "Lucida Console", "Arial Unicode MS", "Noto Sans Mono", monospace',
  ];
  const randomElement = (array: string[]) => array[Math.floor(Math.random() * array.length)];
  let props = {
    style: {
      fontFamily: randomElement(fontFamily),
      fontSize: "3em",
      fontWeight: "bold",
    },
  }
  return { children: randomElement(helloLanguages), props, width: 0 };
}

export default function TextCorouselBackground() {
  return (
    <div className="text-corousel-background">
      <TextCorousel itemGenerator={textCorouselItemGenerator} gap={5} />
    </div>
  );
}
