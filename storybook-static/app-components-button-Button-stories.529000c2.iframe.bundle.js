(self.webpackChunktaskbox=self.webpackChunktaskbox||[]).push([[491],{"./src/app/components/button/button.css?ngResource":(module,__unused_webpack_exports,__webpack_require__)=>{var ___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___=__webpack_require__("./node_modules/@angular-devkit/build-angular/node_modules/css-loader/dist/runtime/noSourceMaps.js"),___CSS_LOADER_EXPORT___=__webpack_require__("./node_modules/@angular-devkit/build-angular/node_modules/css-loader/dist/runtime/api.js")(___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___);___CSS_LOADER_EXPORT___.push([module.id,'.storybook-button {\n  font-family: "Nunito Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;\n  font-weight: 700;\n  border: 0;\n  border-radius: 3em;\n  cursor: pointer;\n  display: inline-block;\n  line-height: 1;\n}\n.storybook-button--primary {\n  color: white;\n  background-color: #1ea7fd;\n}\n.storybook-button--secondary {\n  color: #333;\n  background-color: transparent;\n  box-shadow: rgba(0, 0, 0, 0.15) 0px 0px 0px 1px inset;\n}\n.storybook-button--small {\n  font-size: 12px;\n  padding: 10px 16px;\n}\n.storybook-button--medium {\n  font-size: 14px;\n  padding: 11px 20px;\n}\n.storybook-button--large {\n  font-size: 16px;\n  padding: 12px 24px;\n}\n',""]),module.exports=___CSS_LOADER_EXPORT___.toString()},"./node_modules/@angular-devkit/build-angular/node_modules/css-loader/dist/runtime/api.js":module=>{"use strict";module.exports=function(cssWithMappingToString){var list=[];return list.toString=function toString(){return this.map((function(item){var content="",needLayer=void 0!==item[5];return item[4]&&(content+="@supports (".concat(item[4],") {")),item[2]&&(content+="@media ".concat(item[2]," {")),needLayer&&(content+="@layer".concat(item[5].length>0?" ".concat(item[5]):""," {")),content+=cssWithMappingToString(item),needLayer&&(content+="}"),item[2]&&(content+="}"),item[4]&&(content+="}"),content})).join("")},list.i=function i(modules,media,dedupe,supports,layer){"string"==typeof modules&&(modules=[[null,modules,void 0]]);var alreadyImportedModules={};if(dedupe)for(var k=0;k<this.length;k++){var id=this[k][0];null!=id&&(alreadyImportedModules[id]=!0)}for(var _k=0;_k<modules.length;_k++){var item=[].concat(modules[_k]);dedupe&&alreadyImportedModules[item[0]]||(void 0!==layer&&(void 0===item[5]||(item[1]="@layer".concat(item[5].length>0?" ".concat(item[5]):""," {").concat(item[1],"}")),item[5]=layer),media&&(item[2]?(item[1]="@media ".concat(item[2]," {").concat(item[1],"}"),item[2]=media):item[2]=media),supports&&(item[4]?(item[1]="@supports (".concat(item[4],") {").concat(item[1],"}"),item[4]=supports):item[4]="".concat(supports)),list.push(item))}},list}},"./node_modules/@angular-devkit/build-angular/node_modules/css-loader/dist/runtime/noSourceMaps.js":module=>{"use strict";module.exports=function(i){return i[1]}},"./src/app/components/button/Button.stories.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Large:()=>Large,Primary:()=>Primary,Secondary:()=>Secondary,Small:()=>Small,__namedExportsOrder:()=>__namedExportsOrder,default:()=>Button_stories});var dist=__webpack_require__("./node_modules/@storybook/test/dist/index.mjs"),tslib_es6=__webpack_require__("./node_modules/tslib/tslib.es6.mjs"),buttonngResource=__webpack_require__("./src/app/components/button/button.css?ngResource"),buttonngResource_default=__webpack_require__.n(buttonngResource),common=__webpack_require__("./node_modules/@angular/common/fesm2022/common.mjs"),core=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs");let ButtonComponent=class ButtonComponent{constructor(){this.primary=!1,this.size="medium",this.label="Button",this.onClick=new core.EventEmitter}get classes(){const mode=this.primary?"storybook-button--primary":"storybook-button--secondary";return["storybook-button",`storybook-button--${this.size}`,mode]}static{this.propDecorators={primary:[{type:core.Input}],backgroundColor:[{type:core.Input}],size:[{type:core.Input}],label:[{type:core.Input}],onClick:[{type:core.Output}]}}};ButtonComponent=(0,tslib_es6.Cg)([(0,core.Component)({selector:"storybook-button",imports:[common.CommonModule],standalone:!0,template:' <button\n    type="button"\n    (click)="onClick.emit($event)"\n    [ngClass]="classes"\n    [ngStyle]="{ \'background-color\': backgroundColor }"\n  >\n    {{ label }}\n  </button>',styles:[buttonngResource_default()]})],ButtonComponent);const Button_stories={title:"Components/Button",component:ButtonComponent,tags:["autodocs"],argTypes:{backgroundColor:{control:"color"}},args:{onClick:(0,dist.fn)()}},Primary={args:{primary:!0,label:"Button"}},Secondary={args:{label:"Button"}},Large={args:{size:"large",label:"Button"}},Small={args:{size:"small",label:"Button"}},__namedExportsOrder=["Primary","Secondary","Large","Small"];Primary.parameters={...Primary.parameters,docs:{...Primary.parameters?.docs,source:{originalSource:"{\n  args: {\n    primary: true,\n    label: 'Button'\n  }\n}",...Primary.parameters?.docs?.source}}},Secondary.parameters={...Secondary.parameters,docs:{...Secondary.parameters?.docs,source:{originalSource:"{\n  args: {\n    label: 'Button'\n  }\n}",...Secondary.parameters?.docs?.source}}},Large.parameters={...Large.parameters,docs:{...Large.parameters?.docs,source:{originalSource:"{\n  args: {\n    size: 'large',\n    label: 'Button'\n  }\n}",...Large.parameters?.docs?.source}}},Small.parameters={...Small.parameters,docs:{...Small.parameters?.docs,source:{originalSource:"{\n  args: {\n    size: 'small',\n    label: 'Button'\n  }\n}",...Small.parameters?.docs?.source}}}}}]);