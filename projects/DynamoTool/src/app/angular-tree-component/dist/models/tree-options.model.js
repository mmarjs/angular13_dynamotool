import { KEYS } from '../constants/keys';
import defaultsDeep from 'lodash/defaultsDeep';
import get from 'lodash/get';
import omit from 'lodash/omit';
import isNumber from 'lodash/isNumber';
export var TREE_ACTIONS = {
    TOGGLE_ACTIVE: function (tree, node, $event) { return node && node.toggleActivated(); },
    TOGGLE_ACTIVE_MULTI: function (tree, node, $event) { return node && node.toggleActivated(true); },
    TOGGLE_SELECTED: function (tree, node, $event) { return node && node.toggleSelected(); },
    ACTIVATE: function (tree, node, $event) { return node.setIsActive(true); },
    DEACTIVATE: function (tree, node, $event) { return node.setIsActive(false); },
    SELECT: function (tree, node, $event) { return node.setIsSelected(true); },
    DESELECT: function (tree, node, $event) { return node.setIsSelected(false); },
    FOCUS: function (tree, node, $event) { return node.focus(); },
    TOGGLE_EXPANDED: function (tree, node, $event) { return node.hasChildren && node.toggleExpanded(); },
    EXPAND: function (tree, node, $event) { return node.expand(); },
    COLLAPSE: function (tree, node, $event) { return node.collapse(); },
    DRILL_DOWN: function (tree, node, $event) { return tree.focusDrillDown(); },
    DRILL_UP: function (tree, node, $event) { return tree.focusDrillUp(); },
    NEXT_NODE: function (tree, node, $event) { return tree.focusNextNode(); },
    PREVIOUS_NODE: function (tree, node, $event) { return tree.focusPreviousNode(); },
    MOVE_NODE: function (tree, node, $event, _a) {
        var from = _a.from, to = _a.to;
        // default action assumes from = node, to = {parent, index}
        if ($event.ctrlKey) {
            tree.copyNode(from, to);
        }
        else {
            tree.moveNode(from, to);
        }
    }
};
var defaultActionMapping = {
    mouse: {
        click: TREE_ACTIONS.TOGGLE_ACTIVE,
        dblClick: null,
        contextMenu: null,
        expanderClick: TREE_ACTIONS.TOGGLE_EXPANDED,
        checkboxClick: TREE_ACTIONS.TOGGLE_SELECTED,
        drop: TREE_ACTIONS.MOVE_NODE
    },
    keys: (_a = {},
        _a[KEYS.RIGHT] = TREE_ACTIONS.DRILL_DOWN,
        _a[KEYS.LEFT] = TREE_ACTIONS.DRILL_UP,
        _a[KEYS.DOWN] = TREE_ACTIONS.NEXT_NODE,
        _a[KEYS.UP] = TREE_ACTIONS.PREVIOUS_NODE,
        _a[KEYS.SPACE] = TREE_ACTIONS.TOGGLE_ACTIVE,
        _a[KEYS.ENTER] = TREE_ACTIONS.TOGGLE_ACTIVE,
        _a)
};
var TreeOptions = /** @class */ (function () {
    function TreeOptions(options) {
        if (options === void 0) { options = {}; }
        this.options = options;
        this.actionMapping = defaultsDeep({}, this.options.actionMapping, defaultActionMapping);
        if (options.rtl) {
            this.actionMapping.keys[KEYS.RIGHT] = get(options, ['actionMapping', 'keys', KEYS.RIGHT]) || TREE_ACTIONS.DRILL_UP;
            this.actionMapping.keys[KEYS.LEFT] = get(options, ['actionMapping', 'keys', KEYS.LEFT]) || TREE_ACTIONS.DRILL_DOWN;
        }
    }
    Object.defineProperty(TreeOptions.prototype, "hasChildrenField", {
        get: function () { return this.options.hasChildrenField || 'hasChildren'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeOptions.prototype, "childrenField", {
        get: function () { return this.options.childrenField || 'children'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeOptions.prototype, "displayField", {
        get: function () { 
            
            return this.options.displayField || 'name'; 
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeOptions.prototype, "idField", {
        get: function () { 
            return this.options.idField || 'id'; 
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeOptions.prototype, "isExpandedField", {
        get: function () { return this.options.isExpandedField || 'isExpanded'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeOptions.prototype, "getChildren", {
        get: function () { return this.options.getChildren; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeOptions.prototype, "levelPadding", {
        get: function () { return this.options.levelPadding || 0; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeOptions.prototype, "useVirtualScroll", {
        get: function () { return this.options.useVirtualScroll; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeOptions.prototype, "animateExpand", {
        get: function () { return this.options.animateExpand; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeOptions.prototype, "animateSpeed", {
        get: function () { return this.options.animateSpeed || 1; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeOptions.prototype, "animateAcceleration", {
        get: function () { return this.options.animateAcceleration || 1.2; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeOptions.prototype, "scrollOnActivate", {
        get: function () { return this.options.scrollOnActivate === undefined ? true : this.options.scrollOnActivate; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeOptions.prototype, "rtl", {
        get: function () { return !!this.options.rtl; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeOptions.prototype, "rootId", {
        get: function () { return this.options.rootId; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeOptions.prototype, "useCheckbox", {
        get: function () { return this.options.useCheckbox; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeOptions.prototype, "useTriState", {
        get: function () { return this.options.useTriState === undefined ? true : this.options.useTriState; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeOptions.prototype, "scrollContainer", {
        get: function () { return this.options.scrollContainer; },
        enumerable: true,
        configurable: true
    });
    TreeOptions.prototype.getNodeClone = function (node) {
        if (this.options.getNodeClone) {
            return this.options.getNodeClone(node);
        }
        return omit(Object.assign({}, node.data), ['id']);
    };
    TreeOptions.prototype.allowDrop = function (element, to, $event) {
        if (this.options.allowDrop instanceof Function) {
            return this.options.allowDrop(element, to, $event);
        }
        else {
            return this.options.allowDrop === undefined ? true : this.options.allowDrop;
        }
    };
    TreeOptions.prototype.allowDrag = function (node) {
        if (this.options.allowDrag instanceof Function) {
            return this.options.allowDrag(node);
        }
        else {
            return this.options.allowDrag;
        }
    };
    TreeOptions.prototype.nodeClass = function (node) {
        return this.options.nodeClass ? this.options.nodeClass(node) : '';
    };
    TreeOptions.prototype.nodeHeight = function (node) {
        if (node.data.virtual) {
            return 0;
        }
        var nodeHeight = this.options.nodeHeight || 22;
        if (typeof nodeHeight === 'function') {
            nodeHeight = nodeHeight(node);
        }
        // account for drop slots:
        return nodeHeight + (node.index === 0 ? 2 : 1) * this.dropSlotHeight;
    };
    Object.defineProperty(TreeOptions.prototype, "dropSlotHeight", {
        get: function () {
            return isNumber(this.options.dropSlotHeight) ? this.options.dropSlotHeight : 2;
        },
        enumerable: true,
        configurable: true
    });
    return TreeOptions;
}());
export { TreeOptions };
var _a;
