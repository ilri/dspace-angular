import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { DSpaceObjectType } from '../../../../core/shared/dspace-object-type.model';
import { DSpaceObject } from '../../../../core/shared/dspace-object.model';
import { hasValue } from '../../../empty.util';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {
  DSOSelectorModalWrapperComponent,
  SelectorActionType
} from '../dso-selector-modal-wrapper.component';
import {
    getCommunityCreateRoute,
    COMMUNITY_PARENT_PARAMETER
} from '../../../../community-page/community-page-routing-paths';
import { SortDirection, SortOptions } from '../../../../core/cache/models/sort-options.model';
import { environment } from '../../../../../environments/environment';
import { FeatureID } from '../../../../core/data/feature-authorization/feature-id';
import { AuthorizationDataService } from '../../../../core/data/feature-authorization/authorization-data.service';
import { Observable } from 'rxjs';

/**
 * Component to wrap a button - for top communities -
 * and a list of parent communities - for sub communities
 * inside a modal
 * Used to create a new community
 */

@Component({
  selector: 'ds-create-community-parent-selector',
  styleUrls: ['./create-community-parent-selector.component.scss'],
  templateUrl: './create-community-parent-selector.component.html',
})
export class CreateCommunityParentSelectorComponent extends DSOSelectorModalWrapperComponent implements OnInit {
  objectType = DSpaceObjectType.COMMUNITY;
  selectorTypes = [DSpaceObjectType.COMMUNITY];
  action = SelectorActionType.CREATE;
  defaultSort = new SortOptions(environment.comcolSelectionSort.sortField, environment.comcolSelectionSort.sortDirection as SortDirection);
  isAdmin$: Observable<boolean>;

  constructor(protected activeModal: NgbActiveModal, protected route: ActivatedRoute, private router: Router, protected authorizationService: AuthorizationDataService) {
    super(activeModal, route);
  }

  ngOnInit() {
    this.isAdmin$ = this.authorizationService.isAuthorized(FeatureID.AdministratorOf);
  }

  /**
   * Navigate to the community create page
   */
  navigate(dso: DSpaceObject) {
    let navigationExtras: NavigationExtras = {};
    if (hasValue(dso)) {
      navigationExtras = {
        queryParams: {
          [COMMUNITY_PARENT_PARAMETER]: dso.uuid,
        }
      };
    }
    this.router.navigate([getCommunityCreateRoute()], navigationExtras);
  }
}
