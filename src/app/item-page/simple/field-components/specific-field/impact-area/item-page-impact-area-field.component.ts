import { Component, Input } from '@angular/core';

import { Item } from '../../../../../core/shared/item.model';
import { ItemPageFieldComponent } from '../item-page-field.component';

@Component({
  selector: 'ds-item-page-impact-area-field',
  templateUrl: './item-page-impact-area-field.component.html'
})
/**
 * This component renders an Impact Area.
 * It expects 4 parameters: The item, a separator, the metadata keys and an i18n key
 */
export class ItemPageImpactAreaFieldComponent extends ItemPageFieldComponent {

  /**
   * The item to display metadata for
   */
  @Input() item: Item;

  /**
   * Separator string between multiple values of the metadata fields defined
   * @type {string}
   */
  @Input() separator: string;

  /**
   * Fields (schema.element.qualifier) used to render their values.
   */
  @Input() fields: string[];

  /**
   * Label i18n key for the rendered metadata
   */
  @Input() label: string;

  /**
   * Helper function to fuzzy match Impact Areas from the metadata value inside
   * the component's HTML and return the name of the corresponding icon. We can
   * rely on matching the unique words in each Impact Area since they are mostly
   * unique.
   * @type {string}
   */
    parseImpactArea(impactArea: string) {
      // Climate adaptation and mitigation
      if (impactArea.match(/(climate|adaptation|mitigation)/gi) != null) {
        return "icon-circle-climate-change.svg";
      }
      // Environmental health and biodiversity
      else if (impactArea.match(/(environmental|biodiversity)/gi) != null) {
        return "icon-circle-environmental-health-biodiversity.svg";
      }
      // Gender equality, youth and social inclusion
      else if (impactArea.match(/(gender|equality|youth|social|inclusion)/gi) != null) {
        return "icon-circle-gender-equality-youth-inclusion.svg";
      }
      // Nutrition, health and food security
      else if (impactArea.match(/(nutrition|food|security)/gi) != null) {
        return "icon-circle-food-security.svg";
      }
      // Poverty reduction, livelihoods and jobs
      else if (impactArea.match(/(poverty|reduction|livelihoods|jobs)/gi) != null) {
        return "icon-circle-poverty-reduction.svg";
      }
      // Should never get here, we will see. ;)
      else {
        return "boo";
      }
    }
}