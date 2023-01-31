import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { DsoEditMetadataComponent } from './dso-edit-metadata/dso-edit-metadata.component';
import { MetadataFieldSelectorComponent } from './dso-edit-metadata/metadata-field-selector/metadata-field-selector.component';
import { DsoEditMetadataFieldValuesComponent } from './dso-edit-metadata/dso-edit-metadata-field-values/dso-edit-metadata-field-values.component';
import { DsoEditMetadataValueComponent } from './dso-edit-metadata/dso-edit-metadata-value/dso-edit-metadata-value.component';
import { DsoEditMetadataHeadersComponent } from './dso-edit-metadata/dso-edit-metadata-headers/dso-edit-metadata-headers.component';
import { DsoEditMetadataValueHeadersComponent } from './dso-edit-metadata/dso-edit-metadata-value-headers/dso-edit-metadata-value-headers.component';

@NgModule({
  imports: [
    SharedModule,
  ],
  declarations: [
    DsoEditMetadataComponent,
    MetadataFieldSelectorComponent,
    DsoEditMetadataFieldValuesComponent,
    DsoEditMetadataValueComponent,
    DsoEditMetadataHeadersComponent,
    DsoEditMetadataValueHeadersComponent,
  ],
  exports: [
    DsoEditMetadataComponent,
  ],
})
export class DsoSharedModule {

}
