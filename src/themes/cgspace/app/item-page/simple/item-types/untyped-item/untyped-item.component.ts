import {
  AsyncPipe,
  DOCUMENT,
} from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
  Renderer2,
  RendererFactory2,
} from '@angular/core';
import {
  Router,
  RouterLink,
} from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { RouteService } from '../../../../../../../app/core/services/route.service';
import { Context } from '../../../../../../../app/core/shared/context.model';
import { Item } from '../../../../../../../app/core/shared/item.model';
import { ViewMode } from '../../../../../../../app/core/shared/view-mode.model';
import { CollectionsComponent } from '../../../../../../../app/item-page/field-components/collections/collections.component';
import { ThemedMediaViewerComponent } from '../../../../../../../app/item-page/media-viewer/themed-media-viewer.component';
import { MiradorViewerComponent } from '../../../../../../../app/item-page/mirador-viewer/mirador-viewer.component';
import { ThemedFileSectionComponent } from '../../../../../../../app/item-page/simple/field-components/file-section/themed-file-section.component';
import { ItemPageAccessRightsFieldComponent } from '../../../../../../../app/item-page/simple/field-components/specific-field/access-rights/item-page-access-rights-field.component';
import { GenericItemPageFieldComponent } from '../../../../../../../app/item-page/simple/field-components/specific-field/generic/generic-item-page-field.component';
import { ItemPageLicenseFieldComponent } from '../../../../../../../app/item-page/simple/field-components/specific-field/license/item-page-license-field.component';
import { ItemPageMetadataSearchLinkFieldComponent } from '../../../../../../../app/item-page/simple/field-components/specific-field/metadata-search-link/item-page-metadata-search-link-field.component';
import { ItemPageOrcidFieldComponent } from '../../../../../../../app/item-page/simple/field-components/specific-field/orcid/item-page-orcid-field.component';
import { ItemPageRelationFieldComponent } from '../../../../../../../app/item-page/simple/field-components/specific-field/relation/item-page-relation-field.component';
import { ItemPageSdgFieldComponent } from '../../../../../../../app/item-page/simple/field-components/specific-field/sdg/item-page-sdg-field.component';
import { ItemPageShareFieldComponent } from '../../../../../../../app/item-page/simple/field-components/specific-field/share/item-page-share-field.component';
import { ThemedItemPageTitleFieldComponent } from '../../../../../../../app/item-page/simple/field-components/specific-field/title/themed-item-page-field.component';
import { ItemPageUriFieldComponent } from '../../../../../../../app/item-page/simple/field-components/specific-field/uri/item-page-uri-field.component';
import { UntypedItemComponent as BaseComponent } from '../../../../../../../app/item-page/simple/item-types/untyped-item/untyped-item.component';
import { ThemedMetadataRepresentationListComponent } from '../../../../../../../app/item-page/simple/metadata-representation-list/themed-metadata-representation-list.component';
import { DsoEditMenuComponent } from '../../../../../../../app/shared/dso-page/dso-edit-menu/dso-edit-menu.component';
import { MetadataFieldWrapperComponent } from '../../../../../../../app/shared/metadata-field-wrapper/metadata-field-wrapper.component';
import { listableObjectComponent } from '../../../../../../../app/shared/object-collection/shared/listable-object/listable-object.decorator';
import { ThemedResultsBackButtonComponent } from '../../../../../../../app/shared/results-back-button/themed-results-back-button.component';
import { ThemedThumbnailComponent } from '../../../../../../../app/thumbnail/themed-thumbnail.component';

/**
 * Component that represents an untyped Item page
 */
