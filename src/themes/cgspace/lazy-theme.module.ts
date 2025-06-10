import { NgModule } from '@angular/core';

import { RootModule } from '../../app/root.module';
import { PrivacyComponent } from './app/info/privacy/privacy.component';
import { FileSectionComponent } from './app/item-page/simple/field-components/file-section/file-section.component';
import { ItemPageTitleFieldComponent } from './app/item-page/simple/field-components/specific-field/title/item-page-title-field.component';
import { HomePageComponent } from './app/home-page/home-page.component';

const DECLARATIONS = [
  FileSectionComponent,
  PrivacyComponent,
  ItemPageTitleFieldComponent,
  HomePageComponent,
];

@NgModule({
  imports: [
    RootModule,
    ...DECLARATIONS,
  ],
})

/**
   * This module serves as an index for all the components in this theme.
   * It should import all other modules, so the compiler knows where to find any components referenced
   * from a component in this theme
   * It is purposefully not exported, it should never be imported anywhere else, its only purpose is
   * to give lazily loaded components a context in which they can be compiled successfully
   */
class LazyThemeModule {
}
