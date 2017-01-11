'use babel';

import { CompositeDisposable } from 'atom';
import EventEmitter from 'events';

export default class ImporterView extends EventEmitter {

  constructor(serializedState) {
    super();
    this.subscriptions = new CompositeDisposable();

    // Create root element
    this.element = document.createElement('atom-text-editor');

    this.element.getModel().setMini(true);
    this.element.setAttribute('mini', '');

    this.subscriptions.add(atom.commands.add(this.element, 'core:confirm', () => this.execute()));
    this.subscriptions.add(atom.commands.add(this.element, 'core:cancel', () => this.cancel()));
    this.subscriptions.add(atom.commands.add(this.element, 'blur', () => this.cancel()));
  }

  execute() {
    this.emit('import', this.element.getModel().getText());
    this.element.getModel().setText('');
  }

  cancel() {
    this.emit('cancel');
    this.element.getModel().setText('');
  }

  // Returns an object that can be retrieved when package is activated
  serialize() {}

  // Tear down any state and detach
  destroy() {
    this.element.remove();
    this.subscriptions.dispose();
  }

  getElement() {
    return this.element;
  }
}
