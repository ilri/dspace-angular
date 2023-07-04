import { Component } from '@angular/core';
import { FileSectionComponent as BaseComponent } from '../../../../../../../app/item-page/simple/field-components/file-section/file-section.component';

@Component({
    selector: 'ds-item-page-file-section',
    templateUrl: './file-section.component.html',
    //templateUrl: '../../../../../../../app/item-page/simple/field-components/file-section/file-section.component.html',
})
export class FileSectionComponent extends BaseComponent {
  // Helper function to etract the extension of the file as a proxy for format,
  // which I don't know how to get yet because the file.format link apparently
  // isn't resolved (see src/app/core/shared/bitstream.model.ts).
  getFileExtension(filename: string) {
    // Case sensitive search for word characters at the end of the filename
    const regex = /^.+\.(\w+)$/i;

    // Return second element of the array, which should be our captured group
    return filename.match(regex)[1];
  }
}
