window.onload=main;

function main()
{
    chrome.bookmarks.getChildren("2",(data)=>{
        console.log(data);
        ReactDOM.render(React.createElement(LambdaRoot,{data}),document.querySelector(".wrap"));
    });
}
