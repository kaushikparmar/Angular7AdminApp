// ANGULAR LIBRARY IMPORTS
import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
// EXTERNAL IMPORTS
import { ImageCropperComponent, CropperSettings } from 'ngx-img-cropper';
import { Bounds } from 'ngx-img-cropper/lib/image-cropper/model/bounds';
// Interface For Modal Data Handling
interface IModalData {
    modalHeight?: number;
    modalWidth?: number;
    centerTouchRadius: number;
    cropperMinWidth: number;
    cropperMinHeight: number;
    croppedOutputWidth: number;
    croppedOutputHeight: number;
    canvasWidth: number;
    canvasHeight: number;
    rounded: boolean;
    noFileInput: boolean;
}
@Component({
    selector: 'pb-name',
    templateUrl: './img-cropper-modal.component.html',
    styleUrls: ['./img-cropper-modal.component.scss']
})
export class ImgCropperModalComponent implements OnInit {

    // GET THE CROPPER INSTANCE
    @ViewChild('cropper', undefined) cropper: ImageCropperComponent;

    // CROPPER SETTING HOLDER
    public cropperSettings: CropperSettings;
    // IMAGE AND OUTPUT HOLDER
    public localData: any = {};
    // CROPPED IMAGE WIDTH
    private croppedImageWidth: number;
    // CROPPED IMAGE HEIGHT
    private croppedImageHeight: number;

    constructor(
        // INJECT METERIAL DIALOG REFERENCE
        public dialogRef: MatDialogRef<ImgCropperModalComponent>,
        // INJECT DIALOG CONFIGUARATION
        @Inject(MAT_DIALOG_DATA) public data: IModalData
    ) { }

    /**
     * CONVERT BASE64 TO BLOB
     * @param Base64Image Pass base64 image data to convert into blob
     */
    private convertBase64ToBlob(Base64Image: any) {
        // SPLIT INTO TWO PARTS
        const parts = Base64Image.split(';base64,');
        // HOLD THE CONTENT TYPE
        const imageType = parts[0].split(':')[1];
        // DECODE BASE64 STRING
        const decodedData = window.atob(parts[1]);
        // CREATE UNIT8ARRAY OF SIZE SAME AS ROW DATA LENGTH
        const uInt8Array = new Uint8Array(decodedData.length);
        // INSERT ALL CHARACTER CODE INTO UINT8ARRAY
        for (let i = 0; i < decodedData.length; ++i) {
            uInt8Array[i] = decodedData.charCodeAt(i);
        }
        // RETURN BLOB IMAGE AFTER CONVERSION
        return new Blob([uInt8Array], { type: imageType });
    }

    public cropped(bounds: Bounds) {
        this.croppedImageHeight = bounds.bottom - bounds.top;
        this.croppedImageWidth = bounds.right - bounds.left;
    }

    /**
     * EXECUTE CLOSE FUNCTION WHEN CROPPING IS DONE AND PASS THE OUTPUT TO THE COMPONENT WHICH WANT TO CROP THE IMAGE
     * @param data OUTPUT DATA
     */
    public close(data: any): void {
        // CHECK IF BASE64 IMAGE EXIST
        if (data.image) {
            data['file'] = this.convertBase64ToBlob(data.image);
            data['croppedImageHeight'] = this.croppedImageHeight;
            data['croppedImageWidth'] = this.croppedImageWidth;
        }
        // PASS THE DATA
        this.dialogRef.close(data);
    }

    /**
     * ANGULAR LIFECYCLE EVENT FOR COMPONENT INITIALIZATION
     */
    public ngOnInit(): void {
        // INITIALIZE CROPPER SETTINGS
        this.cropperSettings = new CropperSettings();
        // DEFINE EXPECTED CENTER_TOUCH_RADIUS
        this.cropperSettings.centerTouchRadius = this.data['centerTouchRadius'];
        // DEFINE EXPECTED CROPPER MIN_WIDTH
        this.cropperSettings.minWidth = this.data['cropperMinWidth'];
        // DEFINE EXPECTED MIN_HEIGHT
        this.cropperSettings.minHeight = this.data['cropperMinHeight'];
        // DEFINE EXPECTED CROPPED OUTPUT WIDTH
        this.cropperSettings.croppedWidth = this.data['croppedOutputWidth'];
        // DEFINE EXPECTED CROPPED OUTPUT HEIGHT
        this.cropperSettings.croppedHeight = this.data['croppedOutputHeight'];
        // DEFINE EXPECTED CANVAS WIDTH
        this.cropperSettings.canvasWidth = this.data['canvasWidth'];
        // DEFINE EXPECTED CANVAS HEIGHT
        this.cropperSettings.canvasHeight = this.data['canvasHeight'];
        // DEFINE EXPECTED IMAGE IS ROUNDED
        this.cropperSettings.rounded = this.data['rounded'];
        // DEFINE EXPECTED FILE_INPUT BUTTON OR NOT
        this.cropperSettings.noFileInput = this.data['noFileInput'];
        // DEFINE ASPECT RATIO
        // this.cropperSettings.keepAspect = false;
        // Prepare Image Data to pass in the modal
        const image: any = new Image();
        image.src = this.data['file'];
        // Assign cropper settings to the template instance
        this.cropper.settings = this.cropperSettings;
        this.cropper.setImage(image);
    }
}
