chrome.runtime.onInstalled.addListener(function() {
    chrome.contextMenus.create({
      id: "parent",
      title: "Map",
      contexts: ["all"]
    });
  
    // Adiciona as opções de submenu
    chrome.contextMenus.create({
      id: "name",
      title: "Name",
      parentId: "parent",
      contexts: ["all"]
    });
    chrome.contextMenus.create({
      id: "phone",
      title: "Phone",
      parentId: "parent",
      contexts: ["all"]
    });
    chrome.contextMenus.create({
      id: "email",
      title: "Email",
      parentId: "parent",
      contexts: ["all"]
    });
  });
  
  // Adiciona um listener para o clique do menu de contexto
  chrome.contextMenus.onClicked.addListener(function(info, tab) {
    if (info.menuItemId === "name") {
      // Chama o método para manipular a opção "Name"
      handleOption("Name", info);
    } else if (info.menuItemId === "phone") {
      // Chama o método para manipular a opção "Phone"
      handleOption("Phone", info);
    } else if (info.menuItemId === "email") {
      // Chama o método para manipular a opção "Email"
      handleOption("Email", info);
    }
  });
  
  // Método para manipular a opção selecionada
  function handleOption(option, info) {
    console.log("Option selected:", option);
    console.log("Clicked element:", info);
    // Aqui você pode adicionar a lógica para verificar onde o usuário clicou e obter o ID e o Name do input, se necessário
  }
  