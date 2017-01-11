'use babel';
// not being used.

import path from 'path'
import fs from 'fs'

// reference: https://github.com/atom/tree-view/blob/master/lib/add-dialog.coffee

class ImportDialog extends Dialog {
  constructor (initialPath) {
    this.initialPath = initialPath

    if (fs.isFileSync(initialPath)) {
      directoryPath = path.dirname(initialPath)
    }
    else {
      directoryPath = initialPath
    }
    relativeDirectoryPath = directoryPath
    [rootProjectPath, relativeDirectoryPath] = atom.project.relativizePath(directoryPath)

    relativeDirectoryPath += path.sep if relativeDirectoryPath.length > 0
    super({
      prompt: "Enter the path for the file you want to import",
      initialPath: relativeDirectoryPath,
      select: false,
      iconClass: 'icon-file-add'
    })
  }

  onConfirm(path) {
    atom.notifications.addInfo('added path: ', path)
  }
}


export default {}
