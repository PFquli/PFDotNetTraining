/******/ (function () { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({
/***/ "./src/scripts/components/Models/File.ts":
/*!***********************************************!*\
  !*** ./src/scripts/components/Models/File.ts ***!
  \***********************************************/
/***/ (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
                "use strict";
                __webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "File": function () { return /* binding */ File; }
                    /* harmony export */
                });
/* harmony import */ var _utilities_constant__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utilities/constant */ "./src/scripts/utilities/constant.ts");
/* harmony import */ var _Item__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Item */ "./src/scripts/components/Models/Item.ts");

                class File extends _Item__WEBPACK_IMPORTED_MODULE_1__.Item {
                    constructor(id, name, createDate, creator, modifiedAt, modifiedBy, icon, parent, extension = ".doc") {
                        super(id, name, createDate, creator, modifiedAt, modifiedBy, icon, parent);
                        this.extension = extension;
                        this.extension = extension;
                        this.icon = _utilities_constant__WEBPACK_IMPORTED_MODULE_0__.properties.FILE_DEFAULT_URL;
                    }

                    addOrUpdate(mode) {
                        //Add file to local storage
                        super.addOrUpdate(mode);

                        if (this.parent !== _utilities_constant__WEBPACK_IMPORTED_MODULE_0__.properties.BASE_DIRECTORY) {
                            //Add file to folder or update file name
                            let folder = JSON.parse(window.localStorage.getItem(this.parent));

                            if (mode === _utilities_constant__WEBPACK_IMPORTED_MODULE_0__.properties.CREATE_MODE) {
                                folder.subItems.push(this);
                            } else {
                                for (let i = 0; i < folder.subItems.length; i++) {
                                    if (folder.subItems[i].id === this.id) {
                                        folder.subItems[i].name = this.name;
                                    }
                                }
                            } //Update local storage

                            localStorage.setItem(folder.id, JSON.stringify(folder));
                        }
                    }

                    remove() {
                        //Remove file from local storage
                        super.remove(); //Remove file from folder

                        if (this.parent !== 'root') {
                            let folder = JSON.parse(window.localStorage.getItem(this.parent));
                            let pos = 0;

                            for (let i = 0; i < folder.subItems.length; i++) {
                                if (folder.subItems[i].id === this.id) pos = i;
                            }

                            folder.subItems.splice(pos, 1); //Update local storage

                            localStorage.setItem(folder.id, JSON.stringify(folder));
                        }
                    }

                    mapping(input) {
                        if (input.id) this.id = input.id;
                        if (input.name) this.name = input.name;
                        if (input.creator) this.creator = input.creator;
                        if (input.createDate) this.createDate = input.createDate;
                        if (input.modifiedBy) this.modifiedBy = input.modifiedBy;
                        if (input.modifiedAt) this.modifiedAt = input.modifiedAt;
                        if (input.extension) this.extension = input.extension;
                        if (input.icon) this.icon = input.icon;
                        if (input.parent) this.parent = input.parent; // super.mapping(input);
                        // if (input.extension) this.extension = input.extension;
                    }
                }

                /***/
            }),

/***/ "./src/scripts/components/Models/Folder.ts":
/*!*************************************************!*\
  !*** ./src/scripts/components/Models/Folder.ts ***!
  \*************************************************/
/***/ (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
                "use strict";
                __webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Folder": function () { return /* binding */ Folder; }
                    /* harmony export */
                });
