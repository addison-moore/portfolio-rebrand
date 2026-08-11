new ClipboardJS("#myEmail");
new ClipboardJS("#clippy");

console.log(
  `%c  _    _ _____ _____  ______   __  __ ______ _ 
 | |  | |_   _|  __ \\|  ____| |  \\/  |  ____| |
 | |__| | | | | |__) | |__    | \\  / | |__  | |
 |  __  | | | |  _  /|  __|   | |\\/| |  __| | |
 | |  | |_| |_| | \\ \\| |____  | |  | | |____|_|
 |_|  |_|_____|_|  \\_\\______| |_|  |_|______(_)                                            
 `,
  "font-family:monospace"
);

let myEmail = document.getElementById("myEmail");
myEmail.addEventListener("mouseup", copyEmail);
document.getElementById("clippy").addEventListener("mouseup", copyEmail);

function copyEmail() {
  let myEmail = document.getElementById("myEmail");
  myEmail.classList.remove("copy");
  myEmail.innerHTML = "Copied to clipboard!";
  let reset = setInterval(() => {
    if (myEmail.innerHTML != "Copied to clipboard!") {
      window.clearInterval(reset);
    }
    myEmail.innerHTML = "addisondrewmoore@gmail.com";
    myEmail.classList.add("copy");
  }, 1200);
}
