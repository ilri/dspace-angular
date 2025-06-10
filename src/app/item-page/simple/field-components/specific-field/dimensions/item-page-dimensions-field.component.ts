import { NgTemplateOutlet } from '@angular/common';
import {
  AfterViewInit,
  Component,
  Input,
} from '@angular/core';

import { Item } from '../../../../../core/shared/item.model';
import { ItemPageFieldComponent } from '../item-page-field.component';

declare global {
  interface Window {
    __dimensions_embed: any;
  }
}

@Component({
  selector: 'ds-item-page-dimensions-field',
  templateUrl: './item-page-dimensions-field.component.html',
  standalone: true,
  imports: [
    NgTemplateOutlet,
  ],
})
/**
 * This component renders a Dimensions badge.
 * It expects 1 parameter: The item
 */
export class ItemPageDimensionsFieldComponent extends ItemPageFieldComponent implements AfterViewInit {
  /**
   * The item to display metadata for
   */
  @Input() item: Item;

  // Is this hacky? It feels hacky. I can't figure out any other way to load the
  // Dimensions badge.js *after* Angular finishes rendering the DOM.
  ngAfterViewInit() {
    // Dimensions badge.js
    import('./badge.js');

    try {
      window.__dimensions_embed.addBadges();
    } catch {
      return;
    }
  }

  /**
   * Helper function to extract the DOI itself from a URI. Should return the
   * DOI component for any variation of http, https, dx.doi.org, and doi.org.
   * @type {string}
   */
  parseDoi(doi: string) {
    const regex = /https?:\/\/(dx\.)?doi\.org\//gi;
    return doi.replace(regex, '');
  }
}
