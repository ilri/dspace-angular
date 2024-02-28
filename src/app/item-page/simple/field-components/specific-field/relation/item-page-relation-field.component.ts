import { Component, Input } from '@angular/core';

import { Item } from '../../../../../core/shared/item.model';
import { ItemPageFieldComponent } from '../item-page-field.component';

@Component({
  selector: 'ds-item-page-relation-field',
  //styleUrls: ['./item-page-relation-field.component.scss'],
  templateUrl: './item-page-relation-field.component.html'
})
/**
 * This component renders the related material section.
 */
export class ItemPageRelationFieldComponent extends ItemPageFieldComponent {

  /**
   * The item to display metadata for
   */
  @Input() item: Item;
}
