// Allows users to open the side panel by clicking on the action toolbar icon
chrome.sidePanel
  .setPanelBehavior({ openPanelOnActionClick: true })
  .catch((error) => console.error(error));

  // TODO: Context menu item click handler
  // chrome.runtime.onInstalled.addListener(function() {
  //   chrome.contextMenus.create({
  //     id: "mapSubMenu",
  //     title: "Data Ninja: Map Fields",
  //     contexts: ["all"]
  //   });
  
  //   // Adiciona as opções do submenu
  //   chrome.contextMenus.create({
  //     id: "name",
  //     title: "Name",
  //     parentId: "mapSubMenu",
  //     contexts: ["all"]
  //   });
  //   chrome.contextMenus.create({
  //     id: "phone",
  //     title: "Phone",
  //     parentId: "mapSubMenu",
  //     contexts: ["all"]
  //   });
  //   chrome.contextMenus.create({
  //     id: "email",
  //     title: "Email",
  //     parentId: "mapSubMenu",
  //     contexts: ["all"]
  //   });
  // });
  
  // // Adiciona um listener para o clique do menu de contexto
  // chrome.contextMenus.onClicked.addListener(function(info, tab) {

  //   if (info.menuItemId === "name") {
  //     // Chama o método para manipular a opção "Name"
  //     handleOption("Name", tab);
  //   } else if (info.menuItemId === "phone") {
  //     // Chama o método para manipular a opção "Phone"
  //     handleOption("Phone", tab);
  //   } else if (info.menuItemId === "email") {
  //     // Chama o método para manipular a opção "Email"
  //     handleOption("Email", tab);
  //   }
  // });
  
  // // Método para manipular a opção selecionada
  // function handleOption(option, tab) {

  //   // Verifica se o elemento clicado é um campo de input
  //   chrome.scripting.executeScript({
  //     target: { tabId: tab.id },
  //     function: function() {
  //       const clickedElement = document.activeElement;

  //       if (clickedElement.tagName === "INPUT") {
  //         const id = clickedElement.id;
  //         const name = clickedElement.name;
  //         console.log("Input ID:", id);
  //         console.log("Input Name:", name);
  //       } else {
  //         console.log("O elemento clicado não é um campo de input.");
  //       }

  //     }
  //   });
  // }
  



























// // Menus Context
// chrome.runtime.onInstalled.addListener(function() {
//   //Criar um item de menu de contexto
//   chrome.contextMenus.create({
//     id: "dataNinjaMenu",
//     title: "Data Ninja: Map Fields",
//     contexts: ["all"] 
//   });

//   // Adiciona as opções de submenu
//   chrome.contextMenus.create({
//     id: "name",
//     title: "Name",
//     parentId: "dataNinjaMenu",
//     contexts: ["all"]
//   });
// });

// // Adicionar um ouvinte de evento para quando o item do menu for clicado
// chrome.contextMenus.onClicked.addListener((info, tab) => {
//   // if (info.menuItemId === "dataNinjaMenu") {
   
//   //   chrome.scripting.executeScript({
//   //       target: { tabId: tab.id },
//   //       function: verificarInputClicado
//   //   });
//   // },
//   if (info.menuItemId === "name") {
//     // Chama o método para manipular a opção "Name"
//     handleOption(info.menuItemId, info);
//   }
// });

// Método para manipular a opção selecionada
// function handleOption(menuClicked, info) {
//   console.log("menuClicked selected:", menuClicked);
//   console.log("Clicked element:", info);
//   // Aqui você pode adicionar a lógica para verificar onde o usuário clicou e obter o ID e o Name do input, se necessário
// }

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