/* harmony import */ var _utilities_constant__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utilities/constant */ "./src/scripts/utilities/constant.ts");
/* harmony import */ var _Item__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Item */ "./src/scripts/components/Models/Item.ts");

                class Folder extends _Item__WEBPACK_IMPORTED_MODULE_1__.Item {
                    constructor(id, name, createDate, creator, modifiedAt, modifiedBy, icon, parent) {
                        super(id, name, createDate, creator, modifiedAt, modifiedBy, icon, parent);
                        this.subItems = [];
                        this.icon = _utilities_constant__WEBPACK_IMPORTED_MODULE_0__.properties.FOLDER_DEFAULT_URL;
                    }

                    addOrUpdate(mode) {
                        // Add folder to local storage
                        localStorage.setItem(this.id, JSON.stringify(this)); // Add folder to folder

                        if (this.parent !== _utilities_constant__WEBPACK_IMPORTED_MODULE_0__.properties.BASE_DIRECTORY) {
                            const folder = JSON.parse(localStorage.getItem(this.parent));

                            if (mode === _utilities_constant__WEBPACK_IMPORTED_MODULE_0__.properties.CREATE_MODE) {
                                folder.subItems.push(this);
                            } else {
                                for (let i = 0; i < folder.subItems.length; i += 1) {
                                    if (folder.subItems[i].id === this.id) {
                                        folder.subItems[i].mapping(this);
                                    }
                                }
                            }

                            localStorage.setItem(folder.id, JSON.stringify(folder));
                        }
                    }

                    remove() {
                        // Remove folder from local storage
                        super.remove(); // Remove all items from folder

                        if (this.subItems.length !== 0) {
                            for (let i = 0; i < localStorage.length; i += 1) {
                                const item = JSON.parse(localStorage.getItem(localStorage.key(i)));
                                console.log(item.parent);

                                if (item.parent === this.id) {
                                    localStorage.removeItem(item.id);
                                }
                            }
                        } // Remove folder from parent

                        if (this.parent !== 'root') {
                            const folder = JSON.parse(window.localStorage.getItem(this.parent));
                            let pos = 0;

                            for (let i = 0; i < folder.subItems.length; i += 1) {
                                if (folder.subItems[i].id === this.id) pos = i;
                            }

                            folder.subItems.splice(pos, 1); // Update local storage

                            localStorage.setItem(folder.id, JSON.stringify(folder));
                        }
                    }

                    mapping(input) {
                        if (input.id) this.id = input.id;
                        if (input.name) this.name = input.name;
                        if (input.creator) this.creator = input.creator;
                        if (input.createDate) this.createDate = input.createDate;
                        if (input.modifiedBy) this.modifiedBy = input.modifiedBy;
                        if (input.modifiedAt) this.modifiedAt = input.modifiedAt;
                        if (input.subItems) this.subItems = input.subItems;
                        if (input.icon) this.icon = input.icon;
                        if (input.parent) this.parent = input.parent; // super.mapping(input);
                        // if (input.subItems) this.subItems = input.subItems;
                    }
                }

                /***/
            }),

/***/ "./src/scripts/components/Models/Item.ts":
/*!***********************************************!*\
  !*** ./src/scripts/components/Models/Item.ts ***!
  \***********************************************/
/***/ (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
                "use strict";
                __webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Item": function () { return /* binding */ Item; }
                    /* harmony export */
                });
/* harmony import */ var _utilities_constant__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utilities/constant */ "./src/scripts/utilities/constant.ts");

                class Item {
                    constructor(id, name, createDate, creator, modifiedAt, modifiedBy, icon, parent = _utilities_constant__WEBPACK_IMPORTED_MODULE_0__.properties.BASE_DIRECTORY) {
                        this.createDate = '049/04/2021';
                        this.creator = 'An Tran Hoang';
                        if (id) this.id = id;
                        if (name) this.name = name;
                        if (createDate) this.createDate = createDate;
                        if (creator) this.creator = creator;
                        if (modifiedAt) this.modifiedAt = modifiedAt;
                        if (modifiedBy) this.modifiedBy = modifiedBy;
                        if (icon) this.icon = icon;
                        if (parent) this.parent = parent;
                    }

                    addOrUpdate(mode) {
                        localStorage.setItem(this.id, JSON.stringify(this));
                    }

                    remove() {
                        localStorage.removeItem(this.id);
                    }

                    mapping(input) {
                        if (input.id) this.id = input.id;
                        if (input.name) this.name = input.name;
                        if (input.creator) this.creator = input.creator;
                        if (input.createDate) this.createDate = input.createDate;
                        if (input.modifiedBy) this.modifiedBy = input.modifiedBy;
                        if (input.modifiedAt) this.modifiedAt = input.modifiedAt;
                        if (input.icon) this.icon = input.icon;
                        if (input.parent) this.parent = input.parent;
                    }
                }

                /***/
            }),

/***/ "./src/scripts/components/Models/RenderTemplate.ts":
/*!*********************************************************!*\
  !*** ./src/scripts/components/Models/RenderTemplate.ts ***!
  \*********************************************************/
