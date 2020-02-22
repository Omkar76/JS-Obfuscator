'use strict';

const App ={};

const editorConfig = {
  theme: 'ace/theme/dracula',
  mode: 'ace/mode/javascript',
  wrap: true,
  showPrintMargin: false,
  showLineNumbers: true,
  enableBasicAutocompletion: true,
};

window.onload = () =>{
  App.tabs = document
      .querySelector('#tab-container')
      .children;

  App.tabButtons = document
      .querySelector('nav')
      .children;

  App.tabButtons[0]
      .addEventListener('click', openEditor);
  App.tabButtons[0].click();

  App.tabButtons[1]
      .addEventListener('click', openOutput);

  //   for(let button of tabButtons){
  //       button.addEventListener('click',openTab);
  //   }
  App.copy = document.querySelector('#copy');
  App.copy.addEventListener('click', copyCode);

  App.editor = ace.edit('editor');
  App.editor.setOptions(editorConfig);

  App.output = ace.edit('output');
  App.output.setOptions(editorConfig);
};

function openEditor() {
  App.tabs[0].style.display = 'block';
  App.tabs[1].style.display = 'none';
}

function openOutput() {
  App.tabs[0].style.display = 'none';
  App.tabs[1].style.display = 'block';

  const code = App.editor.getValue();

  App.output.setValue(
      JavaScriptObfuscator.obfuscate(code, {
        compact: false,
        controlFlowFlattening: true,
      }).toString(),
  );
}

function copyCode() {
  App.output.select();
}
// function openTab(e){
//    let clickedTabButton = e.target;

//    for(let tab of tabs){
//        tab.style.display = 'none';
//    }

//    let tabToDisplay =
//    document.querySelector(clickedTabButton.dataset.tab);

//    tabToDisplay.style.display = 'block';
// }
