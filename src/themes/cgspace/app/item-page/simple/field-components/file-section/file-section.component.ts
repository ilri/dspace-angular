import {
  AsyncPipe,
  LowerCasePipe,
  NgTemplateOutlet,
} from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { FileSectionComponent as BaseComponent } from '../../../../../../../app/item-page/simple/field-components/file-section/file-section.component';
import { ThemedFileDownloadLinkComponent } from '../../../../../../../app/shared/file-download-link/themed-file-download-link.component';
import { ThemedLoadingComponent } from '../../../../../../../app/shared/loading/themed-loading.component';
import { MetadataFieldWrapperComponent } from '../../../../../../../app/shared/metadata-field-wrapper/metadata-field-wrapper.component';
import { FileSizePipe } from '../../../../../../../app/shared/utils/file-size-pipe';
import { VarDirective } from '../../../../../../../app/shared/utils/var.directive';

@Component({
  selector: 'ds-themed-item-page-file-section',
  templateUrl: './file-section.component.html',
  //templateUrl: '../../../../../../../app/item-page/simple/field-components/file-section/file-section.component.html',
  standalone: true,
  imports: [
    VarDirective,
    AsyncPipe,
    MetadataFieldWrapperComponent,
    TranslateModule,
    ThemedFileDownloadLinkComponent,
    NgTemplateOutlet,
    ThemedLoadingComponent,
    FileSizePipe,
    LowerCasePipe,
  ],
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
