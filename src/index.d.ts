import Package from "../src/interfaces/Package";

interface MyWindow extends Window {
    exports: {__esModule?: true, default?: Package}
}

declare var window: MyWindow & typeof globalThis;
