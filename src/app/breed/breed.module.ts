import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreedRoutingModule } from './breed.routing.module';
import { BreedListComponent } from './breed-list/breed-list.component';
import { SharedModule } from 'src/common/modules/shared.module';
import { BreedListService } from './breed-list/breed-list.service';
import { BreedDetailComponent } from './breed-detail/breed-detail.component';
import { BreedDetailService} from './breed-detail/breed-detail.service';
@NgModule({
  declarations: [
    BreedListComponent,
    BreedDetailComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    BreedRoutingModule
  ],
  providers: [
    BreedListService,
    BreedDetailService

  ]
})
export class BreedModule { }
