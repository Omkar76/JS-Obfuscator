'use strict';

let tabs,
    tabButtons;

const editorConfig = {
    theme:'ace/theme/dracula',
    mode:'ace/mode/javascript',
    wrap:true,
    showPrintMargin:false,
    showLineNumbers:true,
    enableBasicAutocompletion:true,
}

window.onload = () =>{
  tabs = document
         .querySelector('#tab-container')
         .children;
     
  tabButtons = document
              .querySelector('nav')
              .children;

  for(let button of tabButtons){
      button.addEventListener('click',openTab);
  }
  
  const editor = ace.edit('editor');

  editor.setOptions(editorConfig);
  
  const output = ace.edit('output');
  output.setOptions(editorConfig);
  
  tabButtons[1].onclick = () =>{
         
    let code  = editor.getValue();

    output.setValue(
           JavaScriptObfuscator.obfuscate(code,{ 
            compact: false, 
            controlFlowFlattening: true,
           }).toString()
   );
  }
}

function openTab(e){
   let clickedTabButton = e.target;

   for(let tab of tabs){
       tab.style.display = 'none';
   }
   
   let tabToDisplay =
   document.querySelector(clickedTabButton.dataset.tab);
   
   tabToDisplay.style.display = 'block';
}