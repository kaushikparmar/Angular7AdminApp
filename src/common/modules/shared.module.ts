import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EqualValidator } from '../directives/equal-validator.directive';  // import validator
import { QuillModule } from 'ngx-quill';
// import { ImageCropperModule } from 'ngx-image-cropper';
import { MatMenuModule } from '@angular/material/menu';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import {  MatButtonModule,
          MatCheckboxModule,
          MatCardModule,
          MatSelectModule,
          MatFormFieldModule,
          MatInputModule,
          MatSlideToggleModule,
          MatIconModule,
          MatToolbarModule,
          MatProgressSpinnerModule,
          MatSidenavModule,
          MatListModule,
          MatTableModule,
          MatPaginatorModule,
          MatNativeDateModule,
          MatTabsModule,
          MatGridListModule,
          MatExpansionModule,
          MatSortModule
        } from '@angular/material';
// import { ImageCropperModalComponent } from '../components/image-cropper-modal/image-cropper-modal.component';
import {ConfiromationModalComponent} from '../components/confiromation-modal/confiromation-modal.component';
import { GalleryModule } from '@ks89/angular-modal-gallery';
import { ImageCropperModule } from 'ngx-img-cropper';
import { ImgCropperModalComponent } from '../components/img-cropper-modal/img-cropper-modal.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    ImgCropperModalComponent,
    // ImageCropperModalComponent,
    ConfiromationModalComponent,
    EqualValidator
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatCheckboxModule,
    MatCardModule,
    MatTabsModule,
    MatGridListModule,
    MatIconModule,
    MatSelectModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    MatBadgeModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    MatExpansionModule,
    ImageCropperModule,
    GalleryModule.forRoot(),
    QuillModule,
    MatSortModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatCardModule,
    MatTabsModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatSelectModule,
    MatSidenavModule,
    MatGridListModule,
    MatSlideToggleModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    MatBadgeModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    MatExpansionModule,
    ImageCropperModule,
    QuillModule,
    // ImageCropperModalComponent,
    GalleryModule,
    EqualValidator,
    MatSortModule
  ],
  entryComponents: [ ImgCropperModalComponent,
    //  ImageCropperModalComponent,
      ConfiromationModalComponent],
  providers: [],
})
export class SharedModule { }
