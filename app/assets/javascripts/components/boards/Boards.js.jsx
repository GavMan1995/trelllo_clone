class Boards extends React.Component {
  constructor(props){
    super(props);
    //@boards in the index.html.erb is this.props.boards
    this.state = { boards: this.props.boards };
    this.addBoard = this.addBoard.bind(this);
    this.deleteBoard = this.deleteBoard.bind(this);
    this.updateBoard = this.updateBoard.bind(this);

  }

  updateBoard(id, board){
    $.ajax({
      url: `/boards/${id}`,
      type: 'PUT',
      data: {board: {...board}},
      dataType: 'JSON'
    }).success( board => {
      let boards = this.state.boards;
      let editBoard = boards.find( b => b.id === board.id)
      editBoard.name = board.name;
      editBoard.description = board.description
      this.setState({ boards: boards});
    });
  }

  deleteBoard(id){
    $.ajax({
      url: `/boards/${id}`,
      type: 'DELETE'
    }).success(board => {
      let boards = this.state.boards;
      let index = boards.findIndex( b => b.id === board.id );
      boards.splice(index, 1);
      this.setState({boards: boards});
    })
  }

  addBoard(board){
    this.setState({boards: [board, ...this.state.boards]});
  }
  render(){
    //@boards.each do |board|
    let boards = this.state.boards.map( board => {
      return(<Board key={`board-${board.id}`} {...board} delete={this.deleteBoard} updateBoard={this.updateBoard}/>);
    });
    return(
      <div className="row">
        <div className="s12">
          <NewBoard addBoard={this.addBoard} />
          <h2 className="center">Boards</h2>
          <br/>
          <br/>
        </div>

        {boards}
      </div>
    );
  }

}
