(self.webpackChunktaskbox=self.webpackChunktaskbox||[]).push([[159],{"./src/app/components/toggle/toggle.component.scss?ngResource":(module,__unused_webpack_exports,__webpack_require__)=>{var ___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___=__webpack_require__("./node_modules/@angular-devkit/build-angular/node_modules/css-loader/dist/runtime/noSourceMaps.js"),___CSS_LOADER_EXPORT___=__webpack_require__("./node_modules/@angular-devkit/build-angular/node_modules/css-loader/dist/runtime/api.js")(___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___);___CSS_LOADER_EXPORT___.push([module.id,'.switch {\n  position: relative;\n  display: inline-block;\n  width: 60px;\n  height: 34px;\n}\n\n.switch input {\n  opacity: 0;\n  width: 0;\n  height: 0;\n}\n\n.slider {\n  position: absolute;\n  cursor: pointer;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background-color: #ccc;\n  transition: 0.4s;\n  border-radius: 34px;\n}\n\n.slider:before {\n  position: absolute;\n  content: "";\n  height: 26px;\n  width: 26px;\n  left: 4px;\n  bottom: 4px;\n  background-color: white;\n  transition: 0.4s;\n  border-radius: 50%;\n}\n\ninput:checked + .slider {\n  background-color: #2196F3;\n}\n\ninput:checked + .slider:before {\n  transform: translateX(26px);\n}',""]),module.exports=___CSS_LOADER_EXPORT___.toString()},"./node_modules/@angular-devkit/build-angular/node_modules/css-loader/dist/runtime/api.js":module=>{"use strict";module.exports=function(cssWithMappingToString){var list=[];return list.toString=function toString(){return this.map((function(item){var content="",needLayer=void 0!==item[5];return item[4]&&(content+="@supports (".concat(item[4],") {")),item[2]&&(content+="@media ".concat(item[2]," {")),needLayer&&(content+="@layer".concat(item[5].length>0?" ".concat(item[5]):""," {")),content+=cssWithMappingToString(item),needLayer&&(content+="}"),item[2]&&(content+="}"),item[4]&&(content+="}"),content})).join("")},list.i=function i(modules,media,dedupe,supports,layer){"string"==typeof modules&&(modules=[[null,modules,void 0]]);var alreadyImportedModules={};if(dedupe)for(var k=0;k<this.length;k++){var id=this[k][0];null!=id&&(alreadyImportedModules[id]=!0)}for(var _k=0;_k<modules.length;_k++){var item=[].concat(modules[_k]);dedupe&&alreadyImportedModules[item[0]]||(void 0!==layer&&(void 0===item[5]||(item[1]="@layer".concat(item[5].length>0?" ".concat(item[5]):""," {").concat(item[1],"}")),item[5]=layer),media&&(item[2]?(item[1]="@media ".concat(item[2]," {").concat(item[1],"}"),item[2]=media):item[2]=media),supports&&(item[4]?(item[1]="@supports (".concat(item[4],") {").concat(item[1],"}"),item[4]=supports):item[4]="".concat(supports)),list.push(item))}},list}},"./node_modules/@angular-devkit/build-angular/node_modules/css-loader/dist/runtime/noSourceMaps.js":module=>{"use strict";module.exports=function(i){return i[1]}},"./src/app/components/toggle/toggle.component.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{a:()=>ToggleComponent});var tslib_es6=__webpack_require__("./node_modules/tslib/tslib.es6.mjs");var toggle_componentngResource=__webpack_require__("./src/app/components/toggle/toggle.component.scss?ngResource"),toggle_componentngResource_default=__webpack_require__.n(toggle_componentngResource),core=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs");let ToggleComponent=class ToggleComponent{constructor(){this.isChecked=!1,this.toggleChange=new core.EventEmitter}onToggleChange(){this.isChecked=!this.isChecked,this.toggleChange.emit(this.isChecked)}static{this.propDecorators={isChecked:[{type:core.Input}],toggleChange:[{type:core.Output}]}}};ToggleComponent=(0,tslib_es6.Cg)([(0,core.Component)({selector:"app-toggle",template:'<label class="switch">\r\n  <input type="checkbox" [checked]="isChecked" (change)="onToggleChange()" />\r\n  <span class="slider round"></span>\r\n</label>\r\n',standalone:!0,styles:[toggle_componentngResource_default()]})],ToggleComponent)},"./src/app/components/toggle/toggle.stories.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Basic:()=>Basic,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});const __WEBPACK_DEFAULT_EXPORT__={title:"Components/Toggler",component:__webpack_require__("./src/app/components/toggle/toggle.component.ts").a,tags:["autodocs"]},Basic={args:{isChecked:!1}},__namedExportsOrder=["Basic"];Basic.parameters={...Basic.parameters,docs:{...Basic.parameters?.docs,source:{originalSource:"{\n  args: {\n    isChecked: false\n  }\n}",...Basic.parameters?.docs?.source}}}}}]);