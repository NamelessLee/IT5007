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
  _graphQLFetch = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(query) {
    var variables,
        response,
        body,
        result,
        error,
        details,
        _args3 = arguments;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            variables = _args3.length > 1 && _args3[1] !== undefined ? _args3[1] : {};
            console.log("graphQlFetch!!!!");
            console.log("variables= " + JSON.stringify(variables));
            _context3.prev = 3;
            _context3.next = 6;
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
            response = _context3.sent;
            _context3.next = 9;
            return response.text();

          case 9:
            body = _context3.sent;
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

            return _context3.abrupt("return", result.data);

          case 16:
            _context3.prev = 16;
            _context3.t0 = _context3["catch"](3);
            alert("Error in sending data to server: ".concat(_context3.t0.message));

          case 19:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[3, 16]]);
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
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", null, tutor.name))), /*#__PURE__*/React.createElement("div", {
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

var SearchTutor = /*#__PURE__*/function (_React$Component) {
  _inherits(SearchTutor, _React$Component);

  var _super = _createSuper(SearchTutor);

  function SearchTutor() {
    var _this;

    _classCallCheck(this, SearchTutor);

    _this = _super.call(this);
    _this.handleSubmit = _this.handleSubmit.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(SearchTutor, [{
    key: "handleSubmit",
    value: function handleSubmit(e) {
      e.preventDefault();
      this.props.setTutorInput();
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
        className: "col-2 mt-3 pt-3 pb-3 container-sm"
      }, /*#__PURE__*/React.createElement("span", {
        className: "text-muted"
      }, "SUBJECT"), /*#__PURE__*/React.createElement("div", {
        className: "dropdown"
      }, /*#__PURE__*/React.createElement("select", {
        className: "drop-down-toggle container-fluid h40",
        name: "subject",
        id: "subject"
      }, /*#__PURE__*/React.createElement("option", {
        value: "",
        selected: true
      }, "All Subjects"), /*#__PURE__*/React.createElement("option", {
        value: "CS"
      }, "Computer Science"), /*#__PURE__*/React.createElement("option", {
        value: "FT"
      }, "FinTech"), /*#__PURE__*/React.createElement("option", {
        value: "ST"
      }, "Statistics")))), /*#__PURE__*/React.createElement("div", {
        className: "col-2 mt-3 pt-3 pb-3"
      }, /*#__PURE__*/React.createElement("span", {
        className: "text-muted"
      }, "LEVEL"), /*#__PURE__*/React.createElement("div", {
        className: "dropdown"
      }, /*#__PURE__*/React.createElement("select", {
        className: "drop-down-toggle container-fluid h40",
        name: "level",
        id: "level"
      }, /*#__PURE__*/React.createElement("option", {
        value: "",
        selected: true
      }, "All Levels"), /*#__PURE__*/React.createElement("option", {
        value: "B"
      }, "Bachelor"), /*#__PURE__*/React.createElement("option", {
        value: "M"
      }, "Master"), /*#__PURE__*/React.createElement("option", {
        value: "D"
      }, "Doctor")))), /*#__PURE__*/React.createElement("div", {
        className: "col-2 mt-3 pt-3 pb-3"
      }, /*#__PURE__*/React.createElement("span", {
        className: "text-muted"
      }, "PRICE"), /*#__PURE__*/React.createElement("div", {
        className: "dropdown"
      }, /*#__PURE__*/React.createElement("select", {
        className: "drop-down-toggle container-fluid h40",
        name: "price",
        id: "price"
      }, /*#__PURE__*/React.createElement("option", {
        value: "",
        selected: true
      }, "All Prices"), /*#__PURE__*/React.createElement("option", {
        value: "S"
      }, "< $30 / h"), /*#__PURE__*/React.createElement("option", {
        value: "M"
      }, "$30 - 50 / h"), /*#__PURE__*/React.createElement("option", {
        value: "L"
      }, "> $45 / h")))), /*#__PURE__*/React.createElement("div", {
        className: "col-2 mt-3 pt-3 pb-3"
      }, /*#__PURE__*/React.createElement("span", {
        className: "text-muted"
      }, "GENDER"), /*#__PURE__*/React.createElement("div", {
        className: "dropdown"
      }, /*#__PURE__*/React.createElement("select", {
        className: "drop-down-toggle container-fluid h40",
        name: "gender",
        id: "gender"
      }, /*#__PURE__*/React.createElement("option", {
        value: "",
        selected: true
      }, "All Genders"), /*#__PURE__*/React.createElement("option", {
        value: "F"
      }, "Female"), /*#__PURE__*/React.createElement("option", {
        value: "M"
      }, "Male")))), /*#__PURE__*/React.createElement("div", {
        className: "col-2 mt-3 pt-3 pb-3"
      }, /*#__PURE__*/React.createElement("span", {
        className: "text-muted"
      }, "AVAILABILITY"), /*#__PURE__*/React.createElement("div", {
        className: "row"
      }, /*#__PURE__*/React.createElement("div", {
        className: "col-6 dropdown"
      }, /*#__PURE__*/React.createElement("select", {
        className: "container-fluid text-sm h40",
        name: "day",
        id: "day"
      }, /*#__PURE__*/React.createElement("option", {
        className: "text-sm",
        value: "",
        selected: true
      }, "Day"), /*#__PURE__*/React.createElement("option", {
        value: "1"
      }, "Mon"), /*#__PURE__*/React.createElement("option", {
        value: "2"
      }, "Tue"), /*#__PURE__*/React.createElement("option", {
        value: "3"
      }, "Wed"), /*#__PURE__*/React.createElement("option", {
        value: "4"
      }, "Thu"), /*#__PURE__*/React.createElement("option", {
        value: "5"
      }, "Fri"), /*#__PURE__*/React.createElement("option", {
        value: "6"
      }, "Sat"), /*#__PURE__*/React.createElement("option", {
        value: "7"
      }, "Sun"))), /*#__PURE__*/React.createElement("div", {
        className: "col-6 dropdown"
      }, /*#__PURE__*/React.createElement("select", {
        className: "drop-down-toggle container-fluid h40",
        name: "time",
        id: "time"
      }, /*#__PURE__*/React.createElement("option", {
        value: "",
        selected: true
      }, "Time"), /*#__PURE__*/React.createElement("option", {
        value: "00"
      }, "00"), /*#__PURE__*/React.createElement("option", {
        value: "01"
      }, "01"), /*#__PURE__*/React.createElement("option", {
        value: "02"
      }, "02"), /*#__PURE__*/React.createElement("option", {
        value: "03"
      }, "03"), /*#__PURE__*/React.createElement("option", {
        value: "04"
      }, "04"), /*#__PURE__*/React.createElement("option", {
        value: "05"
      }, "05"), /*#__PURE__*/React.createElement("option", {
        value: "06"
      }, "06"), /*#__PURE__*/React.createElement("option", {
        value: "07"
      }, "07"), /*#__PURE__*/React.createElement("option", {
        value: "08"
      }, "08"), /*#__PURE__*/React.createElement("option", {
        value: "09"
      }, "09"), /*#__PURE__*/React.createElement("option", {
        value: "10"
      }, "10"), /*#__PURE__*/React.createElement("option", {
        value: "11"
      }, "11"), /*#__PURE__*/React.createElement("option", {
        value: "12"
      }, "12"), /*#__PURE__*/React.createElement("option", {
        value: "13"
      }, "13"), /*#__PURE__*/React.createElement("option", {
        value: "14"
      }, "14"), /*#__PURE__*/React.createElement("option", {
        value: "15"
      }, "15"), /*#__PURE__*/React.createElement("option", {
        value: "16"
      }, "16"), /*#__PURE__*/React.createElement("option", {
        value: "17"
      }, "17"), /*#__PURE__*/React.createElement("option", {
        value: "18"
      }, "18"), /*#__PURE__*/React.createElement("option", {
        value: "19"
      }, "19"), /*#__PURE__*/React.createElement("option", {
        value: "20"
      }, "20"), /*#__PURE__*/React.createElement("option", {
        value: "21"
      }, "21"), /*#__PURE__*/React.createElement("option", {
        value: "22"
      }, "22"), /*#__PURE__*/React.createElement("option", {
        value: "23"
      }, "23"))))), /*#__PURE__*/React.createElement("div", {
        className: "col-2 mt-3 pt-3 pb-3"
      }, /*#__PURE__*/React.createElement("span", {
        className: "whiteColor"
      }, "Search"), /*#__PURE__*/React.createElement("button", {
        type: "button",
        onClick: this.handleSubmit,
        className: "btn btn-success container-fluid"
      }, "Search")));
    }
  }]);

  return SearchTutor;
}(React.Component);