@listableObjectComponent(Item, ViewMode.StandalonePage, Context.Any, 'cgspace')
@Component({
  selector: 'ds-untyped-item',
  styleUrls: ['./untyped-item.component.scss'],
  //styleUrls: ['../../../../../../../app/item-page/simple/item-types/untyped-item/untyped-item.component.scss'],
  templateUrl: './untyped-item.component.html',
  //templateUrl: '../../../../../../../app/item-page/simple/item-types/untyped-item/untyped-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    AsyncPipe,
    ThemedResultsBackButtonComponent,
    MiradorViewerComponent,
    ThemedItemPageTitleFieldComponent,
    DsoEditMenuComponent,
    MetadataFieldWrapperComponent,
    ThemedThumbnailComponent,
    ThemedMediaViewerComponent,
    ThemedFileSectionComponent,
    ThemedMetadataRepresentationListComponent,
    GenericItemPageFieldComponent,
    TranslateModule,
    ItemPageMetadataSearchLinkFieldComponent,
    ItemPageAccessRightsFieldComponent,
    ItemPageLicenseFieldComponent,
    RouterLink,
    ItemPageShareFieldComponent,
    ItemPageUriFieldComponent,
    ItemPageOrcidFieldComponent,
    ItemPageSdgFieldComponent,
    ItemPageRelationFieldComponent,
    CollectionsComponent,
  ],
})
export class UntypedItemComponent extends BaseComponent implements AfterViewInit, OnInit {
  private renderer: Renderer2;

  constructor(@Inject(DOCUMENT) private _document: any,
  private factory: RendererFactory2,
  protected routeService: RouteService, protected router: Router) {
    super(routeService, router);
    this.renderer = factory.createRenderer(null, null);
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

  ngAfterViewInit(): void {
    // Add Altmetrics badge code
    this.createScriptSrc('https://embed.altmetric.com/assets/embed.js', 'altmetric-embed');
    // Add Dimensions badge code
    this.createScriptSrc('https://badge.dimensions.ai/badge.js', '__dimensions_badge_embed__');
    this.injectScript(`setTimeout( () => {if(window._altmetric_embed_init) {window._altmetric_embed_init();}}, 1000);`, 'altmetric_timeout');
    // Set timeout for Dimensions badge script
    this.injectScript(`setTimeout( () => {window.__dimensions_embed?.addBadges();}, 1000);`, 'dimensions_timeout');
  }

  /**
   * Gets the article DOI as an identifier, stripping the scheme and domain if
   * present.
   * @returns the article DOI or null
   */
  getDOI(): string {
    const doi: string = this.object.firstMetadataValue('cg.identifier.doi');
    const regex = /https?:\/\/(dx\.)?doi\.org\//gi;

    if (typeof doi !== 'undefined') {
      return doi.replace(regex, '');
    }

    return null;
  }

  /**
   * Gets the article handle. Returns null if there is a DOI, as that's
   * the preferred lookup mechanism.
   * @returns the Handle portion of the dc.identifier.uri or null
   */
  getHandle(): string {
    const handle: string = this.object.firstMetadataValue('dc.identifier.uri');
    const regex = /https?:\/\/hdl\.handle\.net\//gi;

    if (typeof handle !== 'undefined') {
      return handle.replace(regex, '');
    }

    return null;
  }

  /**
   * Adds a script tag with a src attribute at the end of the <body>.
   * @param the URL for the src attribute
   */
  private createScriptSrc(url: string, cssClass: string): void {
    const id = url.replace(/\W/g,'');
    let script = this._document.getElementById(id);
    if (script) {
      script.parentElement.removeChild(script);
    }
    script = this.renderer.createElement('script');
    script.setAttribute('id', id);
    script.setAttribute('type', 'application/javascript');
    script.setAttribute('async','');
    script.setAttribute('charset', 'utf-8');
    script.setAttribute('src', url);
    this.renderer.appendChild(this._document.body, script);
  }

  private injectScript(code: string, codeId?: string) {
    const id = codeId ? codeId : code.replace(/\W/g,'');
    let script = this._document.getElementById(id);
    if (script) {
      script.parentElement.removeChild(script);
    }
    script = this.renderer.createElement('script');
    script.setAttribute('id', id);
    script.setAttribute('type', 'application/javascript');
    const sourcecode = this.renderer.createText(code);
    this.renderer.appendChild(script, sourcecode);
    this.renderer.appendChild(this._document.body, script);
  }
}
