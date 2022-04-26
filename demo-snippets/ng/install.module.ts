import { NO_ERRORS_SCHEMA, NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';

import { CheckBoxModule } from '@nativescript-community/ui-checkbox/angular';

import { BasicComponent } from './basic/basic.component';
import { ItemService } from './basic/item.service';

export const COMPONENTS = [BasicComponent];
@NgModule({
    imports: [CheckBoxModule, ReactiveFormsModule],
    exports: [CheckBoxModule],
    providers: [ItemService],
    schemas: [NO_ERRORS_SCHEMA]
})
export class InstallModule {}

export function installPlugin() {}

export const demos = [{ name: 'Basic', path: 'basic', component: BasicComponent }];
