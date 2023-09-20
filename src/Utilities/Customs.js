// Please assign you preferred title, and description to the variables title, and description respectively. For example:
// let title = "Crypto Wallet"
// let description = "My cryto wallet"

let title;
let description;

const appTitle = () => {
  if (title) {
    return title;
  }
};

const appDescription = () => {
  if (description) {
    return description;
  }
};

export { appTitle, appDescription };
