import { FrameLocator, Page } from "@playwright/test";

export  class BaseFrame {
    constructor(protected page: Page, protected iframeLocator: string) {}

    protected get iframe(): FrameLocator {
        return this.page.frameLocator(this.iframeLocator);
    };
};