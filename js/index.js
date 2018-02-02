var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var App = function (_React$Component) {
    _inherits(App, _React$Component);

    function App(props) {
        _classCallCheck(this, App);

        var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

        var emails = _this.props.emails;
        var id = 0;
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = emails[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var email = _step.value;

                email.id = id++;
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion && _iterator.return) {
                    _iterator.return();
                }
            } finally {
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }

        ;
        _this.state = {
            currentEmailId: 0,
            currentSection: "inbox",
            emails: emails
        };
        _this.openEmail = _this.openEmail.bind(_this);
        _this.markEmailUnRead = _this.markEmailUnRead.bind(_this);
        _this.getSection = _this.getSection.bind(_this);
        _this.changeEmailLocation = _this.changeEmailLocation.bind(_this);
        _this.closeCompose = _this.closeCompose.bind(_this);
        return _this;
    }

    _createClass(App, [{
        key: "unreadEmails",
        value: function unreadEmails() {
            function checkEmailStatus(value) {
                if (value.read === false) {
                    return value;
                }
            }
            var unRead = this.state.emails.filter(checkEmailStatus);
            return unRead;
        }
    }, {
        key: "deletedEmails",
        value: function deletedEmails() {
            function checkEmailStatus(value) {
                if (value.tag === "deleted") {
                    return value;
                }
            }
            var deleted = this.state.emails.filter(checkEmailStatus);
            return deleted;
        }
    }, {
        key: "spamEmails",
        value: function spamEmails() {
            function checkEmailStatus(value) {
                if (value.tag === "spam") {
                    return value;
                }
            }
            var spam = this.state.emails.filter(checkEmailStatus);
            return spam;
        }
    }, {
        key: "openEmail",
        value: function openEmail(id) {
            var emails = this.state.emails;
            emails[id].read = true;
            this.setState({
                currentEmailId: id,
                emails: emails
            });
        }
    }, {
        key: "markEmailUnRead",
        value: function markEmailUnRead(id) {
            var emails = this.state.emails;
            emails[id].read = false;
            this.setState({
                currentEmailId: id,
                emails: emails
            });
        }
    }, {
        key: "getSection",
        value: function getSection(value) {
            var emails = this.state.emails;
            if (value !== this.state.currentSection) {
                this.setState({
                    currentEmailId: ""
                });
            }
            this.setState({
                currentSection: value,
                emails: emails
            });

            if (value === "compose") {
                this.composeEmail(value);
            }
        }
    }, {
        key: "changeEmailLocation",
        value: function changeEmailLocation(value, location) {
            var emails = this.state.emails;

            emails[value.id].tag = location;
            this.setState({
                emails: emails
            });
        }
    }, {
        key: "composeEmail",
        value: function composeEmail(value) {
            this.setState({
                currentSection: value
            });
        }
    }, {
        key: "closeCompose",
        value: function closeCompose() {
            this.getSection("inbox");
        }
    }, {
        key: "render",
        value: function render() {
            var _this2 = this;

            var currentEmailState = this.state.emails.find(function (x) {
                return x.id === _this2.state.currentEmailId;
            });
            return React.createElement(
                "div",
                { className: "email-app__wrapper" },
                React.createElement(
                    "div",
                    { className: "grid" },
                    React.createElement(TopBar, {
                        getUnreadEmails: this.unreadEmails(),
                        getDeletedEmails: this.deletedEmails(),
                        getSpamEmails: this.spamEmails(),
                        getCurrentSection: this.getSection }),
                    React.createElement(EmailList, {
                        emails: this.state.emails.filter(function (x) {
                            return x.tag === _this2.state.currentSection;
                        }),
                        getSelectedEmail: this.openEmail,
                        selectedEmail: currentEmailState }),
                    React.createElement(EmailDetails, {
                        email: currentEmailState,
                        getCurrentSection: this.state.currentSection,
                        markUnRead: this.markEmailUnRead,
                        changeEmailLocation: this.changeEmailLocation }),
                    React.createElement(Compose, { composeOpen: this.state.currentSection, closeCompose: this.closeCompose, sendMessage: this.sendMessage }),
                    React.createElement(Footer, null)
                )
            );
        }
    }]);

    return App;
}(React.Component);

