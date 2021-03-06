import { NgModule } from '@angular/core';
import { MatSliderModule,
        MatToolbarModule,
        MatTabsModule,
        MatIconModule,
        MatButtonModule,
        MatSidenavModule,
        MatListModule,
        MatSelectModule,
        MatCardModule,
        MatGridListModule,
        MatStepperModule,
        MatMenuModule,
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatProgressSpinnerModule,
        MatProgressBarModule} from '@angular/material';


@NgModule({
    imports: [MatSliderModule,
            MatToolbarModule,
            MatTabsModule,
            MatIconModule,
            MatButtonModule,
            MatSidenavModule,
            MatListModule,
            MatSelectModule,
            MatCardModule,
            MatGridListModule,
            MatStepperModule,
            MatMenuModule,
            MatInputModule,
            MatDatepickerModule,
            MatNativeDateModule,
            MatProgressSpinnerModule,
            MatProgressBarModule],

    exports: [MatSliderModule,
            MatToolbarModule,
            MatTabsModule,
            MatIconModule,
            MatButtonModule,
            MatSidenavModule,
            MatListModule,
            MatSelectModule,
            MatCardModule,
            MatGridListModule,
            MatStepperModule,
            MatMenuModule,
            MatInputModule,
            MatDatepickerModule,
            MatNativeDateModule,
            MatProgressSpinnerModule,
            MatProgressBarModule],

        providers: [MatDatepickerModule,  ]
})
export class MaterialModule {}
