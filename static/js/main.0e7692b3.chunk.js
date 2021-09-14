(this["webpackJsonpkendo-react-file-manager"]=this["webpackJsonpkendo-react-file-manager"]||[]).push([[0],{45:function(e,t,a){},67:function(e,t,a){"use strict";a.r(t);var n=a(0),i=a.n(n),c=a(17),s=a.n(c),l=(a(45),a(22)),o=a(13),r=a(16),d=a(23),m=a(3),u=a(15),f=a(2),j=a(6),b=a(12),h=a(24),p=a(37),v=function(e){if(!e)return null;switch(e.split(".")[1]||null){case"xlsx":case"xls":return{icon:"k-i-file-data",type:"Data"};case"jpg":case"png":case".JPG":return{icon:"k-i-file-image",type:"Image"};case"txt":case"doc":case"docx":return{icon:"k-i-file-txt",type:"Text"};case"mp3":case"mp4":case"mp":return{icon:"k-i-audio",type:"Text"};case null:return{icon:"k-i-folder",type:"Folder"};default:return{icon:"k-i-file k-i-file-vertical",type:"Folder"}}},k=function(e,t){return e?t.formatDate(e,"d.MM.y  h:mm:ss aa  EEEE"):e},x=function(e,t){return e?function(e,t){var a=[];return e&&e.forEach((function(e){var n=k(e.dateCreated||null,t);a.push({path:e.path,name:e.name,dateCreated:n,size:e.size,items:e.items,icon:e.icon})})),a}(e,t):[]},O=function e(t){var a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,n=[];return t.forEach((function(t){t.name&&!t.name.includes(".")&&n.push({path:t.path,name:t.name,expanded:t.expanded,selected:!!a&&a.name===t.name,dateCreated:new Date,icon:v(void 0),items:t.items&&t.items.length?e(t.items,a):[]})})),n},g=function e(t){var a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,n=[];return t.forEach((function(t){t.name&&n.push(Object(o.a)(Object(o.a)({},t),{},{items:t.items&&t.items.length?e(t.items,a):[]}))})),n},C=function e(t,a){if(!a)return t;if(Array.isArray(t))for(var n=0;n<t.length;n++){var i=e(t[n],a);if(i)return i}else if("object"===typeof t&&void 0!==t.path&&t.path===a.path)return t;return void 0!==t.items&&t.items.length>0?e(t.items,a):null},w=function e(t,a){if(!a)return t;for(var n=0;n<t.length;n++)if(t[n].name===a.name)return t[n];for(var i=0;i<t.length;i++){var c;if(null===(c=t[i].items)||void 0===c?void 0:c.length){var s=e(t[i].items,a);if(s)return s}}},N=function(e){return JSON.parse(JSON.stringify(e))},D=0,y=function(e,t,a){var n=Array.isArray(e)?N(e):Object(f.f)(e),i=t?Object(f.f)(t):{};if(!t&&Array.isArray(n)){var c=D?"New Folder (".concat(D,")"):"New Folder";return D++,n.push({path:"Home/".concat(c),name:c,dateCreated:k(new Date,a),size:124,icon:v(void 0)}),n}if(Array.isArray(n))for(var s=0;s<n.length;s++){var l=C(n[s],i);if(l){var o=D?"New Folder (".concat(D,")"):"New Folder";return D++,l.items||(l.items=[]),l.items.push({path:"".concat(l.path,"/").concat(o),name:o,dateCreated:k(new Date,a),size:124,icon:v(void 0)}),n}}else if("object"===typeof e&&void 0!==e.name&&e.name===i.name)return e;return void 0!==e.items&&e.items.length>0?C(e.items,i):null},M=function(e,t){return e.listView||"grid"===t?e.gridView||"list"===t?e:{gridView:!0,listView:!1}:{gridView:!1,listView:!0}},S=function(e,t){return e.sortDesc||"asc"===t?e.sortAsc||"desc"===t?e:{sortAsc:!0,sortDesc:!1}:{sortAsc:!1,sortDesc:!0}},I=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:2;if(0===e)return"0 Bytes";var a=1024,n=t<0?0:t,i=["Bytes","KB","MB","GB","TB","PB","EB","ZB","YB"],c=Math.floor(Math.log(e)/Math.log(a));return parseFloat((e/Math.pow(a,c)).toFixed(n))+" "+i[c]},z=function e(t,a,n){if(t)for(var i=0;i<t.length;i++)for(var c=0;c<t.length;c++){if(t[c].name===a.name)return t[c].name=n,t[c].dateModified=new Date,t;if(t[c].items){var s=e(t[c].items,a,n);if(s)return s}}},F=function e(t,a){for(var n=0;n<t.length;n++)for(var i=0;i<t.length;i++){if(t[i].path===a.path)return t[i]={},t;if(t[i].items){var c=e(t[i].items,a);if(c)return c}}},V=function e(t,a){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[{id:"Home",name:"Home",iconClass:"k-i-home"}];if(!a)return n;for(var i=0;i<t.length;i++)if(t[i].name===a.name)return n.push({id:t[i].name,name:t[i].name,items:t[i].items}),n;for(var c=0;c<t.length;c++){var s;if(null===(s=t[c].items)||void 0===s?void 0:s.length){n.push({id:t[c].name,name:t[c].name,items:t[c].items});var l=e(t[c].items,a,n);if(l)return l;n=[{id:"Home",name:"Home",iconClass:"k-i-home"}]}}},A=a(4),H=function(e){var t=n.useState(!1),a=Object(r.a)(t,2),i=a[0],c=a[1],s=n.useState({gridView:!0,listView:!1}),l=Object(r.a)(s,2),o=l[0],d=l[1],m=function(e){c(!i)},u=function(t){e.onFileChange({files:t.newState,event:t})};return Object(A.jsxs)(j.d,{className:"k-filemanager-toolbar",children:[Object(A.jsx)(j.a,{onClick:function(t){e.onNewFolderClick(t)},children:"New Folder"}),Object(A.jsx)(j.a,{onClick:m,children:"Upload"}),i&&Object(A.jsxs)(h.a,{title:"Upload Files",className:"k-filemanager-upload-dialog",onClose:m,contentStyle:{width:"530px"},children:[Object(A.jsx)(p.a,{batch:!1,multiple:!0,files:e.files,withCredentials:!1,onAdd:u,onRemove:u,onProgress:u,onStatusChange:u,saveUrl:"https://demos.telerik.com/kendo-ui/service-v4/upload/save",removeUrl:"https://demos.telerik.com/kendo-ui/service-v4/upload/remove"}),Object(A.jsxs)(h.b,{layout:"end",children:[Object(A.jsx)(j.a,{onClick:function(t){e.onClearFileList(t)},children:" Clear List"}),Object(A.jsx)(j.a,{primary:!0,onClick:function(t){c(!i),e.onUploadDone(t)},children:" Done "})]})]}),Object(A.jsxs)(j.b,{children:[Object(A.jsx)(j.a,{className:"k-toggle-button k-button-icon k-group-start",togglable:!0,selected:"asc"===e.sort[0].dir,onClick:function(t){if(t){var a=S(e.sort[0].dir,"asc");e.onSortChange({direction:"asc",sortValue:a,event:t})}},children:Object(A.jsx)("span",{className:"k-icon k-i-sort-asc-sm"})}),Object(A.jsx)(j.a,{className:"k-toggle-button k-button k-button-icon k-group-end",togglable:!0,selected:"desc"===e.sort[0].dir,onClick:function(t){var a=S(e.sort[0].dir,"desc");e.onSortChange({direction:"desc",sortValue:a,event:t})},children:Object(A.jsx)("span",{className:"k-icon k-i-sort-desc-sm"})})]}),Object(A.jsx)(j.c,{text:"Sort By",items:e.splitItems,onItemClick:function(t){e.onSortChange(t)}}),Object(A.jsxs)(j.b,{children:[Object(A.jsx)(j.a,{className:"k-toggle-button k-button-icon k-group-start",togglable:!0,selected:o.gridView,onClick:function(t){if(t){var a=M(o,"grid");d(a),e.onViewChange({viewValue:a,event:t})}},children:Object(A.jsx)("span",{className:"k-icon k-i-grid-layout"})}),Object(A.jsx)(j.a,{className:"k-toggle-button k-button-icon k-group-end",togglable:!0,selected:o.listView,onClick:function(t){if(t){var a=M(o,"list");d(a),e.onViewChange({viewValue:a,event:t})}},children:Object(A.jsx)("span",{className:"k-icon k-i-grid"})})]}),Object(A.jsx)("div",{className:"k-spacer",children:"\xa0"}),Object(A.jsxs)("div",{className:"k-filemanager-details-toggle",children:[Object(A.jsx)("label",{children:"View Details"}),Object(A.jsxs)(b.e,{defaultChecked:!0,onChange:function(t){e.onSwitchChange(t)},children:[Object(A.jsx)(b.b,{type:"checkbox"}),Object(A.jsxs)("span",{className:"k-switch-container",children:[Object(A.jsx)("span",{className:"k-switch-label-on",children:"On"}),Object(A.jsx)("span",{className:"k-switch-label-off",children:"Off"}),Object(A.jsx)("span",{className:"k-switch-handle"})]})]})]}),Object(A.jsxs)("div",{className:"k-filemanager-search-tool k-textbox k-toolbar-last-visible",children:[Object(A.jsx)(b.b,{className:"k-input",placeholder:"Search",onChange:function(t){e.onSearchChange(t)}}),Object(A.jsx)("span",{className:"k-input-icon",children:Object(A.jsx)("span",{className:"k-icon k-i-search"})})]})]})},B=a(25),E=a(5),P=function(e){var t=Object(m.e)(),a=e.field||"",n=e.dataItem[a],i=Object(E.r)(e.id);return Object(A.jsx)("td",Object(o.a)(Object(o.a)(Object(o.a)({},Object(l.a)({},B.a,e.columnIndex)),i),{},{children:null===n?"":k(n,t)}))},L=function(e){var t=e.field||"",a=e.dataItem[t],n=Object(E.r)(e.id);return Object(A.jsx)("td",Object(o.a)(Object(o.a)(Object(o.a)({},Object(l.a)({},B.a,e.columnIndex)),n),{},{children:null===a?"":I(a)}))},U=function(e){var t=function(t,a){e.onContextMenu({dataItem:a.dataItem,event:t})};return Object(A.jsxs)(B.b,{data:e.data?g(e.data.data):e.data,rowRender:function(e,a){var i={onContextMenu:function(e){e.preventDefault(),t(e,a)}};return n.cloneElement(e,Object(o.a)({},i),e.props.children)},className:"k-filemanager-grid k-grid-display-block k-editable",style:{height:"100%"},navigatable:!0,sortable:{allowUnsort:!1},sort:e.sort,selectedField:"selected",selectable:{enabled:!0,cell:!1,drag:!0,mode:"single"},dataItemKey:e.dataItemKey,onRowClick:function(t){e.onSelectionChange(t)},onSortChange:function(t){e.onSortChange({sort:t.sort,event:t})},onRowDoubleClick:function(t){e.onDoubleClick(t)},children:[Object(A.jsx)(B.c,{field:"name",title:"Name"}),Object(A.jsx)(B.c,{field:"dateCreated",title:"Date Created",cell:P}),Object(A.jsx)(B.c,{field:"size",title:"Size",cell:L})]})},R=function(e){return Object(A.jsx)("div",{className:"k-listview k-selectable k-filemanager-listview",children:Object(A.jsx)("div",{className:"k-listview-content k-d-flex k-flex-row k-flex-wrap",children:e.data?g(e.data.data).map((function(t){var a=v(t.name);return Object(A.jsx)(A.Fragment,{children:Object(A.jsxs)("div",{className:Object(f.e)("k-listview-item",{"k-state-selected":t.selected}),onClick:function(a){return function(t,a){e.onItemClick({dataItem:a,event:t})}(a,t)},onDoubleClick:function(a){return function(t,a){e.onDoubleClick({dataItem:a,event:t})}(a,t)},onContextMenu:function(a){return function(t,a){t.preventDefault(),e.onContextMenu({dataItem:a,event:t})}(a,t)},children:[Object(A.jsx)("span",{className:"k-file-preview",children:Object(A.jsx)("span",{className:Object(f.e)("k-file-icon k-icon",a?a.icon:"")})}),Object(A.jsx)("span",{className:"k-file-name",children:t.name})]})})})):""})})},T=function(e){return e.data?"number"===typeof e.data?Y(e.data):K(e.data):J()},J=function(){return Object(A.jsx)("div",{className:"k-filemanager-preview",style:{width:"100%",border:0},children:Object(A.jsxs)("div",{className:"k-file-info",children:[Object(A.jsx)("span",{className:"k-file-preview",children:Object(A.jsx)("span",{className:"k-file-icon k-icon k-i-none"})}),Object(A.jsx)("span",{className:"k-file-name k-no-file-selected",children:"No File Selected"})]})})},K=function(e){var t=Object(m.e)(),a=k(e.dateCreated?e.dateCreated:null,t),n=k(e.dateModified?e.dateModified:null,t),i=v(e.name?e.name:null);return Object(A.jsx)("div",{className:"k-filemanager-preview",style:{width:"100%",border:0},children:Object(A.jsxs)("div",{className:"k-file-info",children:[Object(A.jsx)("span",{className:"k-file-preview",children:Object(A.jsx)("span",{className:Object(f.e)("k-file-icon k-icon",(null===i||void 0===i?void 0:i.icon)?i.icon:"")})}),Object(A.jsx)("span",{className:"k-file-name k-single-file-selected",children:e.name?e.name:""}),Object(A.jsxs)("dl",{className:"k-file-meta",children:[Object(A.jsx)("dt",{className:"k-file-meta-label",children:"Type:  "}),Object(A.jsxs)("dd",{className:"k-file-meta-value k-file-type",children:[" ",(null===i||void 0===i?void 0:i.type)?i.type:""]}),Object(A.jsx)("dd",{className:"k-line-break"}),Object(A.jsx)("dt",{className:"k-file-meta-label",children:"Size:  "}),Object(A.jsxs)("dd",{className:"k-file-meta-value k-file-size",children:[" ",e.size?I(e.size):""]}),Object(A.jsx)("dd",{className:"k-line-break"}),Object(A.jsx)("dt",{className:"k-file-meta-label",children:"Date Created:  "}),Object(A.jsxs)("dd",{className:"k-file-meta-value k-file-created",children:[" ",a||""]}),Object(A.jsx)("dd",{className:"k-line-break"}),Object(A.jsx)("dt",{className:"k-file-meta-label",children:"Date Modified:  "}),Object(A.jsxs)("dd",{className:"k-file-meta-value k-file-modified",children:[" ",n||""]}),Object(A.jsx)("dd",{className:"k-line-break"})]})]})})},Y=function(e){return Object(A.jsx)("div",{className:"k-filemanager-preview",style:{width:"100%",border:0},children:Object(A.jsxs)("div",{className:"k-file-info",children:[Object(A.jsx)("span",{className:"k-file-preview",style:{width:"100%",border:0},children:Object(A.jsx)("span",{className:"k-file-icon k-icon k-i-file"})}),Object(A.jsxs)("span",{className:"k-file-name k-multiple-files-selected",children:[e," items"]})]})})},G=a(26),X=function(e){var t=function(t,a){e.onItemEdit({item:a,event:t})},a=function(t,a){e.onItemBlur({item:a,event:t})},n=function(t,a){t.preventDefault(),e.onContextMenu({tree:!0,dataItem:a,event:t})};return Object(A.jsx)(G.a,{data:e.data,item:function(e){return e.item.edit?Object(A.jsx)("span",{children:Object(A.jsx)("input",{className:"k-textbox",autoFocus:!0,value:e.item.text,onChange:function(a){return t(a,e.item)},onBlur:function(t){return a(t,e.item)}})}):Object(A.jsx)("span",{onContextMenu:function(t){return n(t,e.item)},children:e.item.name})},className:"k-filemanager-treeview",textField:"name",expandIcons:!0,onExpandChange:function(e){e.item.expanded=!e.item.expanded},onItemClick:function(t){t.item&&e.onItemClick({item:t.item,event:t})}})},Z=function(e){return Object(A.jsx)(d.a,{data:e.data?e.data:"",textField:"name",onItemSelect:function(t){e.onBreadcrumbSelect(t)},onKeyDown:function(t){e.onBreadcrumbSelect(t)}})},q=function(e){var t=n.useState(e.editValue),a=Object(r.a)(t,2),i=a[0],c=a[1],s=function(t){e.onDialogClick({event:t,value:i,type:t.target.value})};return Object(A.jsxs)(h.a,{title:"Please confirm",onClose:function(t){e.onDialogClose(t)},children:[Object(A.jsx)("p",{style:{width:"350px",margin:"25px",textAlign:"center"},children:"Enter new name for the file."}),Object(A.jsx)(b.b,{maxLength:40,value:i.name,style:{width:"350px",margin:"25px",textAlign:"center"},className:"k-textbox",onChange:function(e){c(e.value)}}),Object(A.jsxs)(h.b,{children:[Object(A.jsx)("button",{value:"rename",className:"k-button k-state-selected",onClick:s,children:"Rename"}),Object(A.jsx)("button",{value:"cancel",className:"k-button",onClick:s,children:"Cancel"})]})]})},Q=function(e){var t=function(t){e.onDialogClick({event:t,type:t.target.value})};return Object(A.jsxs)(h.a,{title:"Please confirm",onClose:function(t){e.onDialogClose(t)},children:[Object(A.jsx)("p",{style:{width:"350px",margin:"25px",textAlign:"center"},children:"Are you sure you want to delete the selected file? You cannot undo this action."}),Object(A.jsxs)(h.b,{children:[Object(A.jsx)("button",{value:"delete",className:"k-button k-state-selected",onClick:t,children:"Delete"}),Object(A.jsx)("button",{value:"cancel",className:"k-button",onClick:t,children:"Cancel"})]})]})},W=[{path:"Home/Pictures.jpg",name:"Pictures.jpg",size:0,dateCreated:new Date,dateModified:new Date,items:[]},{path:"Home/Documents",name:"Documents",size:1e5,dateCreated:new Date,dateModified:new Date,items:[{path:"Home/Documents/Image.jpg",name:"Image.jpg",size:200,dateCreated:new Date,dateModified:null},{path:"Home/Documents/shared",name:"shared",size:202665,dateCreated:new Date,dateModified:null,items:[{path:"Home/Documents/shared/wave.jpg",name:"wave.jpg",size:20,dateCreated:new Date,dateModified:null},{path:"Home/Documents/shared/wave",name:"wave",size:20,dateCreated:new Date,dateModified:null}]},{path:"Home/Documents/Anime.jpg",name:"Anime.jpg",size:50,dateCreated:new Date,dateModified:null}]},{path:"Home/Pictures",name:"Pictures",size:0,dateCreated:new Date,dateModified:new Date,items:[{path:"Home/Pictures/Vacation",name:"Vacation",size:200,dateCreated:new Date,dateModified:null},{path:"Home/Pictures/Bulgaria",name:"Bulgaria",size:202665,dateCreated:new Date,dateModified:null,items:[{path:"Home/Pictures/Bulgaria/sea.jpg",name:"sea.jpg",size:20,dateCreated:new Date,dateModified:null}]},{path:"Home/Pictures/view.jpg",name:"view.jpg",size:50,dateCreated:new Date,dateModified:null}]},{path:"Home/Music",name:"Music",size:0,dateCreated:new Date,dateModified:new Date,items:[{path:"Home/Music/music.mp3",name:"music.mp3",size:200,dateCreated:new Date,dateModified:null},{path:"Home/Music/new",name:"new",size:202665,dateCreated:new Date,dateModified:null,items:[{path:"Home/Music/new/real.mp3",name:"real.mp3",size:20,dateCreated:new Date,dateModified:null},{path:"Home/Music/new/shakira.mp3",name:"shakira.mp3",size:20,dateCreated:new Date,dateModified:null}]},{path:"Home/Music/home.jpg",name:"home.jpg",size:50,dateCreated:new Date,dateModified:null}]}],$=a(11),_=function(e){return Object(A.jsx)($.a,{show:!0,offset:e.offset,children:Object(A.jsxs)(d.b,{vertical:!0,style:{display:"inline-block"},onSelect:function(t){e.onContextMenuCLick(t)},children:[Object(A.jsx)(d.c,{text:"Rename",icon:"k-icon k-i-edit"}),Object(A.jsx)(d.c,{text:"Delete",icon:"k-icon k-i-delete"})]})})},ee=[{size:"20%",min:"20px",collapsible:!0},{},{size:"30%",min:"20px",collapsible:!0}],te=[{field:"name",dir:"asc"}],ae="name",ne="selected",ie=Object(f.l)(ae),ce=function(){var e=Object(m.e)(),t=n.useState(x(W,e)),a=Object(r.a)(t,2),i=a[0],c=a[1],s=n.useState(ee),j=Object(r.a)(s,2),b=j[0],h=j[1],p=n.useState({}),g=Object(r.a)(p,2),D=g[0],M=g[1],S=n.useState(null),I=Object(r.a)(S,2),B=I[0],E=I[1],P=n.useState(null),L=Object(r.a)(P,2),J=L[0],K=L[1],Y=n.useState([]),G=Object(r.a)(Y,2),$=G[0],ce=G[1],se=n.useState("grid"),le=Object(r.a)(se,2),oe=le[0],re=le[1],de=n.useState(!1),me=Object(r.a)(de,2),ue=me[0],fe=me[1],je=n.useState({left:0,top:0}),be=Object(r.a)(je,2),he=be[0],pe=be[1],ve=n.useState(!1),ke=Object(r.a)(ve,2),xe=ke[0],Oe=ke[1],ge=n.useState(!1),Ce=Object(r.a)(ge,2),we=Ce[0],Ne=Ce[1],De=n.useState({sort:te,filter:{logic:"and",filters:[{field:"name",operator:"contains",value:""}]}}),ye=Object(r.a)(De,2),Me=ye[0],Se=ye[1],Ie=n.useCallback((function(e){var t={};e.name?(t={name:e.name},K(w(i,t))):K(null)}),[i]),ze=function(e){M(e.dataItem),Ie(e.dataItem)},Fe=function(e){var t=Object(f.f)(Me);"asc"!==e.direction&&"desc"!==e.direction||(t.sort[0].dir=e.direction),e.item&&(t.sort[0].field=e.item.value),e.sort&&(t.sort=e.sort),Se(t)},Ve=function(e){var t=v(e.dataItem.name);if("Folder"===(null===t||void 0===t?void 0:t.type)){B&&(B.expanded=!0);var a=e.dataItem;a.expanded=!0,E(C(i,a))}},Ae=function(e){"cancel"===e.type&&(Ne(!1),Oe(!1));var t=Object.keys(D).length?D:B;if(t){if("delete"===e.type){var a=(t.path||"").split("/");a.pop();var n=a.join("/"),c=C(i,{path:n});E(c),F(i,t),Ne(!1)}if("rename"===e.type)Oe(!1),w(i,{name:e.value})||t.name===e.value||("string"===typeof e.value&&z(i,t,e.value),"object"===typeof e.value&&e.value.name&&z(i,t,e.value.name))}},He=function(e){var t={};if(e.dataItem.name&&((t=e.dataItem)[e.dataItem.name]=!0,t.selected=!0,M(t)),e.tree){var a=C(i,t);E(a)}Ie(t)},Be=function(e){fe(!0),pe({left:e.event.clientX,top:e.event.clientY}),He(e)},Ee=function(){Ne(!1),Oe(!1)};document.addEventListener("click",(function(){fe(!1)}));var Pe=n.useMemo((function(){if(D.name){var e=D.name.toString();return Object(l.a)({},e,!0)}return{}}),[D]);return Object(A.jsxs)("div",{className:"k-widget k-filemanager k-filemanager-resizable",children:[Object(A.jsx)("div",{className:"k-filemanager-header",children:Object(A.jsx)(H,{splitItems:[{text:"Name",value:"name"},{text:"File Size",value:"size"},{text:"Date Created",value:"dateCreated"}],sort:Me.sort,files:$,onNewFolderClick:function(t){var a;a=y(i,B||null,e),c(a),B&&E(C(a,B))},onSearchChange:function(e){Se(Object(o.a)(Object(o.a)({},Me),{},{filter:{logic:"and",filters:[{field:"name",operator:"contains",value:e.value}]}}))},onSwitchChange:function(e){var t=b.slice(0);e.value?(t[2].size="30%",h(t)):(t[2].size="0%",h(t))},onViewChange:function(e){e.viewValue.gridView&&re("grid"),e.viewValue.listView&&re("list")},onSortChange:Fe,onFileChange:function(e){e.files&&ce(e.files)},onClearFileList:function(e){e&&ce([])},onUploadDone:function(t){var a=function(e,t,a,n){var i=Array.isArray(e)?N(e):Object(f.f)(e),c=t?Object(f.f)(t):{};if(!t&&Array.isArray(i))return a.forEach((function(e){i.push({path:"Home/".concat(e.name),name:e.name,dateCreated:k(new Date,n),size:e.size,icon:v(e.extension)})})),{updatedData:i,selectedItem:c};if(Array.isArray(i)){for(var s=function(e){var t=C(i[e],c);t&&a.forEach((function(e){t.items||(t.items=[]),t.items.push({path:"".concat(t.path,"/").concat(e.name),name:e.name,dateCreated:k(new Date,n),size:e.size,icon:v(e.extension)}),c.items=t.items}))},l=0;l<i.length;l++)s(l);return{updatedData:i,selectedItem:c}}return"object"===typeof i&&void 0!==i.name&&i.name===c.name?{updatedData:i,selectedItem:c}:void 0!==i.items&&i.items.length>0?C(i.items,c):null}(i,B,$,e);c(a.updatedData),E(a.selectedItem),ce([])}})}),Object(A.jsx)("div",{className:"k-filemanager-content-container",children:Object(A.jsxs)(d.d,{panes:b,onChange:function(e){h(e.newState)},children:[Object(A.jsx)(X,{data:O(i,B),selected:B,selectedItem:B,onItemClick:function(e){var t=C(i,e.item);t.expanded=!0,K(e.item),E(t),M({})},onContextMenu:Be}),Object(A.jsxs)("div",{className:"k-filemanager-content",children:[Object(A.jsx)(Z,{data:V(i,B),onBreadcrumbSelect:function(e){if(M({}),!e.nativeEvent.keyCode){var t=w(i,{name:e.id});E(t)}if(13===e.nativeEvent.keyCode){var a=w(i,{name:e.id});E(a)}}}),"grid"===oe?Object(A.jsx)(U,{data:B&&B.items?Object(u.d)(B.items.slice().map((function(e){return Object(o.a)(Object(o.a)({},e),{},Object(l.a)({},ne,Pe[ie(e)]))})),Me):B?null:Object(u.d)(i.slice().map((function(e){return Object(o.a)(Object(o.a)({},e),{},Object(l.a)({},ne,Pe[ie(e)]))})),Me),sort:Me.sort,dataItemKey:ae,onSelectionChange:ze,onSortChange:Fe,onDoubleClick:Ve,onContextMenu:Be}):Object(A.jsx)(R,{data:B&&B.items?Object(u.d)(B.items.slice().map((function(e){return Object(o.a)(Object(o.a)({},e),{},Object(l.a)({},ne,Pe[ie(e)]))})),Me):B?null:Object(u.d)(i.slice().map((function(e){return Object(o.a)(Object(o.a)({},e),{},Object(l.a)({},ne,Pe[ie(e)]))})),Me),onSelectionChange:ze,onItemClick:He,onDoubleClick:Ve,onContextMenu:Be}),ue?Object(A.jsx)(_,{offset:he,onContextMenuCLick:function(e){"0"===e.itemId?Oe(!0):Ne(!0)}}):"",xe?Object(A.jsx)(q,{editValue:Object.keys(D).length?D:B,onDialogClose:Ee,onDialogClick:Ae}):"",we?Object(A.jsx)(Q,{onDialogClose:Ee,onDialogClick:Ae}):""]}),Object(A.jsx)(T,{data:J})]})})]})},se=function(e){e&&e instanceof Function&&a.e(3).then(a.bind(null,68)).then((function(t){var a=t.getCLS,n=t.getFID,i=t.getFCP,c=t.getLCP,s=t.getTTFB;a(e),n(e),i(e),c(e),s(e)}))};s.a.render(Object(A.jsx)(i.a.StrictMode,{children:Object(A.jsx)(ce,{})}),document.getElementById("root")),se()}},[[67,1,2]]]);
//# sourceMappingURL=main.0e7692b3.chunk.js.map