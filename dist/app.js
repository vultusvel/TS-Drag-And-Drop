"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../src/utils");
var PStatus;
(function (PStatus) {
    PStatus[PStatus["Active"] = 0] = "Active";
    PStatus[PStatus["Finished"] = 1] = "Finished";
})(PStatus || (PStatus = {}));
var Project = /** @class */ (function () {
    function Project(id, title, description, people, status) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.people = people;
        this.status = status;
    }
    return Project;
}());
var State = /** @class */ (function () {
    function State() {
        this.listeners = [];
    }
    State.prototype.addListener = function (listenerFn) {
        this.listeners.push(listenerFn);
    };
    return State;
}());
var PState = /** @class */ (function (_super) {
    __extends(PState, _super);
    function PState() {
        var _this = _super.call(this) || this;
        _this.projects = [];
        return _this;
    }
    PState.getInstance = function () {
        if (this.instance) {
            return this.instance;
        }
        this.instance = new PState();
        return this.instance;
    };
    PState.prototype.addProject = function (title, description, numOfPeople) {
        var newProject = new Project(Math.random().toString(), title, description, numOfPeople, PStatus.Active);
        this.projects.push(newProject);
        this.updateListeners();
    };
    PState.prototype.moveProject = function (projectId, newStatus) {
        for (var _i = 0, _a = this.projects; _i < _a.length; _i++) {
            var project = _a[_i];
            if (project.id === projectId && project.status !== newStatus) {
                project.status = newStatus;
                this.updateListeners();
                break;
            }
        }
    };
    PState.prototype.updateListeners = function () {
        for (var _i = 0, _a = this.listeners; _i < _a.length; _i++) {
            var listenerFn = _a[_i];
            listenerFn(this.projects.slice());
        }
    };
    return PState;
}(State));
var projectState = PState.getInstance();
var Component = /** @class */ (function () {
    function Component(templateId, hostElementId, insertAtStart, newElementId) {
        this.templateElement = document.getElementById(templateId);
        this.hostElement = document.getElementById(hostElementId);
        var importedNode = document.importNode(this.templateElement.content, true);
        this.element = importedNode.firstElementChild;
        if (newElementId) {
            this.element.id = newElementId;
        }
        this.attach(insertAtStart);
    }
    Component.prototype.attach = function (insertAtBeginning) {
        this.hostElement.insertAdjacentElement(insertAtBeginning ? "afterbegin" : "beforeend", this.element);
    };
    return Component;
}());
var ProjectItem = function () {
    var _a;
    var _classSuper = Component;
    var _instanceExtraInitializers = [];
    var _dragStart_decorators;
    return _a = /** @class */ (function (_super) {
            __extends(ProjectItem, _super);
            function ProjectItem(hostId, project) {
                var _this = _super.call(this, "single-project", hostId, false, project.id) || this;
                _this.project = (__runInitializers(_this, _instanceExtraInitializers), void 0);
                _this.project = project;
                _this.configure();
                _this.renderContent();
                return _this;
            }
            Object.defineProperty(ProjectItem.prototype, "persons", {
                get: function () {
                    if (this.project.people === 1) {
                        return "1 person";
                    }
                    else {
                        return "".concat(this.project.people, " persons");
                    }
                },
                enumerable: false,
                configurable: true
            });
            // @ts-ignore
            ProjectItem.prototype.dragStart = function (event) {
                event.dataTransfer.setData("text/plain", this.project.id);
                event.dataTransfer.effectAllowed = "move";
            };
            ProjectItem.prototype.dragEnd = function (_) {
                console.log("DragEnd");
            };
            ProjectItem.prototype.configure = function () {
                this.element.addEventListener("dragstart", this.dragStart);
                this.element.addEventListener("dragend", this.dragEnd);
            };
            ProjectItem.prototype.renderContent = function () {
                this.element.querySelector("h2").textContent = this.project.title;
                this.element.querySelector("h3").textContent = this.persons + " assigned";
                this.element.querySelector("p").textContent = this.project.description;
            };
            return ProjectItem;
        }(_classSuper)),
        (function () {
            var _b;
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_b = _classSuper[Symbol.metadata]) !== null && _b !== void 0 ? _b : null) : void 0;
            _dragStart_decorators = [utils_1.autobinddecorator];
            __esDecorate(_a, null, _dragStart_decorators, { kind: "method", name: "dragStart", static: false, private: false, access: { has: function (obj) { return "dragStart" in obj; }, get: function (obj) { return obj.dragStart; } }, metadata: _metadata }, null, _instanceExtraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
var PList = function () {
    var _a;
    var _classSuper = Component;
    var _instanceExtraInitializers = [];
    var _dragOver_decorators;
    var _drop_decorators;
    var _dragLeave_decorators;
    return _a = /** @class */ (function (_super) {
            __extends(PList, _super);
            function PList(type) {
                var _this = _super.call(this, "project-list", "app", false, "".concat(type, "-projects")) || this;
                _this.type = (__runInitializers(_this, _instanceExtraInitializers), type);
                _this.assignedProjects = [];
                _this.configure();
                _this.renderContent();
                return _this;
            }
            // @ts-ignore
            PList.prototype.dragOver = function (event) {
                if (event.dataTransfer && event.dataTransfer.types[0] === "text/plain") {
                    event.preventDefault();
                    var listEl = this.element.querySelector("ul");
                    listEl.classList.add("droppable");
                }
            };
            // @ts-ignore
            PList.prototype.drop = function (event) {
                var prjId = event.dataTransfer.getData("text/plain");
                projectState.moveProject(prjId, this.type === "active" ? PStatus.Active : PStatus.Finished);
            };
            // @ts-ignore
            PList.prototype.dragLeave = function (_) {
                var listEl = this.element.querySelector("ul");
                listEl.classList.remove("droppable");
            };
            PList.prototype.configure = function () {
                var _this = this;
                this.element.addEventListener("dragover", this.dragOver);
                this.element.addEventListener("dragleave", this.dragLeave);
                this.element.addEventListener("drop", this.drop);
                projectState.addListener(function (projects) {
                    var relevantProjects = projects.filter(function (prj) {
                        if (_this.type === "active") {
                            return prj.status === PStatus.Active;
                        }
                        return prj.status === PStatus.Finished;
                    });
                    _this.assignedProjects = relevantProjects;
                    _this.renderProjects();
                });
            };
            PList.prototype.renderContent = function () {
                var listId = "".concat(this.type, "-projects-list");
                this.element.querySelector("ul").id = listId;
                this.element.querySelector("h2").textContent = this.type.toUpperCase() + " PROJECTS";
            };
            PList.prototype.renderProjects = function () {
                var listEl = document.getElementById("".concat(this.type, "-projects-list"));
                listEl.innerHTML = "";
                for (var _i = 0, _b = this.assignedProjects; _i < _b.length; _i++) {
                    var prjItem = _b[_i];
                    new ProjectItem(this.element.querySelector("ul").id, prjItem);
                }
            };
            return PList;
        }(_classSuper)),
        (function () {
            var _b;
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_b = _classSuper[Symbol.metadata]) !== null && _b !== void 0 ? _b : null) : void 0;
            _dragOver_decorators = [utils_1.autobinddecorator];
            _drop_decorators = [utils_1.autobinddecorator];
            _dragLeave_decorators = [utils_1.autobinddecorator];
            __esDecorate(_a, null, _dragOver_decorators, { kind: "method", name: "dragOver", static: false, private: false, access: { has: function (obj) { return "dragOver" in obj; }, get: function (obj) { return obj.dragOver; } }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _drop_decorators, { kind: "method", name: "drop", static: false, private: false, access: { has: function (obj) { return "drop" in obj; }, get: function (obj) { return obj.drop; } }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _dragLeave_decorators, { kind: "method", name: "dragLeave", static: false, private: false, access: { has: function (obj) { return "dragLeave" in obj; }, get: function (obj) { return obj.dragLeave; } }, metadata: _metadata }, null, _instanceExtraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
var PInput = function () {
    var _a;
    var _classSuper = Component;
    var _instanceExtraInitializers = [];
    var _submitHandler_decorators;
    return _a = /** @class */ (function (_super) {
            __extends(PInput, _super);
            function PInput() {
                var _this = _super.call(this, "project-input", "app", true, "user-input") || this;
                _this.titleInputElement = (__runInitializers(_this, _instanceExtraInitializers), void 0);
                _this.titleInputElement = _this.element.querySelector("#title");
                _this.descriptionInputElement = _this.element.querySelector("#description");
                _this.peopleInputElement = _this.element.querySelector("#people");
                _this.configure();
                return _this;
            }
            PInput.prototype.configure = function () {
                this.element.addEventListener("submit", this.submitHandler);
            };
            PInput.prototype.renderContent = function () { };
            PInput.prototype.gatherUserInput = function () {
                var enteredTitle = this.titleInputElement.value;
                var enteredDescription = this.descriptionInputElement.value;
                var enteredPeople = this.peopleInputElement.value;
                var titleValidation = {
                    value: enteredTitle,
                    required: true,
                };
                var descriptionValidation = {
                    value: enteredDescription,
                    required: true,
                    minLength: 5,
                };
                var peopleValidation = {
                    value: +enteredPeople,
                    required: true,
                    min: 1,
                    max: 5,
                };
                if (!(0, utils_1.validate)(titleValidation) ||
                    !(0, utils_1.validate)(descriptionValidation) ||
                    !(0, utils_1.validate)(peopleValidation)) {
                    alert("Invalid input!");
                    return;
                }
                else {
                    return [enteredTitle, enteredDescription, +enteredPeople];
                }
            };
            PInput.prototype.clearInputs = function () {
                this.titleInputElement.value = "";
                this.descriptionInputElement.value = "";
                this.peopleInputElement.value = "";
            };
            // @ts-ignore
            PInput.prototype.submitHandler = function (event) {
                event.preventDefault();
                var userInput = this.gatherUserInput();
                if (Array.isArray(userInput)) {
                    var title = userInput[0], desc = userInput[1], people = userInput[2];
                    projectState.addProject(title, desc, people);
                    this.clearInputs();
                }
            };
            return PInput;
        }(_classSuper)),
        (function () {
            var _b;
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_b = _classSuper[Symbol.metadata]) !== null && _b !== void 0 ? _b : null) : void 0;
            _submitHandler_decorators = [utils_1.autobinddecorator];
            __esDecorate(_a, null, _submitHandler_decorators, { kind: "method", name: "submitHandler", static: false, private: false, access: { has: function (obj) { return "submitHandler" in obj; }, get: function (obj) { return obj.submitHandler; } }, metadata: _metadata }, null, _instanceExtraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
var projectInput = new PInput();
var activeProject = new PList("active");
var fiinishedProject = new PList("finished");
