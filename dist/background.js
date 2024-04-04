// const GOOGLE_ORIGIN = 'https://www.google.com';

// Allows users to open the side panel by clicking on the action toolbar icon
chrome.sidePanel
  .setPanelBehavior({ openPanelOnActionClick: true })
  .catch((error) => console.error(error));


// Criar um item de menu de contexto
chrome.contextMenus.create({
  id: "dataNinjaMenu",
  title: "Data Ninja: Map Fields",
  contexts: ["all"] // Contexto em que o menu será exibido (neste caso, em todas as páginas)
});

// TODO: Criar um menu para mapear os campos do formulário
// // Adicionar um ouvinte de evento para quando o item do menu for clicado
// chrome.contextMenus.onClicked.addListener((info, tab) => {
//   if (info.menuItemId === "dataNinjaMenu") {
   
//     chrome.scripting.executeScript({
//         target: { tabId: tab.id },
//         function: verificarInputClicado
//     });
//   }
// });

// // Função para verificar se o elemento clicado é um input e enviar os detalhes para o Vue.js
// function verificarInputClicado() {
//   document.addEventListener("click", function(event) {
//       var target = event.target;
//       if (event.button === 2 && target.tagName.toLowerCase() === "input") {
//           chrome.runtime.sendMessage({
//               action: "inputClicado",
//               inputId: target.id,
//               inputName: target.name
//           });

//           console.log("Input clicado: ", target);
//       }
//   });
// }