/***/ (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
                "use strict";
                __webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RenderTemplate": function () { return /* binding */ RenderTemplate; }
                    /* harmony export */
                });
                class RenderTemplate {
                    constructor(table, ordering) {
                        this.table = table;
                        this.ordering = ordering;
                    }

                    render(item) {
                        const row = this.table.getElementsByTagName('tbody')[0].insertRow(-1);
                        const map = new Map(Object.entries(item));

                        for (let i = 0; i <= this.ordering.length; i += 1) {
                            // Render content
                            const cell = row.insertCell(-1);

                            if (this.ordering[i] === 'icon') {
                                cell.className = 'pl-md-5';
                                const imgNode = document.createElement('img');
                                imgNode.className = 'icon';
                                imgNode.src = map.get('icon');
                                cell.appendChild(imgNode);
                                continue;
                            } // Hide ID col

                            if (this.ordering[i] === 'id') cell.className = 'd-none'; // Ultility button

                            if (i === this.ordering.length) {
                                const editBtn = document.createElement('button');
                                editBtn.className = 'edit';
                                const editText = document.createElement('span');
                                editText.innerHTML = 'edit';
                                editBtn.appendChild(editText);
                                cell.appendChild(editBtn);
                                const closeBtn = document.createElement('button');
                                closeBtn.className = 'close';
                                const closeIco = document.createElement('span');
                                closeIco.innerHTML = '&times;';
                                closeBtn.appendChild(closeIco);
                                cell.appendChild(closeBtn);
                            } else cell.innerHTML = map.get(this.ordering[i]);
                        }

                        return row;
                    }
                }

                /***/
            }),

/***/ "./src/scripts/components/_grid.ts":
/*!*****************************************!*\
  !*** ./src/scripts/components/_grid.ts ***!
  \*****************************************/
/***/ (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
                "use strict";
                __webpack_require__.r(__webpack_exports__);
                const renderGrid = () => {// TODO: implement code to Render grid
                };

/* harmony default export */ __webpack_exports__["default"] = (renderGrid);

                /***/
            }),

/***/ "./src/scripts/data/dataOperation.ts":
/*!*******************************************!*\
  !*** ./src/scripts/data/dataOperation.ts ***!
  \*******************************************/
/***/ (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
                "use strict";
                __webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getItemById": function () { return /* binding */ getItemById; }
                    /* harmony export */
                });
                function getItemById(id) {
                    for (let i = 0; i < window.localStorage.length; i += 1) {
                        if (localStorage.key(i) === id) {
                            return JSON.parse(localStorage.getItem(localStorage.key(i)));
                        }
                    }
                }

                /***/
            }),

/***/ "./src/scripts/utilities/_helper.ts":
/*!******************************************!*\
  !*** ./src/scripts/utilities/_helper.ts ***!
  \******************************************/
/***/ (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
                "use strict";
                __webpack_require__.r(__webpack_exports__);
                const ready = fn => {
                    if (document.readyState !== 'loading') {
                        fn();
                    } else {
                        document.addEventListener('DOMContentLoaded', fn);
                    }
                };

/* harmony default export */ __webpack_exports__["default"] = (ready);

                /***/
            }),

/***/ "./src/scripts/utilities/constant.ts":
/*!*******************************************!*\
  !*** ./src/scripts/utilities/constant.ts ***!
  \*******************************************/
/***/ (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
                "use strict";
                __webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "properties": function () { return /* binding */ properties; }
                    /* harmony export */
                });
                const properties = {
                    CREATE_MODE: 'create',
                    EDIT_MODE: 'edit',
                    ORDERING: ['icon', 'name', 'createDate', 'creator', 'id'],
                    BASE_DIRECTORY: 'root',
                    FILE_PREFIX: 'file-',
                    FOLDER_PREFIX: 'folder-',
                    FILE_DEFAULT_URL: './dist/image/excel.png',
                    FOLDER_DEFAULT_URL: './dist/image/folder.png'
                };

                /***/
            }),

/***/ "./src/scripts/utilities/utilities-function.ts":
/*!*****************************************************!*\
  !*** ./src/scripts/utilities/utilities-function.ts ***!
  \*****************************************************/
/***/ (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
                "use strict";
                __webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "generateKey": function () { return /* binding */ generateKey; },
/* harmony export */   "getCurrentDate": function () { return /* binding */ getCurrentDate; }
                    /* harmony export */
                });
                /**
                 * Key generator
                 * @param {string}  prefix - prefix for file and folder.
                 * @param {number} length - random string length.
                 * @return {string} - result prefix & length.
                 */
                function generateKey(prefix, length) {
                    const randomStr = [];
                    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
                    const charactersLength = characters.length;

                    for (let i = 0; i < length; i += 1) {
                        randomStr.push(characters.charAt(Math.floor(Math.random() * charactersLength)));
                    }

                    const result = prefix.concat(randomStr.join(''));
                    return result;
                } // Get current date

                function getCurrentDate() {
                    const today = new Date();
                    const dd = String(today.getDate()).padStart(2, '0');
                    const mm = String(today.getMonth() + 1).padStart(2, '0');
                    const yyyy = today.getFullYear();
                    return `${dd}/${mm}/${yyyy}`;
                }

                /***/
            })

        /******/
    });
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
            /******/
        }
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
            /******/
        };
