 class HistoryRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    var row = [];
    for (var i in this.props.psychics){
      row.push(<td>{this.props.psychics[i].history[this.props.index].guess}</td>);
    }
    return <tr>
             <td>{this.props.index + 1}</td>
             { row }
             <td>{this.props.psychics[i].history[this.props.index].number}</td>
           </tr>;
  }
}

 class History extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    if (!this.props.psychics.length ||
        this.props.psychics[0].history == null) return '';
    var header = [];
    header.push(<th>#</th>)
    for (var i in this.props.psychics){
        header.push(<th>{this.props.psychics[i].name}</th>);
    }
    header.push(<th>Ваше число</th>);
    var history = []
    for (var index = 0; index < this.props.psychics[0].history.length; index++){
        history.push(<HistoryRow index={index} psychics={this.props.psychics}></HistoryRow>);
    }

    return <div>
             <h5>История</h5>
             <table class="table">
               <thead> <tr> { header } </tr> </thead>
               <tbody> { history } </tbody>
             </table>
           </div>;
  }
}

 class Rating extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    if (!this.props.psychics.length) return '';
    var rating = [];
    for (var i in this.props.psychics){
      rating.push(<li>{this.props.psychics[i].name}: {this.props.psychics[i].rating}</li>);
    }
    return <div>
             <h5>Рейтинг экстрасенсов: </h5>
             <ul>{rating}</ul>
           </div>;
  }
}

 class Guesses extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    if (!this.props.guesses) return '';
    var guesses = [];
    for (var i in this.props.guesses){
      guesses.push(<li>{this.props.guesses[i].name}: {this.props.guesses[i].guess}</li>);
    }
    return <div>
             <h5>Предположения экстрасенсов: </h5>
             <ul>{guesses}</ul>
           </div>;
  }
}

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isSubmitNumber: false,
                  error: null,
                  number: null,
                  psychics: []};
    this.number = 0;
    this.handleClick = this.handleClick.bind(this);
    this.updateInputValue = this.updateInputValue.bind(this);
}

  updateInputValue(e) {
    this.number = e.target.value;
}

  handleClick() {
    var xhr = new XMLHttpRequest();
    if (this.state.isSubmitNumber) {
      xhr.open("POST", 'guesses.json', false);
      var json = JSON.stringify({value: this.state.number});
      xhr.send(this.number);
    }
    else {
      xhr.open('GET', 'guesses.json', false);
      xhr.send();
    }
    if (xhr.status == 200) {
      var response = JSON.parse(xhr.responseText);
      if (response.error) {
        this.setState(state => ({error: response.error}));
      }
      else {
        this.setState(state => ({error: null,
                                 guesses: response.guesses,
                                 psychics: response.psychics,
                                 isSubmitNumber: !state.isSubmitNumber}));
      }
    }
    else {
        this.setState(state => ({error: xhr.status + ': ' + xhr.statusText}));
    }
}

  render() {
    const isError = this.state.error;
    return (
     <div>
       <h1>Привет</h1>
       <div>Предлогаем вам принять участие в тестировании экстрасенсов.
         Для этого загадайте двузначное число.
       </div>
       {this.state.isSubmitNumber ? (
       <div class="input-group input-group-sm mb-3 col-xs-2 mt-4">
         <div class="input-group-prepend">
           <span class="input-group-text" id="inputGroup-sizing-sm">Введите загаданное число </span>
           <input type="text" placeholder="Загаданное число" size="20" class="form-control" onChange={this.updateInputValue}></input>
         </div>
       </div>) : ('')}
       <Guesses guesses={this.state.guesses}/>
       <button type="button" class="btn btn-primary mb-3 mt-2" onClick={this.handleClick}>{this.state.isSubmitNumber ? 'Отправить' : 'Проверить'} </button>
       {isError ? (<div class="alert alert-danger" role="alert">{isError}</div>) : ('')}
       <br></br>
       <Rating psychics={this.state.psychics}/>
       <History psychics={this.state.psychics}/>
     </div>
    );
  }
}

ReactDOM.render(
  <Main />,
  document.getElementById('root')
);
