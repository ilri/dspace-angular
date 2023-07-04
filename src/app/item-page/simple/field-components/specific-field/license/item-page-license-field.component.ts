import { Component, Input } from '@angular/core';

import { Item } from '../../../../../core/shared/item.model';
import { ItemPageFieldComponent } from '../item-page-field.component';

@Component({
  selector: 'ds-item-page-license-field',
  templateUrl: './item-page-license-field.component.html'
})
/**
 * This component renders the license section.
 * It expects 4 parameters: The item, a separator, the metadata keys and an i18n key
 */
export class ItemPageLicenseFieldComponent extends ItemPageFieldComponent {

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

  /**
   * Helper function to return the appropriate CC license icon. Licenses can be
   * versions 1.0, 2.0, 2.5, 3.0, or 4.0 for most (I don't try to match those
   * without versions).
   * @type {string}
   */
  parseLicense(license: string) {
    if (license.match(/CC-BY-[1234]/i) != null) {
      return 'by.svg';
    } else if (license.match(/CC-BY-SA-[1234]/) != null) {
      return 'by-sa.svg';
    } else if (license.match(/CC-BY-ND-[1234]/) != null) {
      return 'by-nd.svg';
    } else if (license.match(/CC-BY-NC-[1234]/) != null) {
      return 'by-nc.svg';
    } else if (license.match(/CC-BY-NC-SA-[1234]/) != null) {
      return 'by-nc-sa.svg';
    } else if (license.match(/CC-BY-NC-ND-[1234]/) != null) {
      return 'by-nc-nd.svg';
    } else if (license.match(/CC0-1.0/) != null) {
      return 'cc-zero.svg';
    }
    // Should never get here, we will see. ;)
    else {
      return 'boo';
    }
  }
}