var EmailList = function EmailList(_ref) {
    var emails = _ref.emails,
        getSelectedEmail = _ref.getSelectedEmail,
        selectedEmail = _ref.selectedEmail;


    if (emails.length === 0) {
        return React.createElement(
            "div",
            { className: "email-list__wrapper box--33" },
            React.createElement(
                "div",
                { className: "empty-container" },
                React.createElement(
                    "div",
                    { className: "empty-container__content" },
                    "Nothing to See Here"
                )
            )
        );
    };

    var emailList = emails.map(function (email, i) {
        return React.createElement(EmailListItem, { email: email, openEmail: getSelectedEmail, selected: selectedEmail === email });
    });
    return React.createElement(
        "div",
        { className: "email-list__wrapper box--4" },
        React.createElement(
            "div",
            { className: "email-list__container" },
            emailList
        )
    );
};

var EmailListItem = function EmailListItem(_ref2) {
    var email = _ref2.email,
        openEmail = _ref2.openEmail,
        selected = _ref2.selected;

    var time = splitSeconds(email.time);
    var classes = "email-item";
    if (selected) {
        classes += " active unread";
    }

    return React.createElement(
        "div",
        { className: classes, onClick: function onClick() {
                return openEmail(email.id);
            } },
        React.createElement(
            "div",
            { className: "email-item__name" },
            email.from
        ),
        React.createElement(
            "div",
            { className: "email-item__to" },
            "to: ",
            email.to
        ),
        React.createElement(
            "div",
            { className: "email-item__subject" },
            React.createElement(
                "strong",
                null,
                email.subject
            )
        ),
        React.createElement("div", { className: "email-item__read", "data-read": email.read }),
        React.createElement(
            "div",
            { className: "email-item__time" },
            time
        ),
        React.createElement(
            "div",
            { className: "email-item__message" },
            React.createElement(
                "p",
                null,
                truncateString(email.message, 85)
            )
        ),
        React.createElement(
            "div",
            { className: "email-item__attch" },
            "attachements.file}"
        )
    );
};

var EmailDetails = function EmailDetails(_ref3) {
    var email = _ref3.email,
        markUnRead = _ref3.markUnRead,
        getCurrentSection = _ref3.getCurrentSection,
        changeEmailLocation = _ref3.changeEmailLocation;

    if (!email) {
        return React.createElement(
            "div",
            { className: "email-details__wrapper  box--66" },
            React.createElement(
                "div",
                { className: "empty-container" },
                React.createElement("div", { className: "empty-container__content" })
            )
        );
    }

    return React.createElement(
        "div",
        { className: "email-details__wrapper box--33" },
        React.createElement(
            "div",
            { className: "email-details__container" },
            React.createElement(
                "div",
                { className: "email-details__header" },
                React.createElement(
                    "div",
                    { className: "email-details__info" },
                    React.createElement(
                        "strong",
                        null,
                        email.from,
                        " ",
                        "<",
                        email.address,
                        ">"
                    ),
                    React.createElement(
                        "span",
                        { className: "pull-right" },
                        prettyDate(email.time)
                    )
                ),
                React.createElement(
                    "div",
                    null,
                    email.subject
                ),
                React.createElement(
                    "div",
                    { className: "email-details__buttons" },
                    React.createElement(
                        "div",
                        { className: "email-details__mark" },
                        React.createElement(
                            "span",
                            { onClick: function onClick() {
                                    markUnRead(email.id);
                                } },
                            React.createElement("i", { className: "fa fa-envelope-o markUnread", "aria-hidden": "true" })
                        )
                    ),
                    React.createElement(
                        "div",
                        { className: "email-details__mark" },
                        React.createElement(
                            "span",
                            { onClick: function onClick() {
                                    changeEmailLocation(email, "spam");
                                } },
                            React.createElement("i", { className: "fa fa-ban spam", "aria-hidden": "true" })
                        )
                    ),
                    React.createElement(
                        "div",
                        { className: "email-details__mark" },
                        React.createElement(
                            "span",
                            { onClick: function onClick() {
                                    changeEmailLocation(email, "deleted");
                                } },
                            React.createElement("i", { className: "fa fa-trash-o trash", "aria-hidden": "true" })
                        )
                    )
                )
            ),
            React.createElement(
                "div",
                { className: "email-details__message" },
                React.createElement(
                    "p",
                    null,
                    email.message
                )
            )
        )
    );
};

