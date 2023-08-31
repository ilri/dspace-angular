import { Component, Input } from '@angular/core';

import { Item } from '../../../../../core/shared/item.model';
import { ItemPageFieldComponent } from '../item-page-field.component';

@Component({
  selector: 'ds-item-page-accessRights-field',
  templateUrl: './item-page-accessRights-field.component.html'
})
/**
 * This component renders the license section.
 * It expects 4 parameters: The item, a separator, the metadata keys and an i18n key
 */
export class ItemPageAccessRightsFieldComponent extends ItemPageFieldComponent {

  /**
   * The item to display metadata for
   */
  @Input() item: Item;

  /**
   * Fields (schema.element.qualifier) used to render their values.
   */
  @Input() fields: string[];

  /**
   * Label i18n key for the rendered metadata
   */
  @Input() label: string;
}