var AllContents = /*#__PURE__*/function (_React$Component2) {
  _inherits(AllContents, _React$Component2);

  var _super2 = _createSuper(AllContents);

  function AllContents() {
    var _this2;

    _classCallCheck(this, AllContents);

    _this2 = _super2.call(this);
    _this2.state = {
      numTutors: 0,
      tutors: []
    };
    _this2.setTutorInput = _this2.setTutorInput.bind(_assertThisInitialized(_this2));
    _this2.loadData = _this2.loadData.bind(_assertThisInitialized(_this2));
    return _this2;
  }

  _createClass(AllContents, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.loadData();
    }
  }, {
    key: "setTutorInput",
    value: function () {
      var _setTutorInput = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(tutorInput) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.loadData();

              case 2:
                document.getElementById('subject').value = "";
                document.getElementById('level').value = "";
                document.getElementById('price').value = "";
                document.getElementById('gender').value = "";
                document.getElementById('day').value = "";
                document.getElementById('time').value = "";

              case 8:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function setTutorInput(_x2) {
        return _setTutorInput.apply(this, arguments);
      }

      return setTutorInput;
    }()
  }, {
    key: "loadData",
    value: function () {
      var _loadData = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var availability, query, data;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                availability = document.getElementById('day').value + document.getElementById('time').value;
                query = "query {\n            Tutors(tutorInput: {\n                courseType: \"".concat(document.getElementById('subject').value, "\",\n                level: \"").concat(document.getElementById('level').value, "\",\n                price: \"").concat(document.getElementById('price').value, "\",\n                gender: \"").concat(document.getElementById('gender').value, "\",\n                availability: \"").concat(availability, "\",\n            }) {\n                    username\n                    name\n                    gender\n                    courseType\n                    courses\n                    price\n                    availability\n                    level\n                    degree\n                    completedLessons\n                    numReviews\n                    stars\n                    intro\n                }\n        }");
                _context2.next = 4;
                return graphQLFetch(query);

              case 4:
                data = _context2.sent;

                if (data) {
                  this.setState({
                    tutors: data.Tutors
                  });
                  this.setState({
                    numTutors: data.Tutors.length
                  });
                }

              case 6:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
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
        className: "container-fluid mt-3 pt-3 mb-3 pb-3"
      }, /*#__PURE__*/React.createElement("div", {
        className: "row"
      }, /*#__PURE__*/React.createElement("div", {
        className: "col-10 offset-1 whiteBackground"
      }, /*#__PURE__*/React.createElement("div", {
        className: "container"
      }, /*#__PURE__*/React.createElement("div", {
        className: "row"
      }, /*#__PURE__*/React.createElement(SearchTutor, {
        setTutorInput: this.setTutorInput
      })))))), /*#__PURE__*/React.createElement("div", {
        className: "container-fluid mt-3 pt-3"
      }, /*#__PURE__*/React.createElement("div", {
        className: "row"
      }, /*#__PURE__*/React.createElement("div", {
        className: "col-7 offset-1"
      }, /*#__PURE__*/React.createElement("div", {
        className: "mt-3 mb-3 h2"
      }, /*#__PURE__*/React.createElement("em", {
        className: "p-1",
        id: "availableNum"
      }, this.state.numTutors), " tutors available online!"), /*#__PURE__*/React.createElement(DisplayTutors, {
        tutors: this.state.tutors
      })), /*#__PURE__*/React.createElement("div", {
        className: "col-3"
      }, /*#__PURE__*/React.createElement("div", {
        className: "container-fluid"
      }, /*#__PURE__*/React.createElement("div", {
        className: "row"
      }, /*#__PURE__*/React.createElement("div", {
        className: "col-12 offset-1 whiteBackground"
      }, /*#__PURE__*/React.createElement("div", {
        className: "h5 mt-3"
      }, "Haven't found satisfactory tutors?"), /*#__PURE__*/React.createElement("div", null, "Your tutor in need might haven't signed up to be a tutor yet. By clicking the button, our service will generate system messages to NUS students complying with your requirements above, and thus will get more tutors posting!"), /*#__PURE__*/React.createElement("div", {
        className: "mb-3 d-grid gap-2 mt-3"
      }, /*#__PURE__*/React.createElement("button", {
        type: "button",
        className: "btn btn-info btn-lg btn-block"
      }, "Find Specialized Tutor")))))))));
    }
  }]);

  return AllContents;
}(React.Component);
var allContents = /*#__PURE__*/React.createElement(AllContents, null);
ReactDOM.render(allContents, document.getElementById('contents'));
console.log(performance.getEntries());