'use babel';

import UfadeltaView from './ufadelta-view';
import { CompositeDisposable } from 'atom';

export default {

  ufadeltaView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.ufadeltaView = new UfadeltaView(state.ufadeltaViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.ufadeltaView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'ufadelta:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.ufadeltaView.destroy();
  },

  serialize() {
    return {
      ufadeltaViewState: this.ufadeltaView.serialize()
    };
  },

  toggle() {
    console.log('Ufadelta was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
