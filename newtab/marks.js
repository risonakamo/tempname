//MarksHandler(bookmarkObject[] data,component controlHandler)
//data: initial data of bookmark objects
//controlHandler: the controlHandler component
class MarksHandler extends React.Component {
  constructor(props) {
    super(props);
    this.navigateFolder = this.navigateFolder.bind(this);
    this.state = {
      data: this.props.data
    };
    this.controlMarks = React.createRef(); //control marks object
  } //given a folder id, go to that folder. provide title for toast functions.
  //if modifyToast is provided, modify toast instead of adding


  navigateFolder(folderId, folderName = "", modifyToast = -1) {
    chrome.bookmarks.getChildren(folderId, data => {
      if (modifyToast < 0) {
        this.props.controlHandler.current.addToast(folderId, folderName);
      } else {
        this.props.controlHandler.current.modifyToast(modifyToast);
      }

      this.setState({
        data
      });
    });
  }

  toggleControlMarks() {
    this.controlMarks.current.toggleEnabled();
  }

  render() {
    return React.createElement("div", {
      className: "marks"
    }, React.createElement("div", {
      className: "marks-inner"
    }, React.createElement(ControlMarks, {
      ref: this.controlMarks
    }), this.state.data.map((x, i) => {
      return React.createElement(MarkEntry, {
        data: x,
        key: i,
        navigateFolder: this.navigateFolder
      });
    })));
  }

} //MarkEntry(bookmarkObject data,parent-function navigateFolder)
//data: bookmark object from chrome api (see data specs)
//navigateFolder: navigateFolder function from parent


class MarkEntry extends React.Component {
  render() {
    if (!this.props.data.url) {
      return React.createElement("div", {
        className: "mark folder",
        onClick: () => {
          this.props.navigateFolder(this.props.data.id, this.props.data.title);
        }
      }, React.createElement("img", {
        src: "material-folder.svg"
      }), React.createElement("p", null, this.props.data.title));
    }

    return React.createElement("a", {
      className: "mark",
      href: this.props.data.url
    }, React.createElement("img", {
      src: `chrome://favicon/${this.props.data.url}`
    }), React.createElement("p", null, this.props.data.title));
  }

} //the control marks holder
//ControlMarks()


class ControlMarks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      enabled: 0
    };
    this.internalLinks = [{
      title: "History",
      url: "chrome://history"
    }, {
      title: "Downloads",
      url: "chrome://downloads"
    }, {
      title: "Bookmarks",
      url: "chrome://bookmarks"
    }, {
      title: "Extensions",
      url: "chrome://extensions"
    }];
  }

  toggleEnabled() {
    this.setState({
      enabled: this.state.enabled ? 0 : 1
    });
  }

  spawnLinks() {}

  render() {
    if (this.state.enabled) {
      if (!this.internalLinksElements) {
        this.internalLinksElements = this.internalLinks.map((x, i) => {
          return React.createElement("div", {
            className: "mark folder internal",
            key: i,
            onClick: () => {
              chrome.tabs.update({
                url: x.url
              });
            }
          }, React.createElement("img", {
            src: "yellowtriangle.svg"
          }), React.createElement("p", null, x.title));
        });
      }

      return this.internalLinksElements;
    }

    return null;
  }

}