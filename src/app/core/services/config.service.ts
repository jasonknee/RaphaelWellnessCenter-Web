import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { NavigationStart, Router } from '@angular/router';
import { Platform } from '@angular/cdk/platform';
import * as firebase from "firebase";

@Injectable()
export class FuseConfigService {
    settings: any;
    defaultSettings: any;
    onSettingsChanged: BehaviorSubject<any>;

    /**
     * @param router
     * @param platform
     */
    constructor(
        private router: Router,
        public platform: Platform
    ) {
        // Set the default settings
        this.defaultSettings = {
            database: {
                firebase: true
            },
            layout: {
                navigation: 'none', // 'right', 'left', 'top', 'none'
                navigationFolded: true, // true, false
                toolbar: 'below', // 'above', 'below', 'none'
                footer: 'none', // 'above', 'below', 'none'
                mode: 'fullwidth' // 'boxed', 'fullwidth'
            },
            colorClasses: {
                toolbar: 'mat-white-500-bg',
                navbar: 'mat-fuse-dark-700-bg',
                footer: 'mat-fuse-dark-900-bg'
            },
            customScrollbars: true,
            routerAnimation: 'fadeIn' // fadeIn, slideUp, slideDown, slideRight, slideLeft, none
        };

        if (this.defaultSettings.database.firebase == true) {
            // Set the configuration for your app
            // TODO: Replace with your project's config object
            var config = {
                apiKey: "AIzaSyDjP3ZEYceddaURs9l-g7ukZvcBmtFvZGg",
                authDomain: "raphaelwellnesscenter-suja.firebaseapp.com",
                databaseURL: "https://raphaelwellnesscenter-suja.firebaseio.com/",
                storageBucket: "raphaelwellnesscenter-suja.appspot.com"
            };
            firebase.initializeApp(config);

            // Get a reference to the database service
            var database = firebase.database();

        }

        /**
         * Disable Custom Scrollbars if Browser is Mobile
         */
        if (this.platform.ANDROID || this.platform.IOS) {
            this.defaultSettings.customScrollbars = false;
        }

        // Set the settings from the default settings
        this.settings = Object.assign({}, this.defaultSettings);

        // Reload the default settings on every navigation start
        router.events.subscribe(
            (event) => {
                if (event instanceof NavigationStart) {
                    this.setSettings({ layout: this.defaultSettings.layout });
                }
            }
        );

        // Create the behavior subject
        this.onSettingsChanged = new BehaviorSubject(this.settings);
    }

    /**
     * Sets settings
     * @param settings
     */
    setSettings(settings) {
        // Set the settings from the given object
        this.settings = Object.assign({}, this.settings, settings);

        // Trigger the event
        this.onSettingsChanged.next(this.settings);
    }
}
