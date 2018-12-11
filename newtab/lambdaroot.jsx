//LambdaRoot(bookmarkObject[] data)
//data: initial data of bookmarkobjects
class LambdaRoot extends React.Component
{
  render()
  {
    return <>
      <ControlHandler/>

      <MarksHandler data={this.props.data}/>
    </>;
  }
}

//ControlHandler()
class ControlHandler extends React.Component
{
  render()
  {
    return <div className="control">
      <div className="toast">
        <p>stuff</p>
      </div>

      <div className="toast">
        <p>stuffstuffstuffstuffstuffstuffstuffs</p>
      </div>
    </div>;
  }
}

//MarksHandler(bookmarkObject[] data)
//data: initial data of bookmark objects
class MarksHandler extends React.Component
{
  constructor(props)
  {
    super(props);
    this.navigateFolder=this.navigateFolder.bind(this);

    this.state={
      data:this.props.data
    };
  }

  //given a folder id, go to that folder
  navigateFolder(folderId)
  {
    chrome.bookmarks.getChildren(folderId,(data)=>{
      this.setState({data});
    });
  }

  render()
  {
    return <div className="marks">
      {this.state.data.map((x,i)=>{
        return <MarkEntry data={x} key={i} navigateFolder={this.navigateFolder}/>;
      })}
    </div>;
  }
}

//MarkEntry(bookmarkObject data,parent-function navigateFolder)
//data: bookmark object from chrome api (see data specs)
//navigateFolder: navigateFolder function from parent
class MarkEntry extends React.Component
{
  render()
  {
    if (!this.props.data.url)
    {
      return <div className="mark folder" onClick={()=>{this.props.navigateFolder(this.props.data.id)}}>
        <img src="material-folder.svg"/>
        <p>{this.props.data.title}</p>
      </div>;
    }

    return <a className="mark" href={this.props.data.url}>
      <img src={`chrome://favicon/${this.props.data.url}`}/>
      <p>{this.props.data.title}</p>
    </a>;
  }
}