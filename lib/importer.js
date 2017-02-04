'use babel';

import ImporterView from './importer-view';
import { CompositeDisposable, DirectorySearch } from 'atom';

const projectPath = atom.project.getPaths();

export default {

  importerView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.importerView = new ImporterView(state.importerViewState);
    //TODO: change this to use a header panel
    this.modalPanel = atom.workspace.addBottomPanel({
      item: this.importerView.getElement(),
      visible: false
    });

    this.importerView.on('import', this.importModule.bind(this));
    this.importerView.on('cancel', () => this.cancel());

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'importer:begin-import': () => this.beginImport()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.importerView.destroy();
  },

  beginImport() {
    const ds = DirectorySearch;
    debugger;
    this.modalPanel.show();
    this.importerView.getElement().focus();
  },

  serialize() {
    return {
      importerViewState: this.importerView.serialize()
    };
  },

  importModule(moduleName) {
    this.cancel();
    atom.notifications.addSuccess(`Importing ${moduleName}`);

    const editor = atom.workspace.getActiveTextEditor();
    window.editor = editor;
    const currentCursor = editor.getCursorBufferPosition(); //row, column
    editor.moveCursors(cursor => cursor.moveToTop());
    editor.insertText(`import ${moduleName}\n`);
    editor.moveCursors(cursor =>
      cursor.setBufferPosition([currentCursor.row+1, currentCursor.column])
    );
  },

  cancel() {
    this.modalPanel.hide();
    atom.workspace.getActivePane().activate();
  }

};
