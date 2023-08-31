import { Component, Input } from '@angular/core';

import { Item } from '../../../../../core/shared/item.model';
import { ItemPageFieldComponent } from '../item-page-field.component';

@Component({
  selector: 'ds-item-page-metadata-search-link',
  templateUrl: './item-page-metadata-search-link-field.component.html'
})
/**
 * This component renders a Discovery search link for a metadata value.
 * It expects 4 parameters: The item, a separator, the metadata keys and an i18n key
 */
export class ItemPageMetadataSearchLinkFieldComponent extends ItemPageFieldComponent {

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
   * Name of index from discovery.xml
   */
  @Input() index: string;

  /**
   * Helper function to generate a search link for the metadata value using its
   * Discovery index.
   * @type {string}
   */
  generateSearchLink(metadataValue: string, discoveryIndex: string) {
      // Construct the search link, URI encoding the metadata value to handle
      // values like "Bill & Melinda Gates Foundation" that contain URI compo-
      // nents.
      return '/search?query=&f.' + discoveryIndex + '=' + encodeURIComponent(metadataValue) + ',equals&spc.page=1';
  }
}
