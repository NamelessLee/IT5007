"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function graphQLFetch(_x) {
  return _graphQLFetch.apply(this, arguments);
}

function _graphQLFetch() {
  _graphQLFetch = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(query) {
    var variables,
        response,
        body,
        result,
        error,
        details,
        _args2 = arguments;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            variables = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : {};
            console.log("graphQlFetch!!!!");
            console.log("variables= " + JSON.stringify(variables));
            _context2.prev = 3;
            _context2.next = 6;
            return fetch('http://localhost:8080/graphql', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              withCredentials: true,
              body: JSON.stringify({
                query: query,
                variables: variables
              })
            });

          case 6:
            response = _context2.sent;
            _context2.next = 9;
            return response.text();

          case 9:
            body = _context2.sent;
            console.log("body= " + body);
            result = JSON.parse(body);

            if (result.errors) {
              error = result.errors[0];

              if (error.extensions.code == 'BAD_USER_INPUT') {
                details = error.extensions.exception.errors.join('\n ');
                alert("".concat(error.message, ":\n ").concat(details));
              } else {
                alert("".concat(error.extensions.code, ": ").concat(error.message));
              }
            }

            return _context2.abrupt("return", result.data);

          case 16:
            _context2.prev = 16;
            _context2.t0 = _context2["catch"](3);
            alert("Error in sending data to server: ".concat(_context2.t0.message));

          case 19:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[3, 16]]);
  }));
  return _graphQLFetch.apply(this, arguments);
}

function TutorDetail(props) {
  var tutor = props.tutor;
  var courseTypes = tutor.courseType.map(function (course) {
    return /*#__PURE__*/React.createElement("button", {
      className: "btn btn-info m-1"
    }, course);
  });
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "container-fluid mt-3 whiteBackground"
  }, /*#__PURE__*/React.createElement("div", {
    className: "row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "col-3 border-right marginAuto"
  }, /*#__PURE__*/React.createElement("img", {
    className: "container-fluid",
    src: "./img/tutorPhoto.jpeg"
  })), /*#__PURE__*/React.createElement("div", {
    className: "col-6 p-3 border-right"
  }, /*#__PURE__*/React.createElement("div", {
    className: "h5"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", null, tutor.username))), /*#__PURE__*/React.createElement("div", {
    className: "text-muted"
  }, tutor.degree), /*#__PURE__*/React.createElement("div", {
    className: "small"
  }, tutor.intro), /*#__PURE__*/React.createElement("div", {
    className: "pt-1 mt-1"
  }, /*#__PURE__*/React.createElement("div", null, "Offers: ", courseTypes))), /*#__PURE__*/React.createElement("div", {
    className: "col-3 p-3"
  }, /*#__PURE__*/React.createElement("h5", {
    className: "strong"
  }, "$", tutor.price[0], "-", tutor.price[1], "/hr"), /*#__PURE__*/React.createElement("div", {
    className: "stars mt-3"
  }, /*#__PURE__*/React.createElement("span", {
    className: "fa fa-star checked"
  }), /*#__PURE__*/React.createElement("span", null, tutor.stars)), /*#__PURE__*/React.createElement("div", {
    className: "fst-italic"
  }, /*#__PURE__*/React.createElement("strong", null, tutor.numReviews), " reviews"), /*#__PURE__*/React.createElement("div", {
    className: "fst-italic"
  }, /*#__PURE__*/React.createElement("strong", null, tutor.completedLessons), " completed lessons"), /*#__PURE__*/React.createElement("div", {
    className: "mb-1 d-grid gap-2 mt-3"
  }, /*#__PURE__*/React.createElement("a", {
    href: '/display-tutor/' + tutor.username,
    className: "btn btn-success btn-lg btn-block"
  }, "See details"))))));
}

function DisplayTutors(props) {
  var tutorDetails = props.tutors.map(function (tutor) {
    return /*#__PURE__*/React.createElement(TutorDetail, {
      tutor: tutor
    });
  });
  return /*#__PURE__*/React.createElement("div", null, tutorDetails);
}

var DisplayAllTutors = /*#__PURE__*/function (_React$Component) {
  _inherits(DisplayAllTutors, _React$Component);

  var _super = _createSuper(DisplayAllTutors);

  function DisplayAllTutors() {
    var _this;

    _classCallCheck(this, DisplayAllTutors);

    _this = _super.call(this);
    _this.state = {
      numTutors: 0,
      tutors: []
    };
    return _this;
  }

  _createClass(DisplayAllTutors, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.loadData();
    }
  }, {
    key: "loadData",
    value: function () {
      var _loadData = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var query, data;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                query = "query {\n            Tutors {\n                username\n                gender\n                courseType\n                courses\n                price\n                availability\n                level\n                degree\n                completedLessons\n                numReviews\n                stars\n                intro\n            }\n        }";
                _context.next = 3;
                return graphQLFetch(query);

              case 3:
                data = _context.sent;

                if (data) {
                  this.setState({
                    tutors: data.Tutors
                  });
                  this.setState({
                    numTutors: data.Tutors.length
                  });
                }

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function loadData() {
        return _loadData.apply(this, arguments);
      }

      return loadData;
    }()
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
        className: "mt-3 mb-3 h2"
      }, /*#__PURE__*/React.createElement("em", {
        className: "p-1",
        id: "availableNum"
      }, this.state.numTutors), " tutors available online!"), /*#__PURE__*/React.createElement(DisplayTutors, {
        tutors: this.state.tutors
      }));
    }
  }]);

  return DisplayAllTutors;
}(React.Component);

var displayAllTutors = /*#__PURE__*/React.createElement(DisplayAllTutors, null);
ReactDOM.render(displayAllTutors, document.getElementById('wrapDisplayTutors'));