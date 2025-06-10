import { LinkMenuItemModel } from '../app/shared/menu/menu-item/models/link.model';
import { Config } from './config.interface';

/**
 * Config that determines how the recentSubmissions list showing at home page
 */
export interface CustomMenusConfig extends Config {
  id: string;
  parentID?: string;
  active: boolean;
  visible: boolean;
  index?: number;
  model: LinkMenuItemModel;
}
