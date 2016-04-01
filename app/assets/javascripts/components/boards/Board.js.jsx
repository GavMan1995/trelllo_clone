class Board extends React.Component {
  constructor(props) {
    super(props);
    this.toggleEdit = this.toggleEdit.bind(this);
    this.updateBoard = this.updateBoard.bind(this);
    this.showBoard = this.showBoard.bind(this);
    this.state = {edit: false};
  }

  showBoard(){
    window.location.href = `/boards/${this.props.id}/lists`;
  }

  toggleEdit(){
    this.setState({edit: !this.state.edit});
  }

  updateBoard(){
    let board = {name: this.refs.name.value, description: this.refs.description.value}
    this.toggleEdit();
    this.props.updateBoard(this.props.id, board);
  }

  show(){
    return (
      <div className="col s12 m4">
        <div className="card blue-grey darken-2 z-depth-0">
          <div className="card-content white-text">
            <span className="card-title">{this.props.name}</span>
          </div>
          <div className="card-action center">
            <button className="btn red lighten-2" onClick={ () => this.props.delete(this.props.id)}>Delete</button>
            <button className="btn blue lighten-2" onClick={this.toggleEdit}>Edit</button>
            <button className="btn yellow darken-2" onClick={this.showBoard}>Show</button>
          </div>
        </div>
      </div>
    );
  }

  edit() {
    return(
      <div className="col s12 m4 ">
        <div className="edit-card card z-depth-5 blue-grey darken-2 white-text">
          <input placeholder={this.props.name} defaultValue={this.props.name} ref="name" required={true}/>
          <input placeholder={this.props.description} defaultValue={this.props.description} ref="description"/>
          <div className="card-action center">
            <button onClick={this.toggleEdit} className="btn red lighten-2">Cancel</button>
            <button onClick={this.updateBoard} className="btn blue lighten-2">Update</button>
          </div>
        </div>
      </div>
    );
  }

  render(){
    if(this.state.edit)
      return this.edit();
    else
      return this.show();
  }

}
