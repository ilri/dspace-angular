import { Component, Input } from '@angular/core';

import { Item } from '../../../../../core/shared/item.model';
import { ItemPageFieldComponent } from '../item-page-field.component';

@Component({
  selector: 'ds-item-page-share-field',
  styleUrls: ['./item-page-share-field.component.scss'],
  templateUrl: './item-page-share-field.component.html'
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