/******/
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
        /******/
    }
/******/
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function () {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function (exports, definition) {
/******/ 			for (var key in definition) {
/******/ 				if (__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
                    /******/
                }
                /******/
            }
            /******/
        };
        /******/
    }();
/******/
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function () {
/******/ 		__webpack_require__.o = function (obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
        /******/
    }();
/******/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function () {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function (exports) {
/******/ 			if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
                /******/
            }
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
            /******/
        };
        /******/
    }();
    /******/
    /************************************************************************/
    var __webpack_exports__ = {};
    // This entry need to be wrapped in an IIFE because it need to be in strict mode.
    !function () {
        "use strict";
        var __webpack_exports__ = {};
        /*!****************************************!*\
          !*** ./src/scripts/pages/home-page.js ***!
          \****************************************/
        __webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utilities_helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utilities/_helper */ "./src/scripts/utilities/_helper.ts");
/* harmony import */ var _components_grid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/_grid */ "./src/scripts/components/_grid.ts");
/* harmony import */ var _components_Models_Folder__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/Models/Folder */ "./src/scripts/components/Models/Folder.ts");
/* harmony import */ var _components_Models_File__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/Models/File */ "./src/scripts/components/Models/File.ts");
/* harmony import */ var _components_Models_RenderTemplate__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/Models/RenderTemplate */ "./src/scripts/components/Models/RenderTemplate.ts");
/* harmony import */ var _data_dataOperation__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../data/dataOperation */ "./src/scripts/data/dataOperation.ts");
/* harmony import */ var _utilities_utilities_function__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../utilities/utilities-function */ "./src/scripts/utilities/utilities-function.ts");
/* harmony import */ var _utilities_constant__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../utilities/constant */ "./src/scripts/utilities/constant.ts");

        let currentDir = '';
        let template = new _components_Models_RenderTemplate__WEBPACK_IMPORTED_MODULE_4__.RenderTemplate(document.getElementById("content-table"), _utilities_constant__WEBPACK_IMPORTED_MODULE_7__.properties.ORDERING);
        let clickedRow = 'root';
        let hoverRow = '';
        let editMode = false;
        const randomLength = 5;
        (0, _utilities_helper__WEBPACK_IMPORTED_MODULE_0__.default)(() => {
            (0, _components_grid__WEBPACK_IMPORTED_MODULE_1__.default)();
            currentDir = _utilities_constant__WEBPACK_IMPORTED_MODULE_7__.properties.BASE_DIRECTORY;
            changeCurrentDirectory();
            renderLocalStorage();
            let submitButton = document.getElementsByClassName('btn-add')[0];
            addItemEvent(submitButton);
            checkboxEvent();
        });
        /**
         * Render all data with given array of Folder or Files.
         * @param {Array<Item>} input - Array of folders or files.
        */

        function generateData(input) {
            //Generate Folder
            if (input[0].subItems) {
                for (let i = 0; i < input.length; i += 1) {
                    let folder = new _components_Models_Folder__WEBPACK_IMPORTED_MODULE_2__.Folder();
                    folder.mapping(input[i]);
                    let row = template.render(folder);
                    let id = row.cells[row.cells.length - 2].textContent;
                    getRowIdOnHover(id, row);
                    attachRemoveItemEvent(row);
                    attachOnclickFolder(id, row);
                    attachEditEvent(row);
                }
            } else {
                //Generate Files
                for (let i = 0; i < input.length; i += 1) {
                    let file = new _components_Models_File__WEBPACK_IMPORTED_MODULE_3__.File();
                    file.mapping(input[i]);
                    let row = template.render(file);
                    let id = row.cells[row.cells.length - 2].textContent;
                    getRowIdOnHover(id, row);
                    attachRemoveItemEvent(row);
                    attachEditEvent(row);
                }
            }
        }

        ; //Render all items in local storage

        function renderLocalStorage() {
            for (var i = 0; i < window.localStorage.length; i += 1) {
                let item = JSON.parse(localStorage.getItem(localStorage.key(i)));
                if (item.parent === clickedRow) generateData([item]);
            }
        } //Clear current page data excluding header

        function clearCurrentData() {
            let tr = document.getElementsByTagName('tr');

            while (tr.length != 1) {
                tr[1].remove();
            }
        }

        ;
        /**
         * Attach on click event to view items in folder for <tr> tag
         */

        function getItemInFolder(folderId) {
            let fold = new _components_Models_Folder__WEBPACK_IMPORTED_MODULE_2__.Folder();
            fold.mapping(JSON.parse(window.localStorage.getItem(folderId)));
            return fold;
        }
        /**
         * Attach on click event to view items in folder for <tr> tag
         * @param {string} id - folder id.
         * @param {HTMLTableRowElement}  tr - <tr> element.
         */

        function attachOnclickFolder(id, tr) {
            tr.addEventListener("click", function () {
                clearCurrentData(); //Check if data is in local storage and render

                let fold = getItemInFolder(id);
                clickedRow = id;
                changeCurrentDirectory(fold.name);

                if (fold) {
                    fold.subItems.forEach(element => {
                        if (Array.isArray(element)) {
                            generateData(element);
                        } else generateData([element]);
                    });
                }
            });
        }
        /**
         * Passing Item id to global variable for a later use.
         */

        function getRowIdOnHover(id, tr) {
            tr.onmouseover = function () {
                hoverRow = id;
            };
        }
        /**
         * Attach add folder event to provided <button>.
         * @param {HTMLButtonElement}  btn - <tr> element.
         */

        function addItemEvent(btn) {
            btn.onclick = function () {
                //Get ID field
                let idField = document.getElementById("id");
                let id = idField.value; //Get Name field

                let nameField = document.getElementById("name");
                let name = nameField.value; //Check if in put is a file

                let inputElem = document.getElementById("file");
                let isFile = inputElem.checked;
                const prefix = isFile ? _utilities_constant__WEBPACK_IMPORTED_MODULE_7__.properties.FILE_PREFIX : _utilities_constant__WEBPACK_IMPORTED_MODULE_7__.properties.FOLDER_PREFIX;
                let result = (0, _utilities_utilities_function__WEBPACK_IMPORTED_MODULE_6__.generateKey)(prefix, randomLength);
                idField.value = result;

                if (!editMode) {
                    //Add file or folder
                    if (isFile) {
                        let item = new _components_Models_File__WEBPACK_IMPORTED_MODULE_3__.File(id, name, (0, _utilities_utilities_function__WEBPACK_IMPORTED_MODULE_6__.getCurrentDate)(), null, null, null, null, clickedRow, '.xlxs');
                        item.addOrUpdate(_utilities_constant__WEBPACK_IMPORTED_MODULE_7__.properties.CREATE_MODE);
                    } else {
                        let item = new _components_Models_Folder__WEBPACK_IMPORTED_MODULE_2__.Folder(id, name, (0, _utilities_utilities_function__WEBPACK_IMPORTED_MODULE_6__.getCurrentDate)(), null, null, null, null, clickedRow);
                        item.addOrUpdate(_utilities_constant__WEBPACK_IMPORTED_MODULE_7__.properties.CREATE_MODE);
                    }
                } else {
                    let type = hoverRow.split('-');

                    if (type[0] === 'file') {
                        let file = new _components_Models_File__WEBPACK_IMPORTED_MODULE_3__.File();
                        file.mapping((0, _data_dataOperation__WEBPACK_IMPORTED_MODULE_5__.getItemById)(hoverRow));
                        file.name = name;
                        file.addOrUpdate(_utilities_constant__WEBPACK_IMPORTED_MODULE_7__.properties.EDIT_MODE);
                    } else {
                        let folder = new _components_Models_Folder__WEBPACK_IMPORTED_MODULE_2__.Folder();
                        folder.mapping((0, _data_dataOperation__WEBPACK_IMPORTED_MODULE_5__.getItemById)(hoverRow));
                        folder.name = name;
                        folder.addOrUpdate(_utilities_constant__WEBPACK_IMPORTED_MODULE_7__.properties.EDIT_MODE);
                    }

                    editMode = false;
                }

                clearCurrentData();
                renderLocalStorage();
            };
        }
        /**
         * Attach event "Remove item" to provided <tr>.
         * @param {HTMLTableRowElement}  row - <tr> element.
         */

        function attachRemoveItemEvent(row) {
            let btn = row.getElementsByClassName('close');

            for (let i = 0; i < btn.length; i += 1) {
                btn[i].addEventListener('click', function () {
                    let type = hoverRow.split('-');

                    if (type[0] === 'file') {
                        let file = new _components_Models_File__WEBPACK_IMPORTED_MODULE_3__.File();
                        file.mapping((0, _data_dataOperation__WEBPACK_IMPORTED_MODULE_5__.getItemById)(hoverRow));
                        clickedRow = file.parent;
                        file.remove();
                    } else {
                        let folder = new _components_Models_Folder__WEBPACK_IMPORTED_MODULE_2__.Folder();
                        folder.mapping((0, _data_dataOperation__WEBPACK_IMPORTED_MODULE_5__.getItemById)(hoverRow));
                        clickedRow = folder.parent;
                        folder.remove();
                    }

                    clearCurrentData();
                    renderLocalStorage();
                    event.stopImmediatePropagation();
                });
            }
        }

        ;
        /**
         * Add current folder to directory if folder name is provided
         * else return current directory
         * @param {string}  folder - folder name.
         * @return {string} - result prefix & length.
         */

        function changeCurrentDirectory(folder = '') {
            if (folder != '') currentDir += '/' + folder;
            document.getElementById('directory').innerHTML = currentDir;
            return currentDir;
        } // Checkbox event

        function checkboxEvent() {
            let inputElem = document.getElementById("file");
            let idField = document.getElementById("id");
            idField.value = (0, _utilities_utilities_function__WEBPACK_IMPORTED_MODULE_6__.generateKey)(_utilities_constant__WEBPACK_IMPORTED_MODULE_7__.properties.FOLDER_PREFIX, randomLength);

            inputElem.onclick = function () {
                let isFile = inputElem.checked;
                const prefix = isFile ? _utilities_constant__WEBPACK_IMPORTED_MODULE_7__.properties.FILE_PREFIX : _utilities_constant__WEBPACK_IMPORTED_MODULE_7__.properties.FOLDER_PREFIX;
                let result = (0, _utilities_utilities_function__WEBPACK_IMPORTED_MODULE_6__.generateKey)(prefix, randomLength);
                idField.value = result;
            };
        }
        /**
         * Edit item
         */

        function attachEditEvent(tr) {
            let btn = tr.getElementsByClassName('edit');

            for (let i = 0; i < btn.length; i += 1) {
                btn[i].addEventListener('click', function () {
                    let btn = document.getElementById('toggle-button');
                    btn.click();
                    editMode = true;
                    console.log(editMode);
                    event.stopImmediatePropagation();
                });
            }
        }
    }();
    // This entry need to be wrapped in an IIFE because it need to be in strict mode.
    !function () {
        "use strict";
        var __webpack_exports__ = {};
        /*!****************************************!*\
          !*** ./src/scripts/pages/home-page.ts ***!
          \****************************************/
        __webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utilities_helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utilities/_helper */ "./src/scripts/utilities/_helper.ts");
