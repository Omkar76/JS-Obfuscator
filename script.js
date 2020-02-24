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

  App.copyButton = document.querySelector('#copy');
  App.copyButton.addEventListener('click', copyCode);

  App.editor = ace.edit('editor');
  App.editor.setOptions(editorConfig);

  App.output = ace.edit('output');
  App.output.setOptions({...editorConfig,
    readOnly: true,
  });

  const clipboard = new Clipboard('#copy');
};

function openEditor() {
  App.tabButtons[0]
      .style
      .backgroundColor = 'rgb(36, 195, 243)';

  App.tabButtons[1]
      .style
      .backgroundColor = 'rgb(25, 171, 216)';

  App.tabs[0].style.display = 'block';
  App.tabs[1].style.display = 'none';
}

function openOutput() {
  App.tabButtons[1]
      .style
      .backgroundColor = 'rgb(36, 195, 243)';

  App.tabButtons[0]
      .style
      .backgroundColor = 'rgb(25, 171, 216)';

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

function copyCode(e) {
  App.copyButton.dataset.clipboardText = App.output.getValue();
}
