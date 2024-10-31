/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

var registerBlockType = wp.blocks.registerBlockType;
var _wp$editor = wp.editor,
    RichText = _wp$editor.RichText,
    InspectorControls = _wp$editor.InspectorControls,
    useBlockProps = _wp$editor.useBlockProps;
var ServerSideRender = wp.editor.ServerSideRender;
var _wp$components = wp.components,
    ToggleControl = _wp$components.ToggleControl,
    PanelBody = _wp$components.PanelBody,
    PanelRow = _wp$components.PanelRow,
    CheckboxControl = _wp$components.CheckboxControl,
    SelectControl = _wp$components.SelectControl,
    ColorPicker = _wp$components.ColorPicker;
var useSelect = wp.data.useSelect;
registerBlockType('recent-post-block-gutenberg/recent-post-block', {
  title: 'SS Recent Post',
  // Block name visible to user
  icon: 'lightbulb',
  // Toolbar icon can be either using WP Dashicons or custom SVG
  category: 'common',
  // Under which category the block would appear
  attributes: {
    // The data this block will be storing
    postcount: {
      type: 'number',
      "default": 4
    },
    // Post Count
    rangeslider: {
      type: 'range',
      "default": 4
    },
    // Post Count
    title: {
      type: 'string'
    },
    // Section Title
    'preview': true
  },
  description: 'Show Recent Posts',
  keywords: ['recent post', 'post', 'selected post'],
  edit: function edit(props) {
    var attributes = props.attributes;

    function updateTitle(event) {
      props.setAttributes({
        title: event.target.value
      });
    }

    function updatePostCount(event) {
      props.setAttributes({
        postcount: event.target.value
      });
    } // Make the data request.


    var postData = useSelect(function (select) {
      //return select('core').getEntityRecords('postType', 'post', { per_page: attributes.postcount , _embed: true,});
      return {
        posts: select('core').getEntityRecords('postType', 'post', {
          per_page: attributes.postcount,
          _embed: 'wp:featuredmedia'
        }),
        authors: select('core').getUsers({
          who: 'authors'
        })
      };
    });
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(InspectorControls, null, /*#__PURE__*/React.createElement(PanelBody, {
      title: 'Post Display Setting'
    }, /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("strong", null, "Enter PostCount")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("input", {
      type: "number",
      name: "postcount",
      value: attributes.postcount,
      onChange: updatePostCount
    })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("input", {
      type: "range",
      name: "rangslider",
      placeholder: "Enter Post Count...",
      value: attributes.postcount,
      onChange: updatePostCount
    })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("input", {
      type: "text",
      name: "title",
      placeholder: "Enter title here...",
      value: attributes.title,
      onChange: updateTitle
    })))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      "class": "ss-post-container"
    }, /*#__PURE__*/React.createElement("h2", null, attributes.title), /*#__PURE__*/React.createElement("ul", null, postData.posts && postData.posts.map(function (post, i) {
      var _postData$authors;

      {
        postImg = post._embedded ? post._embedded['wp:featuredmedia'][0]['source_url'] : '../wp-content/plugins/recent-post-block-master/images/No-image-available.png';
      }
      var currentAuthor = (_postData$authors = postData.authors) === null || _postData$authors === void 0 ? void 0 : _postData$authors.find(function (author) {
        return author.id === post.author;
      });
      {
        console.log(currentAuthor);
      }
      return /*#__PURE__*/React.createElement("li", {
        "class": "post-box"
      }, /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("img", {
        src: postImg
      })), /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("a", {
        href: post.link,
        target: "_blank"
      }, post.title.raw)), /*#__PURE__*/React.createElement("p", null, "By - ", currentAuthor.first_name, currentAuthor.last_name, " (", currentAuthor.name, ")"));
    })))));
  },
  save: function save(props) {
    return /*#__PURE__*/React.createElement("div", null);
  }
});

/***/ })

/******/ });
//# sourceMappingURL=index.js.map