/* harmony import */ var _components_grid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/_grid */ "./src/scripts/components/_grid.ts");
/* harmony import */ var _components_Models_Folder__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/Models/Folder */ "./src/scripts/components/Models/Folder.ts");
/* harmony import */ var _components_Models_File__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/Models/File */ "./src/scripts/components/Models/File.ts");
/* harmony import */ var _components_Models_RenderTemplate__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/Models/RenderTemplate */ "./src/scripts/components/Models/RenderTemplate.ts");
/* harmony import */ var _data_dataOperation__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../data/dataOperation */ "./src/scripts/data/dataOperation.ts");
/* harmony import */ var _utilities_utilities_function__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../utilities/utilities-function */ "./src/scripts/utilities/utilities-function.ts");
/* harmony import */ var _utilities_constant__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../utilities/constant */ "./src/scripts/utilities/constant.ts");

        let currentDir = '';
        let template = new _components_Models_RenderTemplate__WEBPACK_IMPORTED_MODULE_4__.RenderTemplate(document.getElementById("content-table"), _utilities_constant__WEBPACK_IMPORTED_MODULE_7__.properties.ORDERING);
        let clickedRow = 'root';
        let hoverRow = '';
        let editMode = false;
        const randomLength = 5;
        (0, _utilities_helper__WEBPACK_IMPORTED_MODULE_0__.default)(() => {
            (0, _components_grid__WEBPACK_IMPORTED_MODULE_1__.default)();
            currentDir = _utilities_constant__WEBPACK_IMPORTED_MODULE_7__.properties.BASE_DIRECTORY;
            changeCurrentDirectory();
            renderLocalStorage();
            let submitButton = document.getElementsByClassName('btn-add')[0];
            addItemEvent(submitButton);
            checkboxEvent();
        });
        /**
         * Render all data with given array of Folder or Files.
         * @param {Array<Item>} input - Array of folders or files.
        */

        function generateData(input) {
            //Generate Folder
            if (input[0].subItems) {
                for (let i = 0; i < input.length; i += 1) {
                    let folder = new _components_Models_Folder__WEBPACK_IMPORTED_MODULE_2__.Folder();
                    folder.mapping(input[i]);
                    let row = template.render(folder);
                    let id = row.cells[row.cells.length - 2].textContent;
                    getRowIdOnHover(id, row);
                    attachRemoveItemEvent(row);
                    attachOnclickFolder(id, row);
                    attachEditEvent(row);
                }
            } else {
                //Generate Files
                for (let i = 0; i < input.length; i += 1) {
                    let file = new _components_Models_File__WEBPACK_IMPORTED_MODULE_3__.File();
                    file.mapping(input[i]);
                    let row = template.render(file);
                    let id = row.cells[row.cells.length - 2].textContent;
                    getRowIdOnHover(id, row);
                    attachRemoveItemEvent(row);
                    attachEditEvent(row);
                }
            }
        }

        ; //Render all items in local storage

        function renderLocalStorage() {
            for (var i = 0; i < window.localStorage.length; i += 1) {
                let item = JSON.parse(localStorage.getItem(localStorage.key(i)));
                if (item.parent === clickedRow) generateData([item]);
            }
        } //Clear current page data excluding header

        function clearCurrentData() {
            let tr = document.getElementsByTagName('tr');

            while (tr.length != 1) {
                tr[1].remove();
            }
        }

        ;
        /**
         * Attach on click event to view items in folder for <tr> tag
         */

        function getItemInFolder(folderId) {
            let fold = new _components_Models_Folder__WEBPACK_IMPORTED_MODULE_2__.Folder();
            fold.mapping(JSON.parse(window.localStorage.getItem(folderId)));
            return fold;
        }
        /**
         * Attach on click event to view items in folder for <tr> tag
         * @param {string} id - folder id.
         * @param {HTMLTableRowElement}  tr - <tr> element.
         */

        function attachOnclickFolder(id, tr) {
            tr.addEventListener("click", function () {
                clearCurrentData(); //Check if data is in local storage and render

                let fold = getItemInFolder(id);
                clickedRow = id;
                changeCurrentDirectory(fold.name);

                if (fold) {
                    fold.subItems.forEach(element => {
                        if (Array.isArray(element)) {
                            generateData(element);
                        } else generateData([element]);
                    });
                }
            });
        }
        /**
         * Passing Item id to global variable for a later use.
         */

        function getRowIdOnHover(id, tr) {
            tr.onmouseover = function () {
                hoverRow = id;
            };
        }
        /**
         * Attach add folder event to provided <button>.
         * @param {HTMLButtonElement}  btn - <tr> element.
         */

        function addItemEvent(btn) {
            btn.onclick = function () {
                //Get ID field
                let idField = document.getElementById("id");
                let id = idField.value; //Get Name field

                let nameField = document.getElementById("name");
                let name = nameField.value; //Check if in put is a file

                let inputElem = document.getElementById("file");
                let isFile = inputElem.checked;
                const prefix = isFile ? _utilities_constant__WEBPACK_IMPORTED_MODULE_7__.properties.FILE_PREFIX : _utilities_constant__WEBPACK_IMPORTED_MODULE_7__.properties.FOLDER_PREFIX;
                let result = (0, _utilities_utilities_function__WEBPACK_IMPORTED_MODULE_6__.generateKey)(prefix, randomLength);
                idField.value = result;

                if (!editMode) {
                    //Add file or folder
                    if (isFile) {
                        let item = new _components_Models_File__WEBPACK_IMPORTED_MODULE_3__.File(id, name, (0, _utilities_utilities_function__WEBPACK_IMPORTED_MODULE_6__.getCurrentDate)(), null, null, null, null, clickedRow, '.xlxs');
                        item.addOrUpdate(_utilities_constant__WEBPACK_IMPORTED_MODULE_7__.properties.CREATE_MODE);
                    } else {
                        let item = new _components_Models_Folder__WEBPACK_IMPORTED_MODULE_2__.Folder(id, name, (0, _utilities_utilities_function__WEBPACK_IMPORTED_MODULE_6__.getCurrentDate)(), null, null, null, null, clickedRow);
                        item.addOrUpdate(_utilities_constant__WEBPACK_IMPORTED_MODULE_7__.properties.CREATE_MODE);
                    }
                } else {
                    let type = hoverRow.split('-');

                    if (type[0] === 'file') {
                        let file = new _components_Models_File__WEBPACK_IMPORTED_MODULE_3__.File();
                        file.mapping((0, _data_dataOperation__WEBPACK_IMPORTED_MODULE_5__.getItemById)(hoverRow));
                        file.name = name;
                        file.addOrUpdate(_utilities_constant__WEBPACK_IMPORTED_MODULE_7__.properties.EDIT_MODE);
                    } else {
                        let folder = new _components_Models_Folder__WEBPACK_IMPORTED_MODULE_2__.Folder();
                        folder.mapping((0, _data_dataOperation__WEBPACK_IMPORTED_MODULE_5__.getItemById)(hoverRow));
                        folder.name = name;
                        folder.addOrUpdate(_utilities_constant__WEBPACK_IMPORTED_MODULE_7__.properties.EDIT_MODE);
                    }

                    editMode = false;
                }

                clearCurrentData();
                renderLocalStorage();
            };
        }
        /**
         * Attach event "Remove item" to provided <tr>.
         * @param {HTMLTableRowElement}  row - <tr> element.
         */

        function attachRemoveItemEvent(row) {
            let btn = row.getElementsByClassName('close');

            for (let i = 0; i < btn.length; i += 1) {
                btn[i].addEventListener('click', function () {
                    let type = hoverRow.split('-');

                    if (type[0] === 'file') {
                        let file = new _components_Models_File__WEBPACK_IMPORTED_MODULE_3__.File();
                        file.mapping((0, _data_dataOperation__WEBPACK_IMPORTED_MODULE_5__.getItemById)(hoverRow));
                        clickedRow = file.parent;
                        file.remove();
                    } else {
                        let folder = new _components_Models_Folder__WEBPACK_IMPORTED_MODULE_2__.Folder();
                        folder.mapping((0, _data_dataOperation__WEBPACK_IMPORTED_MODULE_5__.getItemById)(hoverRow));
                        clickedRow = folder.parent;
                        folder.remove();
                    }

                    clearCurrentData();
                    renderLocalStorage();
                    event.stopImmediatePropagation();
                });
            }
        }

        ;
        /**
         * Add current folder to directory if folder name is provided
         * else return current directory
         * @param {string}  folder - folder name.
         * @return {string} - result prefix & length.
         */

        function changeCurrentDirectory(folder = '') {
            if (folder != '') currentDir += '/' + folder;
            document.getElementById('directory').innerHTML = currentDir;
            return currentDir;
        } // Checkbox event

        function checkboxEvent() {
            let inputElem = document.getElementById("file");
            let idField = document.getElementById("id");
            idField.value = (0, _utilities_utilities_function__WEBPACK_IMPORTED_MODULE_6__.generateKey)(_utilities_constant__WEBPACK_IMPORTED_MODULE_7__.properties.FOLDER_PREFIX, randomLength);

            inputElem.onclick = function () {
                let isFile = inputElem.checked;
                const prefix = isFile ? _utilities_constant__WEBPACK_IMPORTED_MODULE_7__.properties.FILE_PREFIX : _utilities_constant__WEBPACK_IMPORTED_MODULE_7__.properties.FOLDER_PREFIX;
                let result = (0, _utilities_utilities_function__WEBPACK_IMPORTED_MODULE_6__.generateKey)(prefix, randomLength);
                idField.value = result;
            };
        }
        /**
         * Edit item
         */

        function attachEditEvent(tr) {
            let btn = tr.getElementsByClassName('edit');

            for (let i = 0; i < btn.length; i += 1) {
                btn[i].addEventListener('click', function () {
                    let btn = document.getElementById('toggle-button');
                    btn.click();
                    editMode = true;
                    console.log(editMode);
                    event.stopImmediatePropagation();
                });
            }
        }
    }();
    // This entry need to be wrapped in an IIFE because it need to be isolated against other entry modules.
    !function () {
        /*!*****************************************!*\
          !*** ./src/styles/pages/home-page.scss ***!
          \*****************************************/
        // extracted by mini-css-extract-plugin
    }();
    /******/
})()
    ;
//# sourceMappingURL=home-page.js.map