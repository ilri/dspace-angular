import { NgModule } from '@angular/core';
//import { EagerThemeModule as DSpaceEagerThemeModule } from './dspace/eager-theme.module';
// import { EagerThemeModule as CustomEagerThemeModule } from './custom/eager-theme.module';
import { EagerThemeModule as CGSpaceEagerThemeModule } from './cgspace/eager-theme.module';
import { EagerThemeModule as IlriEagerThemeModule } from './ilri/eager-theme.module';
import { EagerThemeModule as CipEagerThemeModule } from './cip/eager-theme.module';
import { EagerThemeModule as IitaEagerThemeModule } from './iita/eager-theme.module';
import { EagerThemeModule as IwmiEagerThemeModule } from './iwmi/eager-theme.module';
import { EagerThemeModule as AllianceEagerThemeModule } from './alliance/eager-theme.module';

/**
 * This module bundles the eager theme modules for all available themes.
 * Eager modules contain components that are present on every page (to speed up initial loading)
 * and entry components (to ensure their decorators get picked up).
 *
 * Themes that aren't in use should not be imported here so they don't take up unnecessary space in the main bundle.
 */
@NgModule({
  imports: [
    //DSpaceEagerThemeModule,
    // CustomEagerThemeModule,
    CGSpaceEagerThemeModule,
    IlriEagerThemeModule,
    CipEagerThemeModule,
    IitaEagerThemeModule,
    IwmiEagerThemeModule,
    AllianceEagerThemeModule,
  ],
})
export class EagerThemesModule {
}
