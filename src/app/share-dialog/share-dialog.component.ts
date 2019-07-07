import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UIParams, UIResponse, FacebookService } from 'ngx-facebook';

@Component({
    selector: 'share-dialog',
    templateUrl: 'share-dialog.component.html',
    styleUrls: ['share-dialog.component.scss']
})
export class ShareDialog {

    constructor(
        public dialogRef: MatDialogRef<ShareDialog>,
        private fb: FacebookService,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        let initParams = {
            appId: 'api_key',
            xfbml: true,
            version: 'v3.3'
        };

        fb.init(initParams);
    }

    shareOnWhatsApp() {
        this.dialogRef.close();
    }

    shareOnFacebook() {
        this.dialogRef.close();

        let params: UIParams = {
            href: `http://127.0.0.1:4200/${this.data.location}`,
            method: 'share'
        };

        this.fb.ui(params)
            .then((res: UIResponse) => console.log(res))
            .catch((e: any) => console.error(e));
    }
}