var TopBar = function TopBar(_ref4) {
    var getUnreadEmails = _ref4.getUnreadEmails,
        getDeletedEmails = _ref4.getDeletedEmails,
        getSpamEmails = _ref4.getSpamEmails,
        getCurrentSection = _ref4.getCurrentSection;

    return React.createElement(
        "div",
        { className: "topbar box--100" },
        React.createElement(
            "ul",
            null,
            React.createElement(
                "li",
                { className: "close-icons" },
                React.createElement("span", null),
                React.createElement("span", null),
                React.createElement("span", null)
            ),
            React.createElement(
                "li",
                { onClick: function onClick() {
                        return getCurrentSection("inbox");
                    } },
                "InBox ",
                React.createElement(
                    "span",
                    null,
                    getUnreadEmails.length
                )
            ),
            React.createElement(
                "li",
                { onClick: function onClick() {
                        return getCurrentSection("spam");
                    } },
                "Spam ",
                getSpamEmails.length
            ),
            React.createElement(
                "li",
                { onClick: function onClick() {
                        return getCurrentSection("deleted");
                    } },
                "Trash ",
                getDeletedEmails.length
            ),
            React.createElement(
                "li",
                { className: "pull-right white" },
                React.createElement(
                    "span",
                    null,
                    React.createElement("i", { className: "fa fa-search", "aria-hidden": "true" })
                )
            ),
            React.createElement(
                "li",
                { onClick: function onClick() {
                        return getCurrentSection("compose");
                    } },
                React.createElement(
                    "span",
                    null,
                    "Compose"
                )
            )
        )
    );
};

var Compose = function Compose(_ref5) {
    var composeOpen = _ref5.composeOpen,
        closeCompose = _ref5.closeCompose,
        sendMessage = _ref5.sendMessage;

    if (composeOpen === "compose") {
        return React.createElement(
            "div",
            { className: "compose-email__wrapper" },
            React.createElement(
                "div",
                { className: "compose-email__content" },
                React.createElement(
                    "div",
                    { className: "compose-email__message" },
                    React.createElement(
                        "div",
                        { className: "compose-email__header", onClick: function onClick() {
                                return closeCompose();
                            } },
                        "New Message",
                        React.createElement(
                            "span",
                            { className: "white pull-right" },
                            React.createElement("i", { className: "fa fa-times", "aria-hidden": "true" })
                        )
                    ),
                    React.createElement(
                        "div",
                        { className: "compose-email__body" },
                        React.createElement(
                            "div",
                            { className: "compose-email__toemail" },
                            React.createElement("input", { placeholder: "To:" })
                        ),
                        React.createElement(
                            "div",
                            { className: "compose-email__subject" },
                            React.createElement("input", { placeholder: "Subject:" })
                        ),
                        React.createElement(
                            "div",
                            { className: "compose-email__message-content" },
                            React.createElement("textarea", { rows: "6", placeholder: "Type Your Message Here" })
                        )
                    ),
                    React.createElement(
                        "div",
                        { className: "compose-email__footer" },
                        React.createElement(
                            "button",
                            null,
                            "Send"
                        )
                    )
                )
            )
        );
    };
    return React.createElement("div", null);
};

var Footer = function Footer() {
    return React.createElement(
        "div",
        { className: "box--100 footer" },
        React.createElement(
            "div",
            { className: "footer-content" },
            "-lol"
        )
    );
};

$.ajax({ url: 'https://next.json-generator.com/api/json/get/E1pfOoXBN',
    type: 'GET',
    success: function success(result) {
        ReactDOM.render(React.createElement(App, { emails: result }), document.getElementById('email-app'));
    }
});

//  Helpers
var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

var splitSeconds = function splitSeconds(date) {
    var time = date.split(" ")[1].split(":");
    return time[0] + ":" + time[1];
};

var prettyDate = function prettyDate(date) {
    var newdate = date.split(" ")[0].split("-");
    var month = months[newdate[1] - 1];
    var day = newdate[2];
    var year = newdate[0];
    return date = month + " " + day + ", " + year;
};

prettyDate("2016-10-07 15:35:14");
var truncateString = function truncateString(string, length) {
    return string.substring(0, length) + "...";
};