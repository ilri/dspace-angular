import { NgTemplateOutlet } from '@angular/common';
import {
  Component,
  Input,
} from '@angular/core';

import { Item } from '../../../../../core/shared/item.model';
import { ItemPageFieldComponent } from '../item-page-field.component';
import { MetadataFieldWrapperComponent } from '../../../../../shared/metadata-field-wrapper/metadata-field-wrapper.component';

@Component({
  selector: 'ds-item-page-share-field',
  // Mimic style from metadata-field-wrapper component since we can't use it here
  styleUrls: ['../../../../../shared/metadata-field-wrapper/metadata-field-wrapper.component.scss'],
  templateUrl: './item-page-share-field.component.html',
  standalone: true,
  imports: [
    NgTemplateOutlet,
    MetadataFieldWrapperComponent,
  ],
})
/**
 * This component renders share icons.
 * It expects 1 parameters: The item
 */
export class ItemPageShareFieldComponent extends ItemPageFieldComponent {

  /**
   * The item to display metadata for
   */
  @Input() item: Item;
}
