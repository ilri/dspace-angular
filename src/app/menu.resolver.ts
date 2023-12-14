import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { combineLatest as observableCombineLatest, combineLatest, Observable } from 'rxjs';
import { MenuID } from './shared/menu/menu-id.model';
import { MenuState } from './shared/menu/menu-state.model';
import { MenuItemType } from './shared/menu/menu-item-type.model';
import { LinkMenuItemModel } from './shared/menu/menu-item/models/link.model';
import { getFirstCompletedRemoteData } from './core/shared/operators';
import { PaginatedList } from './core/data/paginated-list.model';
import { BrowseDefinition } from './core/shared/browse-definition.model';
import { RemoteData } from './core/data/remote-data';
import { TextMenuItemModel } from './shared/menu/menu-item/models/text.model';
import { BrowseService } from './core/browse/browse.service';
import { MenuService } from './shared/menu/menu.service';
import { filter, find, map, take } from 'rxjs/operators';
import { hasValue } from './shared/empty.util';
import { FeatureID } from './core/data/feature-authorization/feature-id';
import {
  ThemedCreateCommunityParentSelectorComponent
} from './shared/dso-selector/modal-wrappers/create-community-parent-selector/themed-create-community-parent-selector.component';
import { OnClickMenuItemModel } from './shared/menu/menu-item/models/onclick.model';
import {
  ThemedCreateCollectionParentSelectorComponent
} from './shared/dso-selector/modal-wrappers/create-collection-parent-selector/themed-create-collection-parent-selector.component';
import {
  ThemedCreateItemParentSelectorComponent
} from './shared/dso-selector/modal-wrappers/create-item-parent-selector/themed-create-item-parent-selector.component';
import {
  ThemedEditCommunitySelectorComponent
} from './shared/dso-selector/modal-wrappers/edit-community-selector/themed-edit-community-selector.component';
import {
  ThemedEditCollectionSelectorComponent
} from './shared/dso-selector/modal-wrappers/edit-collection-selector/themed-edit-collection-selector.component';
import {
  ThemedEditItemSelectorComponent
} from './shared/dso-selector/modal-wrappers/edit-item-selector/themed-edit-item-selector.component';
import {
  ExportMetadataSelectorComponent
} from './shared/dso-selector/modal-wrappers/export-metadata-selector/export-metadata-selector.component';
import { AuthorizationDataService } from './core/data/feature-authorization/authorization-data.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  METADATA_EXPORT_SCRIPT_NAME,
  METADATA_IMPORT_SCRIPT_NAME,
  ScriptDataService
} from './core/data/processes/script-data.service';
import {
  ExportBatchSelectorComponent
} from './shared/dso-selector/modal-wrappers/export-batch-selector/export-batch-selector.component';

/**
 * Creates all of the app's menus
 */
@Injectable({
  providedIn: 'root'
})
export class MenuResolver implements Resolve<boolean> {
  constructor(
    protected menuService: MenuService,
    protected browseService: BrowseService,
    protected authorizationService: AuthorizationDataService,
    protected modalService: NgbModal,
    protected scriptDataService: ScriptDataService,
  ) {
  }

  /**
   * Initialize all menus
   */
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return combineLatest([
      this.createPublicMenu$(),
      this.createAdminMenu$(),
    ]).pipe(
      map((menusDone: boolean[]) => menusDone.every(Boolean)),
    );
  }

  /**
   * Wait for a specific menu to appear
   * @param id  the ID of the menu to wait for
   * @return    an Observable that emits true as soon as the menu is created
   */
  protected waitForMenu$(id: MenuID): Observable<boolean> {
    return this.menuService.getMenu(id).pipe(
      find((menu: MenuState) => hasValue(menu)),
      map(() => true),
    );
  }

  /**
   * Initialize all menu sections and items for {@link MenuID.PUBLIC}
   */
  createPublicMenu$(): Observable<boolean> {
    const menuList: any[] = [
      /* Communities & Collections tree */
      {
        id: `browse_global_communities_and_collections`,
        active: false,
        visible: true,
        index: 0,
        model: {
          type: MenuItemType.LINK,
          text: `menu.section.browse_global_communities_and_collections`,
          link: `/community-list`
        } as LinkMenuItemModel
      }
    ];
    // Read the different Browse-By types from config and add them to the browse menu
    this.browseService.getBrowseDefinitions()
      .pipe(getFirstCompletedRemoteData<PaginatedList<BrowseDefinition>>())
      .subscribe((browseDefListRD: RemoteData<PaginatedList<BrowseDefinition>>) => {
        if (browseDefListRD.hasSucceeded) {
          browseDefListRD.payload.page.forEach((browseDef: BrowseDefinition) => {
            menuList.push({
              id: `browse_global_by_${browseDef.id}`,
              parentID: 'browse_global',
              active: false,
              visible: true,
              model: {
                type: MenuItemType.LINK,
                text: `menu.section.browse_global_by_${browseDef.id}`,
                link: `/browse/${browseDef.id}`
              } as LinkMenuItemModel
            });
          });
          menuList.push(
            /* Browse */
            {
              id: 'browse_global',
              active: false,
              visible: true,
              index: 1,
              model: {
                type: MenuItemType.TEXT,
                text: 'menu.section.browse_global'
              } as TextMenuItemModel,
            }
          );
          menuList.push({
            id: `navigate_cgspace_link1`,
            parentID: 'navigate_cgspace',
            active: false,
            visible: true,
            model: {
              type: MenuItemType.LINK,
              text: 'CGIAR research initiatives and impact platforms',
              link: '/communities/c222a914-ea31-4dc9-92c5-e76b57dac187'
            } as LinkMenuItemModel
          });
          menuList.push({
            id: `navigate_cgspace_link2`,
            parentID: 'navigate_cgspace',
            active: false,
            visible: true,
            model: {
              type: MenuItemType.LINK,
              text: 'CGIAR research centers',
              link: '/communities/9e873f16-cdb1-498a-9793-eb3bfe31dd0e'
            } as LinkMenuItemModel
          });
          menuList.push({
            id: `navigate_cgspace_link3`,
            parentID: 'navigate_cgspace',
            active: false,
            visible: true,
            model: {
              type: MenuItemType.LINK,
              text: 'AICCRA project',
              link: '/communities/7b6da9fb-c1c3-408a-a134-26f31f848358'
            } as LinkMenuItemModel
          });
          menuList.push({
            id: `navigate_cgspace_link4`,
            parentID: 'navigate_cgspace',
            active: false,
            visible: true,
            model: {
              type: MenuItemType.LINK,
              text: 'CGIAR research programs and platforms (2011-2021)',
              link: '/communities/d09e6100-df60-4280-9ff3-f3fea5ea4e6b'
            } as LinkMenuItemModel
          });
          menuList.push({
            id: `navigate_cgspace_link5`,
            parentID: 'navigate_cgspace',
            active: false,
            visible: true,
            model: {
              type: MenuItemType.LINK,
              text: 'CGIAR System Organization',
              link: '/communities/a238fb09-8a40-4c20-8c59-52837b6cdd0e'
            } as LinkMenuItemModel
          });
          menuList.push({
            id: `navigate_cgspace_link6`,
            parentID: 'navigate_cgspace',
            active: false,
            visible: true,
            model: {
              type: MenuItemType.LINK,
              text: 'CGIAR Independent Advisory and Evaluation Service',
              link: '/communities/533721b9-47da-4534-b0b6-c4317b572a56'
            } as LinkMenuItemModel
          });
          menuList.push({
            id: `navigate_cgspace_link7`,
            parentID: 'navigate_cgspace',
            active: false,
            visible: true,
            model: {
              type: MenuItemType.LINK,
              text: 'Search all content',
              link: '/search'
            } as LinkMenuItemModel
          });
          menuList.push(
            {
              id: 'navigate_cgspace',
              active: false,
              visible: true,
              index: 2,
              model: {
                type: MenuItemType.TEXT,
                text: 'Navigate'
              } as TextMenuItemModel
            }
          );
          menuList.push({
            id: `cgiar_centers_link1`,
            parentID: 'cgiar_centers',
            active: false,
            visible: true,
            model: {
              type: MenuItemType.LINK,
              text: 'AfricaRice',
              link: '/communities/ae60fa80-f63a-4406-8b7a-4da18ee9e2f9'
            } as LinkMenuItemModel
          });
          menuList.push({
            id: `cgiar_centers_link2`,
            parentID: 'cgiar_centers',
            active: false,
            visible: true,
            model: {
              type: MenuItemType.LINK,
              text: 'Alliance of Bioversity International and CIAT',
              link: '/communities/b38ea726-475f-4247-a961-0d0b76e67f85'
            } as LinkMenuItemModel
          });
          menuList.push({
            id: `cgiar_centers_link3`,
            parentID: 'cgiar_centers',
            active: false,
            visible: true,
            model: {
              type: MenuItemType.LINK,
              text: 'Center for International Forestry Research',
              link: '/communities/2d6214fe-191f-4362-872b-ba1c43d080f7'
            } as LinkMenuItemModel
          });
          menuList.push({
            id: `cgiar_centers_link4`,
            parentID: 'cgiar_centers',
            active: false,
            visible: true,
            model: {
              type: MenuItemType.LINK,
              text: 'International Center for Agricultural Research in the Dry Areas',
              link: '/communities/0af71267-7f37-47ab-864c-755dd0fead59'
            } as LinkMenuItemModel
          });
          menuList.push({
            id: `cgiar_centers_link5`,
            parentID: 'cgiar_centers',
            active: false,
            visible: true,
            model: {
              type: MenuItemType.LINK,
              text: 'International Food Policy Research Institute',
              link: '/communities/8f1e9650-fe87-4e6e-889a-1cacfb747408'
            } as LinkMenuItemModel
          });
          menuList.push({
            id: `cgiar_centers_link6`,
            parentID: 'cgiar_centers',
            active: false,
            visible: true,
            model: {
              type: MenuItemType.LINK,
              text: 'International Institute of Tropical Agriculture',
              link: '/communities/0074d1e1-d1a0-4fa2-ae90-f9bfbd09ea7d'
            } as LinkMenuItemModel
          });
          menuList.push({
            id: `cgiar_centers_link7`,
            parentID: 'cgiar_centers',
            active: false,
            visible: true,
            model: {
              type: MenuItemType.LINK,
              text: 'International Livestock Research Institute',
              link: '/communities/bde7139c-d321-46bb-aef6-ae70799e5edb'
            } as LinkMenuItemModel
          });
          menuList.push({
            id: `cgiar_centers_link8`,
            parentID: 'cgiar_centers',
            active: false,
            visible: true,
            model: {
              type: MenuItemType.LINK,
              text: 'International Maize and Wheat Improvement Center',
              link: '/communities/116933b2-dac9-4663-9b7a-9e91b814946e'
            } as LinkMenuItemModel
          });
          menuList.push({
            id: `cgiar_centers_link9`,
            parentID: 'cgiar_centers',
            active: false,
            visible: true,
            model: {
              type: MenuItemType.LINK,
              text: 'International Potato Center',
              link: '/communities/86511537-bf7d-4fa3-90e8-7d0d5d2a7f41'
            } as LinkMenuItemModel
          });
          menuList.push({
            id: `cgiar_centers_link10`,
            parentID: 'cgiar_centers',
            active: false,
            visible: true,
            model: {
              type: MenuItemType.LINK,
              text: 'International Rice Research Institute',
              link: '/communities/45ea91cb-8e8b-4ed4-9278-d4a82ec5bfaa'
            } as LinkMenuItemModel
          });
          menuList.push({
            id: `cgiar_centers_link11`,
            parentID: 'cgiar_centers',
            active: false,
            visible: true,
            model: {
              type: MenuItemType.LINK,
              text: 'International Water Management Institute',
              link: '/communities/e9af9bd8-aca9-4efa-8bd8-1edb5fe1ac4c'
            } as LinkMenuItemModel
          });
          menuList.push({
            id: `cgiar_centers_link12`,
            parentID: 'cgiar_centers',
            active: false,
            visible: true,
            model: {
              type: MenuItemType.LINK,
              text: 'WorldFish',
              link: '/communities/b6a30a69-f509-4239-a943-c023703f9069'
            } as LinkMenuItemModel
          });
          // Note: we have two menus with index 2 because statistics seems to
          // be hard coded at 3.
          menuList.push(
            {
              id: 'cgiar_centers',
              active: false,
              visible: true,
              index: 2,
              model: {
                type: MenuItemType.TEXT,
                text: 'CGIAR Centers'
              } as TextMenuItemModel
            }
          );
        }
        menuList.forEach((menuSection) => this.menuService.addSection(MenuID.PUBLIC, Object.assign(menuSection, {
          shouldPersistOnRouteChange: true
        })));
      });

    return this.waitForMenu$(MenuID.PUBLIC);
  }

  /**
   * Initialize all menu sections and items for {@link MenuID.ADMIN}
   */
  createAdminMenu$() {
    this.createMainMenuSections();
    this.createSiteAdministratorMenuSections();
    this.createExportMenuSections();
    this.createImportMenuSections();
    this.createAccessControlMenuSections();

    return this.waitForMenu$(MenuID.ADMIN);
  }

  /**
   * Initialize the main menu sections.
   * edit_community / edit_collection is only included if the current user is a Community or Collection admin
   */
  createMainMenuSections() {
    combineLatest([
      this.authorizationService.isAuthorized(FeatureID.IsCollectionAdmin),
      this.authorizationService.isAuthorized(FeatureID.IsCommunityAdmin),
      this.authorizationService.isAuthorized(FeatureID.AdministratorOf),
      this.authorizationService.isAuthorized(FeatureID.CanSubmit),
      this.authorizationService.isAuthorized(FeatureID.CanEditItem),
    ]).subscribe(([isCollectionAdmin, isCommunityAdmin, isSiteAdmin, canSubmit, canEditItem]) => {
      const newSubMenuList = [
        {
          id: 'new_community',
          parentID: 'new',
          active: false,
          visible: isCommunityAdmin,
          model: {
            type: MenuItemType.ONCLICK,
            text: 'menu.section.new_community',
            function: () => {
              this.modalService.open(ThemedCreateCommunityParentSelectorComponent);
            }
          } as OnClickMenuItemModel,
        },
        {
          id: 'new_collection',
          parentID: 'new',
          active: false,
          visible: isCommunityAdmin,
          model: {
            type: MenuItemType.ONCLICK,
            text: 'menu.section.new_collection',
            function: () => {
              this.modalService.open(ThemedCreateCollectionParentSelectorComponent);
            }
          } as OnClickMenuItemModel,
        },
        {
          id: 'new_item',
          parentID: 'new',
          active: false,
          visible: canSubmit,
          model: {
            type: MenuItemType.ONCLICK,
            text: 'menu.section.new_item',
            function: () => {
              this.modalService.open(ThemedCreateItemParentSelectorComponent);
            }
          } as OnClickMenuItemModel,
        },
        {
          id: 'new_process',
          parentID: 'new',
          active: false,
          visible: isSiteAdmin,
          model: {
            type: MenuItemType.LINK,
            text: 'menu.section.new_process',
            link: '/processes/new'
          } as LinkMenuItemModel,
        },
      ];
      const editSubMenuList = [
        /* Edit */
        {
          id: 'edit_community',
          parentID: 'edit',
          active: false,
          visible: isCommunityAdmin,
          model: {
            type: MenuItemType.ONCLICK,
            text: 'menu.section.edit_community',
            function: () => {
              this.modalService.open(ThemedEditCommunitySelectorComponent);
            }
          } as OnClickMenuItemModel,
        },
        {
          id: 'edit_collection',
          parentID: 'edit',
          active: false,
          visible: isCollectionAdmin,
          model: {
            type: MenuItemType.ONCLICK,
            text: 'menu.section.edit_collection',
            function: () => {
              this.modalService.open(ThemedEditCollectionSelectorComponent);
            }
          } as OnClickMenuItemModel,
        },
        {
          id: 'edit_item',
          parentID: 'edit',
          active: false,
          visible: canEditItem,
          model: {
            type: MenuItemType.ONCLICK,
            text: 'menu.section.edit_item',
            function: () => {
              this.modalService.open(ThemedEditItemSelectorComponent);
            }
          } as OnClickMenuItemModel,
        },
      ];
      const newSubMenu = {
        id: 'new',
        active: false,
        visible: newSubMenuList.some(subMenu => subMenu.visible),
        model: {
          type: MenuItemType.TEXT,
          text: 'menu.section.new'
        } as TextMenuItemModel,
        icon: 'plus',
        index: 0
      };
      const editSubMenu = {
        id: 'edit',
        active: false,
        visible: editSubMenuList.some(subMenu => subMenu.visible),
        model: {
          type: MenuItemType.TEXT,
          text: 'menu.section.edit'
        } as TextMenuItemModel,
        icon: 'pencil-alt',
        index: 1
      };

      const menuList = [
        ...newSubMenuList,
        newSubMenu,
        ...editSubMenuList,
        editSubMenu,
        // TODO: enable this menu item once the feature has been implemented
        // {
        //   id: 'new_item_version',
        //   parentID: 'new',
        //   active: false,
        //   visible: true,
        //   model: {
        //     type: MenuItemType.LINK,
        //     text: 'menu.section.new_item_version',
        //     link: ''
        //   } as LinkMenuItemModel,
        // },

        /* Statistics */
        // TODO: enable this menu item once the feature has been implemented
        // {
        //   id: 'statistics_task',
        //   active: false,
        //   visible: true,
        //   model: {
        //     type: MenuItemType.LINK,
        //     text: 'menu.section.statistics_task',
        //     link: ''
        //   } as LinkMenuItemModel,
        //   icon: 'chart-bar',
        //   index: 8
        // },

        /* Control Panel */
        // TODO: enable this menu item once the feature has been implemented
        // {
        //   id: 'control_panel',
        //   active: false,
        //   visible: isSiteAdmin,
        //   model: {
        //     type: MenuItemType.LINK,
        //     text: 'menu.section.control_panel',
        //     link: ''
        //   } as LinkMenuItemModel,
        //   icon: 'cogs',
        //   index: 9
        // },

        /* Processes */
        {
          id: 'processes',
          active: false,
          visible: isSiteAdmin,
          model: {
            type: MenuItemType.LINK,
            text: 'menu.section.processes',
            link: '/processes'
          } as LinkMenuItemModel,
          icon: 'terminal',
          index: 10
        },
        {
          id: 'health',
          active: false,
          visible: isSiteAdmin,
          model: {
            type: MenuItemType.LINK,
            text: 'menu.section.health',
            link: '/health'
          } as LinkMenuItemModel,
          icon: 'heartbeat',
          index: 11
        },
      ];
      menuList.forEach((menuSection) => this.menuService.addSection(MenuID.ADMIN, Object.assign(menuSection, {
        shouldPersistOnRouteChange: true
      })));
    });
  }

  /**
   * Create menu sections dependent on whether or not the current user is a site administrator and on whether or not
   * the export scripts exist and the current user is allowed to execute them
   */
  createExportMenuSections() {
    const menuList = [
      // TODO: enable this menu item once the feature has been implemented
      // {
      //   id: 'export_community',
      //   parentID: 'export',
      //   active: false,
      //   visible: true,
      //   model: {
      //     type: MenuItemType.LINK,
      //     text: 'menu.section.export_community',
      //     link: ''
      //   } as LinkMenuItemModel,
      //   shouldPersistOnRouteChange: true
      // },
      // TODO: enable this menu item once the feature has been implemented
      // {
      //   id: 'export_collection',
      //   parentID: 'export',
      //   active: false,
      //   visible: true,
      //   model: {
      //     type: MenuItemType.LINK,
      //     text: 'menu.section.export_collection',
      //     link: ''
      //   } as LinkMenuItemModel,
      //   shouldPersistOnRouteChange: true
      // },
      // TODO: enable this menu item once the feature has been implemented
      // {
      //   id: 'export_item',
      //   parentID: 'export',
      //   active: false,
      //   visible: true,
      //   model: {
      //     type: MenuItemType.LINK,
      //     text: 'menu.section.export_item',
      //     link: ''
      //   } as LinkMenuItemModel,
      //   shouldPersistOnRouteChange: true
      // },
    ];
    menuList.forEach((menuSection) => this.menuService.addSection(MenuID.ADMIN, menuSection));

    observableCombineLatest([
      this.authorizationService.isAuthorized(FeatureID.AdministratorOf),
      this.scriptDataService.scriptWithNameExistsAndCanExecute(METADATA_EXPORT_SCRIPT_NAME)
    ]).pipe(
      filter(([authorized, metadataExportScriptExists]: boolean[]) => authorized && metadataExportScriptExists),
      take(1)
    ).subscribe(() => {
      // Hides the export menu for unauthorised people
      // If in the future more sub-menus are added,
      // it should be reviewed if they need to be in this subscribe
      this.menuService.addSection(MenuID.ADMIN, {
        id: 'export',
        active: false,
        visible: true,
        model: {
          type: MenuItemType.TEXT,
          text: 'menu.section.export'
        } as TextMenuItemModel,
        icon: 'file-export',
        index: 3,
        shouldPersistOnRouteChange: true
      });
      this.menuService.addSection(MenuID.ADMIN, {
        id: 'export_metadata',
        parentID: 'export',
        active: true,
        visible: true,
        model: {
          type: MenuItemType.ONCLICK,
          text: 'menu.section.export_metadata',
          function: () => {
            this.modalService.open(ExportMetadataSelectorComponent);
          }
        } as OnClickMenuItemModel,
        shouldPersistOnRouteChange: true
      });
      this.menuService.addSection(MenuID.ADMIN, {
        id: 'export_batch',
        parentID: 'export',
        active: false,
        visible: true,
        model: {
          type: MenuItemType.ONCLICK,
          text: 'menu.section.export_batch',
          function: () => {
            this.modalService.open(ExportBatchSelectorComponent);
          }
        } as OnClickMenuItemModel,
        shouldPersistOnRouteChange: true
      });
    });
  }

  /**
   * Create menu sections dependent on whether or not the current user is a site administrator and on whether or not
   * the import scripts exist and the current user is allowed to execute them
   */
  createImportMenuSections() {
    const menuList = [];
    menuList.forEach((menuSection) => this.menuService.addSection(MenuID.ADMIN, menuSection));

    observableCombineLatest([
      this.authorizationService.isAuthorized(FeatureID.AdministratorOf),
      this.scriptDataService.scriptWithNameExistsAndCanExecute(METADATA_IMPORT_SCRIPT_NAME)
    ]).pipe(
      filter(([authorized, metadataImportScriptExists]: boolean[]) => authorized && metadataImportScriptExists),
      take(1)
    ).subscribe(() => {
      // Hides the import menu for unauthorised people
      // If in the future more sub-menus are added,
      // it should be reviewed if they need to be in this subscribe
      this.menuService.addSection(MenuID.ADMIN, {
        id: 'import',
        active: false,
        visible: true,
        model: {
          type: MenuItemType.TEXT,
          text: 'menu.section.import'
        } as TextMenuItemModel,
        icon: 'file-import',
        index: 2,
        shouldPersistOnRouteChange: true,
      });
      this.menuService.addSection(MenuID.ADMIN, {
        id: 'import_metadata',
        parentID: 'import',
        active: true,
        visible: true,
        model: {
          type: MenuItemType.LINK,
          text: 'menu.section.import_metadata',
          link: '/admin/metadata-import'
        } as LinkMenuItemModel,
        shouldPersistOnRouteChange: true
      });
      this.menuService.addSection(MenuID.ADMIN, {
        id: 'import_batch',
        parentID: 'import',
        active: false,
        visible: true,
        model: {
          type: MenuItemType.LINK,
          text: 'menu.section.import_batch',
          link: '/admin/batch-import'
        } as LinkMenuItemModel,
        shouldPersistOnRouteChange: true
      });
    });
  }

  /**
   * Create menu sections dependent on whether or not the current user is a site administrator
   */
  createSiteAdministratorMenuSections() {
    this.authorizationService.isAuthorized(FeatureID.AdministratorOf).subscribe((authorized) => {
      const menuList = [
        /*  Admin Search */
        {
          id: 'admin_search',
          active: false,
          visible: authorized,
          model: {
            type: MenuItemType.LINK,
            text: 'menu.section.admin_search',
            link: '/admin/search'
          } as LinkMenuItemModel,
          icon: 'search',
          index: 5
        },
        /*  Registries */
        {
          id: 'registries',
          active: false,
          visible: authorized,
          model: {
            type: MenuItemType.TEXT,
            text: 'menu.section.registries'
          } as TextMenuItemModel,
          icon: 'list',
          index: 6
        },
        {
          id: 'registries_metadata',
          parentID: 'registries',
          active: false,
          visible: authorized,
          model: {
            type: MenuItemType.LINK,
            text: 'menu.section.registries_metadata',
            link: 'admin/registries/metadata'
          } as LinkMenuItemModel,
        },
        {
          id: 'registries_format',
          parentID: 'registries',
          active: false,
          visible: authorized,
          model: {
            type: MenuItemType.LINK,
            text: 'menu.section.registries_format',
            link: 'admin/registries/bitstream-formats'
          } as LinkMenuItemModel,
        },

        /* Curation tasks */
        {
          id: 'curation_tasks',
          active: false,
          visible: authorized,
          model: {
            type: MenuItemType.LINK,
            text: 'menu.section.curation_task',
            link: 'admin/curation-tasks'
          } as LinkMenuItemModel,
          icon: 'filter',
          index: 7
        },

        /* Workflow */
        {
          id: 'workflow',
          active: false,
          visible: authorized,
          model: {
            type: MenuItemType.LINK,
            text: 'menu.section.workflow',
            link: '/admin/workflow'
          } as LinkMenuItemModel,
          icon: 'user-check',
          index: 11
        },
        {
          id: 'system_wide_alert',
          active: false,
          visible: authorized,
          model: {
            type: MenuItemType.LINK,
            text: 'menu.section.system-wide-alert',
            link: '/admin/system-wide-alert'
          } as LinkMenuItemModel,
          icon: 'exclamation-circle',
          index: 12
        },
      ];

      menuList.forEach((menuSection) => this.menuService.addSection(MenuID.ADMIN, Object.assign(menuSection, {
        shouldPersistOnRouteChange: true
      })));
    });
  }

  /**
   * Create menu sections dependent on whether or not the current user can manage access control groups
   */
  createAccessControlMenuSections() {
    observableCombineLatest([
      this.authorizationService.isAuthorized(FeatureID.AdministratorOf),
      this.authorizationService.isAuthorized(FeatureID.CanManageGroups)
    ]).subscribe(([isSiteAdmin, canManageGroups]) => {
      const menuList = [
        /* Access Control */
        {
          id: 'access_control_people',
          parentID: 'access_control',
          active: false,
          visible: isSiteAdmin,
          model: {
            type: MenuItemType.LINK,
            text: 'menu.section.access_control_people',
            link: '/access-control/epeople'
          } as LinkMenuItemModel,
        },
        {
          id: 'access_control_groups',
          parentID: 'access_control',
          active: false,
          visible: canManageGroups,
          model: {
            type: MenuItemType.LINK,
            text: 'menu.section.access_control_groups',
            link: '/access-control/groups'
          } as LinkMenuItemModel,
        },
        {
          id: 'access_control_bulk',
          parentID: 'access_control',
          active: false,
          visible: isSiteAdmin,
          model: {
            type: MenuItemType.LINK,
            text: 'menu.section.access_control_bulk',
            link: '/access-control/bulk-access'
          } as LinkMenuItemModel,
        },
        // TODO: enable this menu item once the feature has been implemented
        // {
        //   id: 'access_control_authorizations',
        //   parentID: 'access_control',
        //   active: false,
        //   visible: authorized,
        //   model: {
        //     type: MenuItemType.LINK,
        //     text: 'menu.section.access_control_authorizations',
        //     link: ''
        //   } as LinkMenuItemModel,
        // },
        {
          id: 'access_control',
          active: false,
          visible: canManageGroups || isSiteAdmin,
          model: {
            type: MenuItemType.TEXT,
            text: 'menu.section.access_control'
          } as TextMenuItemModel,
          icon: 'key',
          index: 4
        },
      ];

      menuList.forEach((menuSection) => this.menuService.addSection(MenuID.ADMIN, Object.assign(menuSection, {
        shouldPersistOnRouteChange: true,
      })));
    });
  }
}
